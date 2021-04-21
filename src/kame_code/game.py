from typing import List, TYPE_CHECKING
from enum import Enum

if TYPE_CHECKING:
    from kame_code.display import Display


class Direction(Enum):
    NORTH = "N"
    EAST = "E"
    SOUTH = "S"
    WEST = "W"


# used to calculate rotations
direction_array = [Direction.NORTH, Direction.EAST,
                   Direction.SOUTH, Direction.WEST]


class WinCondition(Enum):
    GET_ALL_FLAGS = 'get all flags'
    CALC_OUTPUT = 'calculate output'
    MODIFY_BOARD = 'modify_board'


class Tile(Enum):
    EMPTY = 'grey'

    WHITE = 'white'
    BLACK = 'black'
    GREY = 'grey'
    RED = 'red'
    ORANGE = 'orange'
    YELLOW = 'yellow'
    GREEN = 'green'
    BLUE = 'blue'
    PURPLE = 'purple'


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


class IGame():
    def register_observer(self, observer: 'Display') -> None:
        pass


class Game(IGame):
    def __init__(self, level: List[List[Tile]], player: Player, flags: List[Flag]):
        self.level = level
        self.width = len(level)
        self.height = len(level[0]) if len(level) > 0 else 0
        self.player = player
        self.flags = flags
        self._observers: List['Display'] = []

    def debug_print(self):
        for row in self.level:
            tile_string = []
            for tile in row:
                tile_string.append(tile.value)
            print(tile_string)
        print(f'player: {self.player.pos.x},{self.player.pos.y}')
        print(
            f'flags: {", ".join([",".join([str(flag.pos.x), str(flag.pos.y)]) for flag in self.flags])}')

    def __remove_flags_if_below(self) -> None:
        for flag in self.flags:
            if flag.pos.x == self.player.pos.x and flag.pos.y == self.player.pos.y:
                self.flags.remove(flag)

    def _add_observer(self, observer: 'Display') -> None:
        self._observers.append(observer)

    def update_frame(self) -> None:
        for observer in self._observers:
            observer.update(self)

    def write_below(self, tile: Tile) -> None:
        self.level[self.player.pos.y][self.player.pos.x] = tile

    def read_below(self) -> Tile:
        return self.level[self.player.pos.y][self.player.pos.x]

    def up(self) -> bool:
        if self.player.pos.y > 0:
            self.player.pos.y -= 1
            self.__remove_flags_if_below()
            return True
        else:
            return False

    def down(self) -> bool:
        if self.player.pos.y < self.height:
            self.player.pos.y += 1
            self.__remove_flags_if_below()
            return True
        else:
            return False

    def left(self) -> bool:
        if self.player.pos.x > 0:
            self.player.pos.x -= 1
            self.__remove_flags_if_below()
            return True
        else:
            return False

    def right(self) -> bool:
        if self.player.pos.x < self.width:
            self.player.pos.x += 1
            self.__remove_flags_if_below()
            return True
        else:
            return False


class TestCase():
    def __init__(self, name: str, desc: str, game: Game, expectedLevel, expectedOutput):
        self.name = name
        self.desc = desc
        self.game = game
        self.expectedLevel = expectedLevel
        self.expectedOutput = expectedOutput


# class Kame:
#     @staticmethod
#     generate_game():
