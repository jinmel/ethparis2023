"""Image util."""

import numpy as np
import torch


def get_coordinates(dim_x, dim_y, scale=1.0, batch_size=1):
    """Calculates and returns a vector of x and y coordintes, and corresponding
    radius from the centre of image."""

    n_points = dim_x * dim_y
    x_range = scale * (np.arange(dim_x) - (dim_x - 1) / 2.0) / (dim_x - 1) / 0.5
    y_range = scale * (np.arange(dim_y) - (dim_y - 1) / 2.0) / (dim_y - 1) / 0.5
    x_mat = np.matmul(np.ones((dim_y, 1)), x_range.reshape((1, dim_x)))
    y_mat = np.matmul(y_range.reshape((dim_y, 1)), np.ones((1, dim_x)))
    r_mat = np.sqrt(x_mat * x_mat + y_mat * y_mat)
    x_mat = np.tile(x_mat.flatten(), batch_size).reshape(batch_size, n_points, 1)
    y_mat = np.tile(y_mat.flatten(), batch_size).reshape(batch_size, n_points, 1)
    r_mat = np.tile(r_mat.flatten(), batch_size).reshape(batch_size, n_points, 1)
    return torch.from_numpy(x_mat).float(), torch.from_numpy(y_mat).float(), torch.from_numpy(r_mat).float()


def generate(model, z):
    """Generate image from given genome."""
    z = torch.tensor(z, dtype=torch.float16)
    result = model(z)
    result = result.view(-1, model.config.dim_x, model.config.dim_y, model.config.dim_c).cpu()
    result = result.permute((0, 3, 1, 2))
    return result
