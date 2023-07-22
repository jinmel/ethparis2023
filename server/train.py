"""Model trainer."""
import json

from absl import app
from absl import flags
from absl import logging
import ezkl
import torch
import torch.onnx

from models import CPPN
from config import Config

FLAGS = flags.FLAGS

flags.DEFINE_string('checkpoint', None, 'Checkpoint path.')

def export(
    torch_model,
    input_shape=None,
    input_array=None,
    onnx_filename="network.onnx",
    input_filename="input.json",
    settings_filename="settings.json",
    run_gen_witness=True,
    run_calibrate_settings=True,
    calibration_target="resources",
    scale=None,
    batch_size=None,
):
    """Export a PyTorch model.
    Arguments:
    torch_model: a PyTorch model class, such as Network(torch.nn.Module)
    Optional Keyword Arguments:
    - input_shape: e.g. [3,2,3], a random input with these dimensions will be generated.
    - input_array: the given input will be used for the model
    Note: Exactly one of input_shape and input_array should be specified.
    - onnx_filename: Default "network.onnx", the name of the onnx file to be generated
    - input_filename: Default "input.json", the name of the json input file to be generated for ezkl
    - settings_filename: Default "settings.json", the name of the settings file name generated in the calibration step
    - run_gen_witness: Default True, boolean flag to indicate whether gen witness will be run in export
    - run_calibrate_settings: Default True, boolean flag to indicate whether calibrate settings will be run in export
    - calibration_target: Default "resources", takes in two kinds of strings "resources" to optimize for resource, "accuracy" to optimize for accuracy
    - scale: Default 7, scale factor used in gen_witness
    - batch_size: Default 1, batch size used in gen_witness
    """
    if input_array is None:
        x = 0.1*torch.rand(1,*input_shape, requires_grad=True)
    else:
        x = torch.tensor(input_array)
        if input_shape is not None:
            assert tuple(input_shape) == x.shape
        new_shape = tuple([1]+list(x.shape))
        x = torch.reshape(x,new_shape)


    # Flips the neural net into inference mode
    torch_model.eval()

    torch_out = torch_model(x)

    # Export the model
    torch.onnx.export(torch_model,               # model being run
                      x,                   # model input (or a tuple for multiple inputs)
                      onnx_filename,            # where to save the model (can be a file or file-like object)
                      export_params=True,        # store the trained parameter weights inside the model file
                      opset_version=10,          # the ONNX version to export the model to
                      do_constant_folding=True,  # whether to execute constant folding for optimization
                      input_names = ['input'],   # the model's input names
                      output_names = ['output'], # the model's output names
                      dynamic_axes={'input' : {0 : 'batch_size'},    # variable length axes
                                    'output' : {0 : 'batch_size'}})

    data_array = ((x).detach().numpy()).reshape([-1]).tolist()

    data = dict(input_shapes = [input_shape],
                input_data = [data_array],
                output_data = [((o).detach().numpy()).reshape([-1]).tolist() for o in torch_out])

    # Serialize data into file:
    json.dump(data, open( input_filename, 'w' ))

    # calibrates the setup and updates the settings file
    if run_calibrate_settings:
        ezkl.gen_settings(onnx_filename, settings_filename)
        ezkl.calibrate_settings(
            input_filename, onnx_filename, settings_filename, calibration_target)

    # Runs a forward operation to quantize inputs
    if run_gen_witness:
        # Uses existing settings file
        ezkl.gen_witness(
            data=input_filename,
            model=onnx_filename,
            output=input_filename,
            scale=scale,
            batch_size=batch_size,
            settings_path=settings_filename
        )




def main(_):
    config = Config()
    model = CPPN(config)
    torch.save(model.state_dict(), FLAGS.checkpoint)
    logging.info('Saved checkpoint to %s', FLAGS.checkpoint)
    with torch.no_grad():
        export(model, onnx_filename='model.onnx', input_shape=[1, config.dim_z], run_gen_witness=False, run_calibrate_settings=False)


if __name__ == '__main__':
    app.run(main)
