from honu import Display, Game, Player, Flag, Tile, Direction


def test_display_creation():
    game = Game([[Tile.GREEN, Tile.YELLOW], [Tile.BLUE, Tile.EMPTY]],
                Player(Direction.SOUTH, (0, 0)),
                [Flag((1, 0))])
    display = Display(game, 600, 600, 0)

    assert(len(display.tile_graphics) == 2)
    assert(len(display.tile_graphics[0]) == 2)

    assert(display.tile_graphics[0][0].fill == Tile.GREEN.value)
    assert(display.tile_graphics[0][1].fill == Tile.YELLOW.value)
    assert(display.tile_graphics[1][0].fill == Tile.BLUE.value)
    assert(display.tile_graphics[1][1].fill == Tile.EMPTY.value)

    assert(display.turtle_graphics)
    assert((display.turtle_graphics.i, display.turtle_graphics.j) == (0, 0))

    assert(len(display.flag_graphics) == 1)
    assert((display.flag_graphics[0].i, display.flag_graphics[0].j) == (1, 0))


def test_display_move_on_flag():
    game = Game([[Tile.GREEN, Tile.GREEN], [Tile.GREEN, Tile.GREEN]],
                Player(Direction.SOUTH, (0, 0)),
                [Flag((1, 0))])
    display = Display(game, 600, 600, 0)

    assert(display.turtle_graphics)
    assert((display.turtle_graphics.i, display.turtle_graphics.j) == (0, 0))
    assert(len(display.flag_graphics) == 1)

    game.right()

    assert((display.turtle_graphics.i, display.turtle_graphics.j) == (1, 0))

    assert(len(display.flag_graphics) == 0)


def test_tile_update():
    game = Game([[Tile.GREEN, Tile.GREEN], [Tile.GREEN, Tile.GREEN]],
                Player(Direction.SOUTH, (0, 0)),
                [Flag((1, 0))])
    display = Display(game, 600, 600, 0)

    assert(display.tile_graphics[0][0].fill == Tile.GREEN.value)

    game.write_below(Tile.ORANGE)

    assert(display.tile_graphics[0][0].fill == Tile.ORANGE.value)
