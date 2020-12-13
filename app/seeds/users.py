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
                type='push',
                trainer_id=1,)

    db.session.add(demo)

    db.session.commit()

def seed_workoutintensities():

    demo = WorkoutIntensity(sets=3,
                reps=10,
                trainer_id=1,)

    db.session.add(demo)

    db.session.commit()

def seed_workoutplans():

    demo = WorkoutPlan(name='Back Workout',
                workout1='Push Ups',
                set1='Reps: 10, Sets 3',
                workout2='Push Ups',
                set2='Reps: 10, Sets 3',
                workout3='Push Ups',
                set3='Reps: 10, Sets 3',
                workout4='Push Ups',
                set4='Reps: 10, Sets 3',
                workout5='Push Ups',
                set5='Reps: 10, Sets 3',
                workout6='Push Ups',
                set6='Reps: 10, Sets 3',
                workout7='Push Ups',
                set7='Reps: 10, Sets 3',
                workout8='Push Ups',
                set8='Reps: 10, Sets 3',
                time='3:00pm',
                date='12/8/2020',
                client_id=1,
                trainer_id=1)

    demo2 = WorkoutPlan(name='Shoulders Workout',
                workout1='Push Ups',
                set1='Reps: 10, Sets 3',
                workout2='Push Ups',
                set2='Reps: 10, Sets 3',
                workout3='Push Ups',
                set3='Reps: 10, Sets 3',
                workout4='Push Ups',
                set4='Reps: 10, Sets 3',
                workout5='Push Ups',
                set5='Reps: 10, Sets 3',
                workout6='Push Ups',
                set6='Reps: 10, Sets 3',
                workout7='Push Ups',
                set7='Reps: 10, Sets 3',
                workout8='Push Ups',
                set8='Reps: 10, Sets 3',
                time='3:00pm',
                date='12/8/2020',
                client_id=1,
                trainer_id=1)

    demo3 = WorkoutPlan(name='Chest Workout',
                workout1='Push Ups',
                set1='Reps: 10, Sets 3',
                workout2='Push Ups',
                set2='Reps: 10, Sets 3',
                workout3='Push Ups',
                set3='Reps: 10, Sets 3',
                workout4='Push Ups',
                set4='Reps: 10, Sets 3',
                workout5='Push Ups',
                set5='Reps: 10, Sets 3',
                workout6='Push Ups',
                set6='Reps: 10, Sets 3',
                workout7='Push Ups',
                set7='Reps: 10, Sets 3',
                workout8='Push Ups',
                set8='Reps: 10, Sets 3',
                time='3:00pm',
                date='12/8/2020',
                client_id=1,
                trainer_id=1)

    demo4 = WorkoutPlan(name='Legs Workout',
                workout1='Push Ups',
                set1='Reps: 10, Sets 3',
                workout2='Push Ups',
                set2='Reps: 10, Sets 3',
                workout3='Push Ups',
                set3='Reps: 10, Sets 3',
                workout4='Push Ups',
                set4='Reps: 10, Sets 3',
                workout5='Push Ups',
                set5='Reps: 10, Sets 3',
                workout6='Push Ups',
                set6='Reps: 10, Sets 3',
                workout7='Push Ups',
                set7='Reps: 10, Sets 3',
                workout8='Push Ups',
                set8='Reps: 10, Sets 3',
                time='3:00pm',
                date='12/8/2020',
                client_id=1,
                trainer_id=1)

    demo5 = WorkoutPlan(name='Abs Workout',
                workout1='Push Ups',
                set1='Reps: 10, Sets 3',
                workout2='Push Ups',
                set2='Reps: 10, Sets 3',
                workout3='Push Ups',
                set3='Reps: 10, Sets 3',
                workout4='Push Ups',
                set4='Reps: 10, Sets 3',
                workout5='Push Ups',
                set5='Reps: 10, Sets 3',
                workout6='Push Ups',
                set6='Reps: 10, Sets 3',
                workout7='Push Ups',
                set7='Reps: 10, Sets 3',
                workout8='Push Ups',
                set8='Reps: 10, Sets 3',
                time='3:00pm',
                date='12/8/2020',
                client_id=1,
                trainer_id=1)

    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)

    db.session.commit()

def seed_routinelist():

    routinelist1 = RoutineList(name='routinelist 1',
                workoutplan_id=1)

    db.session.add(routinelist1)

    routinelist2 = RoutineList(name='routinelist 2',
                workoutplan_id=2)

    db.session.add(routinelist1)

    routinelist3 = RoutineList(name='routinelist 3',
                workoutplan_id=3)

    db.session.add(routinelist1)
    db.session.add(routinelist2)
    db.session.add(routinelist3)

    db.session.commit()

def seed_routine():
    some_owner = RoutineList.query.filter_by(name='routinelist 1').first()
    demo = Routine(owner=some_owner,
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
