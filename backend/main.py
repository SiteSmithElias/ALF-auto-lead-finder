from database.database import engine


connection = engine.connect()

print("Database connected!")

connection.close()