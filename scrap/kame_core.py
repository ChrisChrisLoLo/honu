from graphics import Circle, Point, GraphWin

def main():
  win = GraphWin("My Circle", 500, 500)
  c = Circle(Point(50,50), 10)
  c.draw(win)
  win.getMouse()
  win.close()

main()