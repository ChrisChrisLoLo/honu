from honu.game import Direction, Tile, Player, Flag, Game
from honu.display import Display


def test_game_construction():
    Game([[Tile.PURPLE, Tile.PURPLE, Tile.PURPLE, Tile.PURPLE, Tile.PURPLE],
          [Tile.PURPLE, Tile.PURPLE, Tile.PURPLE, Tile.PURPLE, Tile.PURPLE],
          [Tile.PURPLE, Tile.PURPLE, Tile.PURPLE, Tile.PURPLE, Tile.PURPLE],
          [Tile.PURPLE, Tile.PURPLE, Tile.PURPLE, Tile.PURPLE, Tile.PURPLE],
          [Tile.PURPLE, Tile.PURPLE, Tile.PURPLE, Tile.PURPLE, Tile.PURPLE]],
         Player((0, 0), Direction.SOUTH),
         [Flag((2, 2))])


def test_write_below():
    level = [[Tile.RED, Tile.RED], [Tile.RED, Tile.RED]]
    h = Game(level, Player((0, 0), Direction.SOUTH), [])

    h.write_below(Tile.GREEN)

    assert(level[0][0] == Tile.GREEN)


def test_read_below():
    level = [[Tile.EMPTY, Tile.EMPTY], [Tile.EMPTY, Tile.PURPLE]]
    h = Game(level, Player((1, 1), Direction.SOUTH), [])

    assert(h.read_below() == Tile.PURPLE)


def test_up():
    level = [[Tile.GREEN, Tile.GREEN], [Tile.GREEN, Tile.GREEN]]
    h = Game(level, Player((0, 1), Direction.SOUTH), [])

    assert(h.get_pos() == (0, 1))

    res = h.up()

    assert(res == True)

    assert(h.get_pos() == (0, 0))

    res = h.up()

    assert(res == False)

    assert(h.get_pos() == (0, 0))


def test_down():
    level = [[Tile.GREEN, Tile.GREEN], [Tile.GREEN, Tile.GREEN]]
    h = Game(level, Player((0, 0), Direction.SOUTH), [])

    assert(h.get_pos() == (0, 0))

    res = h.down()

    assert(res == True)

    assert(h.get_pos() == (0, 1))

    res = h.down()

    assert(res == False)

    assert(h.get_pos() == (0, 1))


def test_left():
    level = [[Tile.GREEN, Tile.GREEN], [Tile.GREEN, Tile.GREEN]]
    h = Game(level, Player((1, 0), Direction.SOUTH), [])

    assert(h.get_pos() == (1, 0))

    res = h.left()

    assert(res == True)

    assert(h.get_pos() == (0, 0))

    res = h.left()

    assert(res == False)

    assert(h.get_pos() == (0, 0))


def test_right():
    level = [[Tile.GREEN, Tile.GREEN], [Tile.GREEN, Tile.GREEN]]
    h = Game(level, Player((0, 0), Direction.SOUTH), [])

    assert(h.get_pos() == (0, 0))

    res = h.right()

    assert(res == True)

    assert(h.get_pos() == (1, 0))

    res = h.right()

    assert(res == False)

    assert(h.get_pos() == (1, 0))


def test_turn_right():
    level = [[Tile.GREEN, Tile.GREEN], [Tile.GREEN, Tile.GREEN]]
    h = Game(level, Player((0, 0), Direction.SOUTH), [])

    assert(h.get_dir() == 'S')
    assert(h.get_pos() == (0, 0))

    res = h.turn_right()
    assert(res)
    assert(h.get_dir() == 'W')
    assert(h.get_pos() == (0, 0))

    assert(h.turn_right())
    assert(h.get_pos() == (0, 0))

    assert(h.get_dir() == 'N')
    assert(h.get_pos() == (0, 0))

    assert(h.turn_right())
    assert(h.get_dir() == 'E')
    assert(h.get_pos() == (0, 0))

    assert(h.turn_right())
    assert(h.get_dir() == 'S')
    assert(h.get_pos() == (0, 0))


def test_turn_left():
    level = [[Tile.YELLOW, Tile.YELLOW], [Tile.YELLOW, Tile.YELLOW]]
    h = Game(level, Player((0, 0), Direction.SOUTH), [])

    assert(h.get_dir() == 'S')
    assert(h.get_pos() == (0, 0))

    res = h.turn_left()
    assert(res)
    assert(h.get_dir() == 'E')
    assert(h.get_pos() == (0, 0))

    assert(h.turn_left())
    assert(h.get_pos() == (0, 0))

    assert(h.get_dir() == 'N')
    assert(h.get_pos() == (0, 0))

    assert(h.turn_left())
    assert(h.get_dir() == 'W')
    assert(h.get_pos() == (0, 0))

    assert(h.turn_left())
    assert(h.get_dir() == 'S')
    assert(h.get_pos() == (0, 0))


def test_forward():
    level = [[Tile.GREEN, Tile.GREEN], [Tile.GREEN, Tile.GREEN]]
    h = Game(level, Player((0, 0), Direction.SOUTH), [])

    wasSuccess = h.forward()
    assert(wasSuccess == True)
    assert(h.get_dir() == 'S')
    assert(h.get_pos() == (0, 1))

    wasSuccess = h.forward()
    assert(wasSuccess == False)
    assert(h.get_dir() == 'S')
    assert(h.get_pos() == (0, 1))


def test_backward():
    level = [[Tile.ORANGE, Tile.ORANGE], [Tile.ORANGE, Tile.ORANGE]]
    h = Game(level, Player((0, 1), Direction.EAST), [])

    wasSuccess = h.forward()
    assert(wasSuccess == True)
    assert(h.get_dir() == 'E')
    assert(h.get_pos() == (1, 1))

    wasSuccess = h.forward()
    assert(wasSuccess == False)
    assert(h.get_dir() == 'E')
    assert(h.get_pos() == (1, 1))


def test_steering():
    level = [[Tile.ORANGE, Tile.ORANGE, Tile.ORANGE],
             [Tile.ORANGE, Tile.ORANGE, Tile.ORANGE]]
    h = Game(level, Player((0, 0), Direction.EAST), [])

    h.forward()
    h.forward()

    # does nothing
    h.forward()

    h.turn_right()
    assert(h.get_dir() == 'S')
    h.forward()

    h.turn_right()
    h.forward()
    h.forward()

    h.backward()

    assert(h.get_dir() == 'W')
    assert(h.get_pos() == (1, 1))


def test_empty_tile():
    level = [[Tile.GREY, Tile.EMPTY, Tile.GREY, Tile.GREY]]
    h = Game(level, Player((3, 0), Direction.SOUTH), [])

    assert(h.get_pos() == (3, 0))

    res = h.left()

    assert(res == True)

    assert(h.get_pos() == (2, 0))

    res = h.left()

    assert(res == False)

    assert(h.get_pos() == (2, 0))


def test_flag_removal():
    level = [[Tile.GREEN, Tile.GREEN], [Tile.GREEN, Tile.GREEN]]
    h = Game(level, Player((0, 0), Direction.SOUTH),
             [Flag((0, 0)), Flag((1, 0))])

    # flag should be removed as player is already on one
    assert(len(h.flags) == 1)
    h.right()

    assert(len(h.flags) == 0)
