"""Genetic algorithms."""

import random

import numpy as np


def crossover(p1, p2):
    """Selects two individuals from the genes."""
    point = np.random.randint(0, len(p1))
    c1 = np.concatenate((p1[:point], p2[point:]))
    c2 = np.concatenate((p2[:point], p1[point:]))
    return c1, c2


def mutation(p, rate):
    """Mutates the individual with given rate."""
    for i in range(len(p)):
        if np.random.random() < rate:
            p[i] = np.random.uniform(-1.0, 1.0)
    return p


def evolution(selected, m_rate, num):
    """Evolution of the selected genes."""
    children = []
    for _ in range(num):
        p1 = np.random.randint(0, len(selected))
        p2 = np.random.randint(0, len(selected))
        c1, c2 = crossover(selected[p1], selected[p2])
        c1 = mutation(c1, m_rate)
        c2 = mutation(c2, m_rate)
        children.append(c1)
        children.append(c2)
    return random.choices(children, num)


def populate(size, dim):
    return np.random.uniform(-1.0, 1.0, size=(size, dim)).astype(np.float32)
