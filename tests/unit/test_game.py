from honu import game
from honu.game import Direction, WinCondition, Tile, Player, Flag, Game


def test_game_construction():
    Game([[Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY],
          [Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY],
          [Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY],
          [Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY],
          [Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY]],
         Player(Direction.EAST, (0, 0)),
         [Flag((2, 2))])


def test_write_below():
    level = [[Tile.EMPTY, Tile.EMPTY], [Tile.EMPTY, Tile.EMPTY]]
    h = Game(level, Player(Direction.EAST, (0, 0)), [])

    h.write_below(Tile.GREEN)

    assert(level[0][0] == Tile.GREEN)


def test_read_below():
    level = [[Tile.EMPTY, Tile.EMPTY], [Tile.EMPTY, Tile.PURPLE]]
    h = Game(level, Player(Direction.EAST, (1, 1)), [])

    assert(h.read_below() == Tile.PURPLE)


def test_up():
    level = [[Tile.EMPTY, Tile.EMPTY], [Tile.EMPTY, Tile.EMPTY]]
    h = Game(level, Player(Direction.EAST, (0, 1)), [])

    assert(h.get_pos() == (0, 1))

    res = h.up()

    assert(res == True)

    assert(h.get_pos() == (0, 0))

    res = h.up()

    assert(res == False)

    assert(h.get_pos() == (0, 0))


def test_down():
    level = [[Tile.EMPTY, Tile.EMPTY], [Tile.EMPTY, Tile.EMPTY]]
    h = Game(level, Player(Direction.EAST, (0, 0)), [])

    assert(h.get_pos() == (0, 0))

    res = h.down()

    assert(res == True)

    assert(h.get_pos() == (0, 1))

    res = h.down()

    assert(res == False)

    assert(h.get_pos() == (0, 1))


def test_left():
    level = [[Tile.EMPTY, Tile.EMPTY], [Tile.EMPTY, Tile.EMPTY]]
    h = Game(level, Player(Direction.EAST, (1, 0)), [])

    assert(h.get_pos() == (1, 0))

    res = h.left()

    assert(res == True)

    assert(h.get_pos() == (0, 0))

    res = h.left()

    assert(res == False)

    assert(h.get_pos() == (0, 0))


def test_right():
    level = [[Tile.EMPTY, Tile.EMPTY], [Tile.EMPTY, Tile.EMPTY]]
    h = Game(level, Player(Direction.EAST, (0, 0)), [])

    assert(h.get_pos() == (0, 0))

    res = h.right()

    assert(res == True)

    assert(h.get_pos() == (1, 0))

    res = h.right()

    assert(res == False)

    assert(h.get_pos() == (1, 0))


def test_flag_removal():
    level = [[Tile.EMPTY, Tile.EMPTY], [Tile.EMPTY, Tile.EMPTY]]
    h = Game(level, Player(Direction.EAST, (0, 0)),
             [Flag((0, 0)), Flag((1, 0))])

    # flag should be removed as player is already on one
    assert(len(h.flags) == 1)
    h.right()

    assert(len(h.flags) == 0)
