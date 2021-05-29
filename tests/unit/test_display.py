from honu import Display, Game, Player, Flag, Tile
from honu.game import Direction


def test_display_creation():
    game = Game([[Tile.GREEN, Tile.YELLOW], [Tile.BLUE, Tile.EMPTY]],
                Player((0, 0), Direction.SOUTH),
                [Flag((1, 0))])
    display = Display(game, 600, 600, 0)

    assert(len(display.tile_graphics) == 2)
    assert(len(display.tile_graphics[0]) == 2)

    assert(display.tile_graphics[0][0].fill_name == Tile.GREEN.value)
    assert(display.tile_graphics[0][1].fill_name == Tile.YELLOW.value)
    assert(display.tile_graphics[1][0].fill_name == Tile.BLUE.value)
    assert(display.tile_graphics[1][1].fill_name == Tile.EMPTY.value)

    assert(display.turtle_graphics)
    assert((display.turtle_graphics.i, display.turtle_graphics.j) == (0, 0))

    assert(len(display.flag_graphics) == 1)
    assert((display.flag_graphics[0].i, display.flag_graphics[0].j) == (1, 0))


def test_display_move_on_flag():
    game = Game([[Tile.GREEN, Tile.GREEN], [Tile.GREEN, Tile.GREEN]],
                Player((0, 0), Direction.SOUTH),
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
                Player((0, 0), Direction.SOUTH),
                [Flag((1, 0))])
    display = Display(game, 600, 600, 0)

    assert(display.tile_graphics[0][0].fill_name == Tile.GREEN.value)

    game.write_below(Tile.ORANGE)

    assert(display.tile_graphics[0][0].fill_name == Tile.ORANGE.value)

def test_turtle_movement():
    game = Game([[Tile.GREEN, Tile.GREEN], [Tile.GREEN, Tile.GREEN]],
                Player((0, 0), Direction.SOUTH),
                [Flag((1, 0))])
    display = Display(game, 600, 600, 0)
    
    assert((display.turtle_graphics.i,display.turtle_graphics.j)==(0,0))
    assert(display.turtle_graphics.dir == Direction.SOUTH)

    game.right()
    assert((display.turtle_graphics.i,display.turtle_graphics.j)==(1,0))
    assert(display.turtle_graphics.dir == Direction.SOUTH)
    
    game.turn_right()
    assert((display.turtle_graphics.i,display.turtle_graphics.j)==(1,0))
    assert(display.turtle_graphics.dir == Direction.WEST)

    game.backward()
    assert((display.turtle_graphics.i,display.turtle_graphics.j)==(1,0))
    assert(display.turtle_graphics.dir == Direction.WEST)

    game.forward()
    assert((display.turtle_graphics.i,display.turtle_graphics.j)==(0,0))
    assert(display.turtle_graphics.dir == Direction.WEST)