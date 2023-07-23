"""Configuration file for the cppn model."""

import dataclasses


@dataclasses.dataclass
class Config:
    dim_z: int = 32
    dim_x: int = 256
    dim_y: int = 256
    dim_c: int = 3 # 3 for RGB channels, 1 for grayscale.
    n_nodes: int = 32
    scale = 8.0
