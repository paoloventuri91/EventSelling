import sys, zerorpc
from dbManager import DbManager

class EventSellingApi(object):
   def __init__(self):
      self.dbManager = DbManager()

   def echo(self, text):
      return text

   def getEvents(self):
      try:
         return self.dbManager.getEvents()

      except Exception as e:
         return 0.0

def parse_port():
   port = 4243
   try:
      port = int(sys.argv[1])
   except Exception as e:
      pass
   return '{}'.format(port)

def main():
   addr = 'tcp://127.0.0.1:' + parse_port()
   s = zerorpc.Server(EventSellingApi())
   s.bind(addr)
   print('start running on {}'.format(addr))
   s.run()

if __name__ == '__main__':
   main()
