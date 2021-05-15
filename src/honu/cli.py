import sys, getopt

HELP_STR = 'honutest <testJSON> <pythonCode>'

def honutest(argv):
  optlist, args = getopt.getopt(argv, '')
  if len(args) != 2:
    print(HELP_STR)
  json_path, code_path = args

  

if __name__ == '__main__':
   honutest(sys.argv[1:])