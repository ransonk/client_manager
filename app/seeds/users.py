from werkzeug.security import generate_password_hash
# from app.models import db, User
from app.models import db, Trainer, Client

# Adds a demo user, you can add other users here if you want
def seed_trainers():

    demo = Trainer(firstName='Trainer1', lastName='Demo', email='trainer1@aa.io',
                password='password')

    db.session.add(demo)

    db.session.commit()

def seed_clients():

    demo = Client(firstName='Client1', lastName='Demo', email='client1@aa.io',
                password='password')

    db.session.add(demo)

    db.session.commit()

def undo_trainers():
    db.session.execute('TRUNCATE users;')
    db.session.commit()

# def seed_users():

#     demo = User(username='Demo', email='demo@aa.io',
#                 password='password')

#     db.session.add(demo)

#     db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key

# def undo_users():
#     db.session.execute('TRUNCATE users;')
#     db.session.commit()
