import os, sqlite3

DB_FILENAME = 'db/EventSelling.db'
SCHEMA_FILENAME = 'db/EventSelling.sql'

class DbManager():
   def __init__(self):
      if not os.path.exists(DB_FILENAME):
         with sqlite3.connect(DB_FILENAME) as conn:
            with open(SCHEMA_FILENAME, 'rt') as f:
               schema = f.read()
            conn.executescript(schema)

      self.db_conn = sqlite3.connect(DB_FILENAME)
      self.db_conn.row_factory = _dict_factory

   def __exit__(self):
      self.db_conn.close()

   def getEvents(self):
      c = self.db_conn.cursor()
      c.execute('select * from events')
      return c.fetchall()

   def insertEvent(self, eventName):
      c = self.db_conn.cursor()
      c.execute('insert into events (name) values (?)', (eventName,))
      self.db_conn.commit()
      c.execute('select * from events where name = ?', (eventName,))
      return c.fetchone()

def _dict_factory(cursor, row):
   d = {}
   for idx, col in enumerate(cursor.description):
      d[col[0]] = row[idx]
   return d