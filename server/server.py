"""FastAPI server for model and zkml proving."""

import logging
import os
import random
from typing import List
import uuid

import ezkl
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, field_validator
import numpy as np
import torch
import torchvision

from config import Config
from models import CPPN
import image_util
import genetic


logger = logging.getLogger(__name__)


app = FastAPI()
app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
app.mount('/images/', StaticFiles(directory=os.environ['IMAGE_DIR']), name='images')


config = Config()
model = CPPN(config)
model.linear1.qconfig = torch.quantization.get_default_qconfig('fbgemm')
model.linear2.qconfig = torch.quantization.get_default_qconfig('fbgemm')
model.linear3.qconfig = torch.quantization.get_default_qconfig('fbgemm')
model.relu2.qconfig = torch.quantization.get_default_qconfig('fbgemm')
model.relu3.qconfig = torch.quantization.get_default_qconfig('fbgemm')
model.relu4.qconfig = torch.quantization.get_default_qconfig('fbgemm')
model_fused = torch.ao.quantization.fuse_modules(model, [
    ['linear1', 'relu2'],
    ['linear2', 'relu3'],
    ['linear3', 'relu4'],
])
model_prepared = torch.ao.quantization.prepare(model_fused)

# Calibrate with a single batch
x = torch.rand(1, config.dim_z)
model_prepared(x)
model = torch.ao.quantization.convert(model_prepared)
model.load_state_dict(torch.load(os.environ['CHECKPOINT_PATH']))
logger.info('Loaded checkpoint from %s', os.environ['CHECKPOINT_PATH'])


class GenerateRequest(BaseModel):
    """Image model."""
    genomes: List[List[float]]


class EvolveRequest(BaseModel):
    """Evolve request."""
    genomes: List[List[float]]
    num_children: int


class ProveRequest(BaseModel):
    """Prove request."""
    genome: List[float]


class Image(BaseModel):
    """Image model."""
    image: str
    genome: List[float]


def convert_tensor_to_images(tensors):
    tensors = torch.unbind(tensors)
    image_uris = []
    for i, tensor in enumerate(tensors):
        filename = str(uuid.uuid4()) + '.png'
        file_path = os.path.join(os.environ['IMAGE_DIR'], filename)
        torchvision.utils.save_image(tensor, file_path)
        image_uris.append('http://0.0.0.0:8080/images/' + filename)
        logger.info('Saved %d th image to %s', i, file_path)
    return image_uris


@app.get("/")
async def get_root():
    """Root path."""
    return {"message": "Hello World"}


@app.post('/generate')
async def generate(r: GenerateRequest) -> List[Image]:
    """Get image from given genomes."""
    result = image_util.generate(model, r.genomes)
    image_uris = convert_tensor_to_images(result)
    response = []

    for uri, genome in zip(image_uris, r.genomes):
        response.append(Image(image=uri, genome=genome))
    return response


@app.get('/generate/seed')
async def seed(size: int):
    """Get seed images from randomly generated genomes."""
    seed_genomes = genetic.populate(size, config.dim_z)
    result = image_util.generate(model, seed_genomes)
    image_uris = convert_tensor_to_images(result)
    logger.info('Generated %d images', len(image_uris))
    for uri in image_uris:
        logger.info('Generated image uri: %s', uri)

    response = []
    for uri, genome in zip(image_uris, seed_genomes.tolist()):
        response.append(Image(image=uri, genome=genome))

    return response


@app.post('/generate/evolve')
async def evolve(r: EvolveRequest):
    """Evolve image from selected genomes from the user."""
    parents = r.genomes
    gen_num = (25 - len(parents)) // 2
    children = genetic.evolution(r.genomes, 0.4, (25 - r.num_children) // 2)
    next_batch = np.array(parents + children)
    random.shuffle(next_batch)
    next_batch = torch.tensor(next_batch)
    result = image_util.generate(model, next_batch)
    image_uris = convert_tensor_to_images(result)
    response = []
    for uri, genome in zip(image_uris, next_batch):
        response.append(Image(image=uri, genome=genome))
    return response


@app.post('/prove')
async def prove(r: ProveRequest):
    ezkl.export()
