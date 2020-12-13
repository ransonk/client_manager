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

    demo = Client(firstName='Mike',
                lastName='Shuff',
                email='mike@aa.io',
                phone='123-123-1234',
                weight='123 lbs',
                age='43',
                duedate='11/21/21',
                amount='30.99',
                paid=True,
                noshows=0,
                cancellations=1,
                trainer_id=1,
                password='client')

    demo1 = Client(firstName='Peter',
                lastName='Kang',
                email='peter@aa.io',
                phone='123-123-1234',
                weight='123 lbs',
                age='43',
                duedate='11/21/21',
                amount='99.99',
                paid=True,
                noshows=0,
                cancellations=1,
                trainer_id=1,
                password='client')

    demo2 = Client(firstName='Derek',
                lastName='Kim',
                email='derek@aa.io',
                phone='123-123-1234',
                weight='123 lbs',
                age='43',
                duedate='11/21/21',
                amount='35.99',
                paid=True,
                noshows=0,
                cancellations=1,
                trainer_id=1,
                password='client')

    demo3 = Client(firstName='Warren',
                lastName='Tamagri',
                email='warren@aa.io',
                phone='123-123-1234',
                weight='123 lbs',
                age='43',
                duedate='11/21/21',
                amount='1,000',
                paid=True,
                noshows=4,
                cancellations=1,
                trainer_id=1,
                password='client')

    db.session.add(demo)
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)

    db.session.commit()

def seed_workouts():

    demo = Workout(name='Push Ups',
                type='push',
                trainer_id=1,)

    demo1 = Workout(name='Pull Ups',
                type='pull',
                trainer_id=1,)

    demo2 = Workout(name='Squats',
                type='push',
                trainer_id=1,)

    demo3 = Workout(name='Shoulder Press',
                type='push',
                trainer_id=1,)

    demo4 = Workout(name='Rows',
                type='pull',
                trainer_id=1,)

    db.session.add(demo)
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)

    db.session.commit()

def seed_workoutintensities():

    demo = WorkoutIntensity(sets=3,
                reps=10,
                trainer_id=1,)

    demo1 = WorkoutIntensity(sets=4,
                reps=12,
                trainer_id=1,)

    demo2 = WorkoutIntensity(sets=2,
                reps=20,
                trainer_id=1,)

    demo3 = WorkoutIntensity(sets=5,
                reps=6,
                trainer_id=1,)

    db.session.add(demo)
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)

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
                time='1:00 pm',
                date='12/13/2020',
                clientFirstName='Mike',
                clientLastName='Shuff',
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
                time='2:00 pm',
                date='12/13/2020',
                clientFirstName='Mike',
                clientLastName='Shuff',
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
                time='3:00 pm',
                date='12/13/2020',
                clientFirstName='Mike',
                clientLastName='Shuff',
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
                time='7:00 am',
                date='12/13/2020',
                clientFirstName='Peter',
                clientLastName='Kang',
                client_id=2,
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
                time='5:00 pm',
                date='12/13/2020',
                clientFirstName='Derek',
                clientLastName='Kim',
                client_id=3,
                trainer_id=1)

    demo6 = WorkoutPlan(name='Abs Workout',
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
                time='7:00 pm',
                date='12/13/2020',
                clientFirstName='Warren',
                clientLastName='Tamagri',
                client_id=4,
                trainer_id=1)

    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)

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
