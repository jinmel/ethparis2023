"""Model for CPPN."""

import numpy as np
import torch
import torch.nn as nn

from config import Config


def get_coordinates(dim_x, dim_y, scale=1.0, batch_size=1):
    """Calculates and returns a vector of x and y coordintes, and corresponding
    radius from the centre of image."""
    n_points = dim_x * dim_y
    x_range = scale * (torch.arange(dim_x) - (dim_x - 1) / 2.0) / (dim_x - 1) / 0.5
    y_range = scale * (torch.arange(dim_y) - (dim_y - 1) / 2.0) / (dim_y - 1) / 0.5
    x_mat = torch.matmul(torch.ones((dim_y, 1)), x_range.reshape((1, dim_x)))
    y_mat = torch.matmul(y_range.reshape((dim_y, 1)), torch.ones((1, dim_x)))
    r_mat = torch.sqrt(x_mat * x_mat + y_mat * y_mat)
    x_mat = x_mat.flatten().repeat(batch_size).reshape(batch_size, n_points, 1)
    y_mat = y_mat.flatten().repeat(batch_size).reshape(batch_size, n_points, 1)
    r_mat = r_mat.flatten().repeat(batch_size).reshape(batch_size, n_points, 1)
    # x_mat = torch.tile(x_mat.flatten(), [batch_size]).reshape(batch_size, n_points, 1)
    # y_mat = torch.tile(y_mat.flatten(), [batch_size]).reshape(batch_size, n_points, 1)
    # r_mat = torch.tile(r_mat.flatten(), [batch_size]).reshape(batch_size, n_points, 1)
    return x_mat.float(), y_mat.float(), r_mat.float()


def weights_init(m):
    classname = m.__class__.__name__
    if classname.find('Linear') != -1:
        m.weight.data.normal_(0.0, 1.0)
        if m.bias is not None:
            m.bias.data.fill_(0)


class CPPN(nn.Module):
    def __init__(self, config: Config):
        super(CPPN, self).__init__()
        self.config = config
        dim_z = config.dim_z
        dim_c = config.dim_c
        n_nodes = config.n_nodes

        self.l_z = nn.Linear(dim_z, n_nodes, bias=False)
        self.l_x = nn.Linear(1, n_nodes, bias=False)
        self.l_y = nn.Linear(1, n_nodes, bias=False)
        self.l_r = nn.Linear(1, n_nodes, bias=False)
        self.relu1 = nn.Tanh()
        self.linear1 = nn.Linear(n_nodes, n_nodes)
        self.relu2 = nn.Tanh()
        self.linear2 = nn.Linear(n_nodes, n_nodes)
        self.relu3 = nn.Tanh()
        self.linear3 = nn.Linear(n_nodes, n_nodes)
        self.relu4 = nn.Tanh()
        self.linear4 = nn.Linear(n_nodes, dim_c)
        self.sigmoid = nn.Sigmoid()

        self._initialize()

    def _initialize(self):
        self.apply(weights_init)

    def forward(self, z):
        batch_size = z.shape[0]
        n_points = self.config.dim_x * self.config.dim_y
        x, y, r = get_coordinates(self.config.dim_x, self.config.dim_y, self.config.scale, batch_size)
        z_scaled = torch.reshape(z, (batch_size, 1, self.config.dim_z)) * torch.ones((n_points, 1)) * self.config.scale
        u = self.l_z(z_scaled) + self.l_x(x) + self.l_y(y) + self.l_r(r)
        u = self.relu1(u)
        u = self.linear1(u)
        u = self.relu2(u)
        u = self.linear2(u)
        u = self.relu3(u)
        u = self.linear3(u)
        u = self.relu4(u)
        u = self.linear4(u)
        u = self.sigmoid(u)
        return u
