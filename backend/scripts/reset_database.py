from database.database import Base, engine
from database import models

print("Dropping database...")
Base.metadata.drop_all(bind=engine)

print("Creating database...")
Base.metadata.create_all(bind=engine)

print("Done.")