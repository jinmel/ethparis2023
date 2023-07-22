"""FastAPI server for model and zkml proving."""

import logging
import os
from typing import List
import uuid

import ezkl
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, field_validator
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
model.load_state_dict(torch.load(os.environ['CHECKPOINT_PATH']))
logger.info('Loaded checkpoint from %s', os.environ['CHECKPOINT_PATH'])


class GenerateRequest(BaseModel):
    """Image model."""
    genomes: List[List[float]]

    @field_validator('genomes')
    def check_genomes(cls, v):
        """Check genome length."""
        for genome in v:
            if len(genome) != config.dim_z:
                raise ValueError('Invalid genome length')


class EvolveRequest(BaseModel):
    """Evolve request."""
    genomes: List[List[float]]
    num_children: int

    @field_validator('genomes')
    def check_genomes(cls, v):
        """Check genome length."""
        for genome in v:
            if len(genome) != config.dim_z:
                raise ValueError('Invalid genome length')


class ProveRequest(BaseModel):
    """Prove request."""
    genome: List[float]

    @field_validator('genome')
    def check_genomes(cls, v):
        """Check genome length."""
        if len(v) != config.dim_z:
            raise ValueError('Invalid genome length')


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
        image_uris.append('/images/' + filename)
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
    for genome in r.genomes:
        if len(genome) != 32:
            raise HTTPException(status_code=400, detail='Invalid genome length')
    children = genetic.evolution(r.genomes, 0.4, r.num_children)
    result = image_util.generate(model, children)
    image_uris = convert_tensor_to_images(result)
    response = []
    for uri, genome in zip(image_uris, r.genomes):
        response.append(Image(image=uri, genome=genome))
    return response


@app.post('/prove')
async def prove(r: ProveRequest):
    ezkl.export()


