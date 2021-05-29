from honu import HonuTest, Tile, Game

ht = HonuTest(enable_display=True,level="1")

@ht.code
def run_code(h: Game):
  h.write_below(Tile.RED)
  h.right()
  h.right()
  h.write_below(Tile.YELLOW)
  h.down()
  h.down()
  h.left()

  h.turn_left()
  h.turn_left()
  h.turn_left()