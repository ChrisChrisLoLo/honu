from typing import List
from enum import Enum


class Direction(Enum):
    NORTH = "N"
    EAST = "E"
    SOUTH = "S"
    WEST = "W"


# used to calculate rotations
direction_array = [Direction.NORTH, Direction.EAST,
                   Direction.SOUTH, Direction.WEST]


class Tile(Enum):
    EMPTY = '_'

    WHITE = 'w'
    BLACK = 'b'
    GREY = 'g'
    RED = 'r'
    ORANGE = 'o'
    YELLOW = 'y'
    GREEN = 'g'
    BLUE = 'B'
    PURPLE = 'p'


class Position():
    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y


class Player():
    def __init__(self, dir: Direction, pos: Position):
        self.dir = dir
        self.pos = pos


class Flag():
    def __init__(self, pos: Position):
        self.pos = pos


class Kame():
    def __init__(self, level: List[List[Tile]], player: Player, flags: List[Flag]):
        self.level = level
        self.player = player
        self.flags = flags

    def up(self) -> None:
        self.player.pos.x = 22
