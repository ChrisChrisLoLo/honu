from kame_code.game import Game, Tile, Player, Position, Direction, Flag
from kame_code.display import Display


def create_game():
    game = Game([[Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY],
                 [Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY],
                 [Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY],
                 [Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY],
                 [Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY]],
                Player(Direction.EAST, Position(0, 0)),
                [Flag(Position(2, 2))])
    display = Display(game)
    return game