from werkzeug.security import generate_password_hash
# from app.models import db, User
from app.models import db, Trainer, Client, Workout, WorkoutPlan, WorkoutIntensity, RoutineList, Routine

# Adds a demo user, you can add other users here if you want
def seed_trainers():

    demo = Trainer(firstName='Demo',
                lastName='Demo',
                email='demo@aa.io',
                password='demo')

    db.session.add(demo)

    db.session.commit()

def seed_clients():

    demo = Client(firstName='Client1',
                lastName='Demo',
                email='client2@aa.io',
                phone='123-123-1234',
                weight='123 lbs',
                age='43',
                duedate='11/21/93',
                amount='30.99',
                paid=True,
                noshows=0,
                cancellations=1,
                trainer_id=1,
                password='client')

    db.session.add(demo)

    db.session.commit()

def seed_workouts():

    demo = Workout(name='Push Ups',
                description='Elbows at 90 degree angle',
                trainer_id=1,)

    db.session.add(demo)

    db.session.commit()

def seed_workoutintensity():

    demo = WorkoutIntensity(sets=3,
                reps=10,
                trainer_id=1,)

    db.session.add(demo)

    db.session.commit()

def seed_workoutplans():

    demo = WorkoutPlan(name='Suzy Workout',
                description='for fridays',
                time='3:00pm',
                date='12/8/2020',
                pull=True,
                push=False,
                client_id=1,)

    demo2 = WorkoutPlan(name='Suzy Workout',
                description='for fridays',
                time='3:00pm',
                date='12/8/2020',
                pull=True,
                push=False,
                client_id=1,)

    db.session.add(demo)
    db.session.add(demo2)

    db.session.commit()

def seed_routinelist():

    demo = RoutineList(name='routinelist 1',
                workoutplan_id=1)

    db.session.add(demo)

    db.session.commit()

def seed_routine():

    demo = Routine(owner='routinelist 1',
                workout_id=1,
                workoutintensity_id=1)

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
