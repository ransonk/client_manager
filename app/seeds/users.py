from werkzeug.security import generate_password_hash
# from app.models import db, User
from app.models import db, Trainer, Client, History, Workout, WorkoutPlan, WorkoutIntensity, RoutineList, Routine

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

def seed_history():

    demo = History(name="dun",
   workout1='Push Ups',
   workout1Score=100,
   workout2='Pull Ups',
   workout2Score=100,
   workout3='Squats',
   workout3Score=80,
   workout4='Shoulder Press',
   workout4Score=95,
   workout5='Rows',
   workout5Score=75,
   workout6='Lateral Raises',
   workout6Score=35,
   workout7='Sumo Squats',
   workout7Score=120,
   workout8='Bicep Curls',
   workout8Score=45,
    date='12/28/2020',
    client_id=1,
    trainer_id=1)

    demo1 = History(name="dun1",
    workout1='Push Ups',
    workout1Score=110,
    workout2='Pull Ups',
    workout2Score=90,
    workout3='Squats',
    workout3Score=95,
    workout4='Shoulder Press',
    workout4Score=87,
    workout5='Rows',
    workout5Score=85,
    workout6='Lateral Raises',
    workout6Score=40,
    workout7='Sumo Squats',
    workout7Score=85,
    workout8='Bicep Curls',
    workout8Score=47,
    date='12/29/2020',
    client_id=1,
    trainer_id=1)

    demo2 = History(name="dun2",
    workout1='Push Ups',
    workout1Score=120,
    workout2='Pull Ups',
    workout2Score=115,
    workout3='Squats',
    workout3Score=97,
    workout4='Shoulder Press',
    workout4Score=100,
    workout5='Rows',
    workout5Score=80,
    workout6='Lateral Raises',
    workout6Score=40,
    workout7='Sumo Squats',
    workout7Score=124,
    workout8='Bicep Curls',
    workout8Score=52,
    date='12/30/2020',
    client_id=1,
    trainer_id=1)

    demo3 = History(name="dun3",
    workout1='Push Ups',
    workout1Score=103,
    workout2='Pull Ups',
    workout2Score=95,
    workout3='Squats',
    workout3Score=110,
    workout4='Shoulder Press',
    workout4Score=110,
    workout5='Rows',
    workout5Score=90,
    workout6='Lateral Raises',
    workout6Score=30,
    workout7='Sumo Squats',
    workout7Score=140,
    workout8='Bicep Curls',
    workout8Score=55,
    date='12/31/2020',
    client_id=1,
    trainer_id=1)

    demo4 = History(name="dun4",
    workout1='Push Ups',
    workout1Score=110,
    workout2='Pull Ups',
    workout2Score=110,
    workout3='Squats',
    workout3Score=85,
    workout4='Shoulder Press',
    workout4Score=103,
    workout5='Rows',
    workout5Score=83,
    workout6='Lateral Raises',
    workout6Score=65,
    workout7='Sumo Squats',
    workout7Score=87,
    workout8='Bicep Curls',
    workout8Score=60,
    date='12/28/2020',
    client_id=2,
    trainer_id=1)

    demo5 = History(name="dun5",
    workout1='Push Ups',
    workout1Score=100,
    workout2='Pull Ups',
    workout2Score=100,
    workout3='Squats',
    workout3Score=80,
    workout4='Shoulder Press',
    workout4Score=95,
    workout5='Rows',
    workout5Score=75,
    workout6='Lateral Raises',
    workout6Score=35,
    workout7='Sumo Squats',
    workout7Score=120,
    workout8='Bicep Curls',
    workout8Score=45,
    date='12/29/2020',
    client_id=2,
    trainer_id=1)

    demo6 = History(name="dun6",
    workout1='Push Ups',
    workout1Score=100,
    workout2='Pull Ups',
    workout2Score=100,
    workout3='Squats',
    workout3Score=80,
    workout4='Shoulder Press',
    workout4Score=95,
    workout5='Rows',
    workout5Score=75,
    workout6='Lateral Raises',
    workout6Score=35,
    workout7='Sumo Squats',
    workout7Score=120,
    workout8='Bicep Curls',
    workout8Score=45,
    date='12/30/2020',
    client_id=3,
    trainer_id=1)

    demo7 = History(name="dun7",
    workout1='Push Ups',
    workout1Score=100,
    workout2='Pull Ups',
    workout2Score=100,
    workout3='Squats',
    workout3Score=80,
    workout4='Shoulder Press',
    workout4Score=95,
    workout5='Rows',
    workout5Score=75,
    workout6='Lateral Raises',
    workout6Score=35,
    workout7='Sumo Squats',
    workout7Score=120,
    workout8='Bicep Curls',
    workout8Score=45,
    date='12/31/2020',
    client_id=3,
    trainer_id=1)

    demo8 = History(name="dun8",
    workout1='Push Ups',
    workout1Score=100,
    workout2='Pull Ups',
    workout2Score=100,
    workout3='Squats',
    workout3Score=80,
    workout4='Shoulder Press',
    workout4Score=95,
    workout5='Rows',
    workout5Score=75,
    workout6='Lateral Raises',
    workout6Score=35,
    workout7='Sumo Squats',
    workout7Score=120,
    workout8='Bicep Curls',
    workout8Score=45,
    date='01/01/2020',
    client_id=3,
    trainer_id=1)

    demo9 = History(name="dun9",
    workout1='Push Ups',
    workout1Score=100,
    workout2='Pull Ups',
    workout2Score=100,
    workout3='Squats',
    workout3Score=80,
    workout4='Shoulder Press',
    workout4Score=95,
    workout5='Rows',
    workout5Score=75,
    workout6='Lateral Raises',
    workout6Score=35,
    workout7='Sumo Squats',
    workout7Score=120,
    workout8='Bicep Curls',
    workout8Score=45,
    date='01/02/2020',
    client_id=3,
    trainer_id=1)

    demo10 = History(name="dun10",
    workout1='Push Ups',
    workout1Score=100,
    workout2='Pull Ups',
    workout2Score=100,
    workout3='Squats',
    workout3Score=80,
    workout4='Shoulder Press',
    workout4Score=95,
    workout5='Rows',
    workout5Score=75,
    workout6='Lateral Raises',
    workout6Score=35,
    workout7='Sumo Squats',
    workout7Score=120,
    workout8='Bicep Curls',
    workout8Score=45,
    date='01/03/2020',
    client_id=3,
    trainer_id=1)

    demo11 = History(name="dun11",
    workout1='Push Ups',
    workout1Score=100,
    workout2='Pull Ups',
    workout2Score=100,
    workout3='Squats',
    workout3Score=80,
    workout4='Shoulder Press',
    workout4Score=95,
    workout5='Rows',
    workout5Score=75,
    workout6='Lateral Raises',
    workout6Score=35,
    workout7='Sumo Squats',
    workout7Score=120,
    workout8='Bicep Curls',
    workout8Score=45,
    date='01/04/2020',
    client_id=3,
    trainer_id=1)

    demo12 = History(name="dun12",
    workout1='Push Ups',
    workout1Score=100,
    workout2='Pull Ups',
    workout2Score=100,
    workout3='Squats',
    workout3Score=80,
    workout4='Shoulder Press',
    workout4Score=95,
    workout5='Rows',
    workout5Score=75,
    workout6='Lateral Raises',
    workout6Score=35,
    workout7='Sumo Squats',
    workout7Score=120,
    workout8='Bicep Curls',
    workout8Score=45,
    date='01/05/2020',
    client_id=4,
    trainer_id=1)

    db.session.add(demo)
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)
    db.session.add(demo9)
    db.session.add(demo10)
    db.session.add(demo11)
    db.session.add(demo12)

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

    demo5 = Workout(name='Lateral Raises',
                type='pull',
                trainer_id=1,)

    demo6 = Workout(name='Sumo Squats',
                type='push',
                trainer_id=1,)

    demo7 = Workout(name='Bicep Curls',
                type='pull',
                trainer_id=1,)

    demo8 = Workout(name='Tricep Dips',
                type='push',
                trainer_id=1,)

    demo9 = Workout(name='Crunches',
                type='pull',
                trainer_id=1,)

    demo10 = Workout(name='Bicycle Kicks',
                type='push',
                trainer_id=1,)

    db.session.add(demo)
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)
    db.session.add(demo9)
    db.session.add(demo10)

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
                workout1='Pull Ups',
                set1='Sets: 5 Reps: 6',
                workout2='Rows',
                set2='Sets: 3 Reps: 10',
                workout3='Pull Ups',
                set3='Sets: 3 Reps: 10',
                workout4='Shoulder Press',
                set4='Sets: 3 Reps: 10',
                workout5='Lateral Raises',
                set5='Sets: 3 Reps: 10',
                time='8:00 am',
                date='12/14/2020',
                clientFirstName='Mike',
                clientLastName='Shuff',
                client_id=1,
                trainer_id=1)

    demo2 = WorkoutPlan(name='Upper Body',
                workout1='Lateral Raises',
                set1='Sets: 3 Reps: 10',
                workout2='Rows',
                set2='Sets: 4 Reps: 12',
                workout3='Bicep Curls',
                set3='Sets: 2 Reps: 20',
                workout4='Tricep Dips',
                set4='Sets: 3 Reps: 10',
                workout5='Push Ups',
                set5='Sets: 4 Reps: 12',
                time='10:00 am',
                date='12/14/2020',
                clientFirstName='Peter',
                clientLastName='Kang',
                client_id=2,
                trainer_id=1)

    demo3 = WorkoutPlan(name='Leg Day',
                workout1='Sumo Squats',
                set1='Sets: 2 Reps: 20',
                workout2='Push Ups',
                set2='Sets: 3 Reps: 10',
                workout3='Squats',
                set3='Sets: 3 Reps: 10',
                workout4='Pull Ups',
                set4='Sets: 3 Reps: 10',
                time='3:00 pm',
                date='12/14/2020',
                clientFirstName='Derek',
                clientLastName='Kim',
                client_id=3,
                trainer_id=1)

    demo4 = WorkoutPlan(name='Pull Day',
                workout1='Pull Ups',
                set1='Sets: 3 Reps: 10',
                workout2='Rows',
                set2='Sets: 2 Reps: 20',
                workout3='Bicep Curls',
                set3='Sets: 4 Reps: 12',
                workout4='Squats',
                set4='Sets: 3 Reps: 10',
                time='6:00 pm',
                date='12/14/2020',
                clientFirstName='Warren',
                clientLastName='Tamagri',
                client_id=4,
                trainer_id=1)

    demo5 = WorkoutPlan(name='Abs Workout',
                workout1='Crunches',
                set1='Sets: 4 Reps: 12',
                workout2='Bicycle Kicks',
                set2='Sets: 2 Reps: 20',
                workout3='Crunches',
                set3='Sets: 2 Reps: 20',
                time='6:00 am',
                date='12/15/2020',
                clientFirstName='Derek',
                clientLastName='Kim',
                client_id=3,
                trainer_id=1)

    demo6 = WorkoutPlan(name='Full Body',
                workout1='Push Ups',
                set1='Sets: 3 Reps: 10',
                workout2='Pull Ups',
                set2='Sets: 4 Reps: 12',
                workout3='Squats',
                set3='Sets: 5 Reps: 6',
                workout4='Shoulder Press',
                set4='Sets: 3 Reps: 10',
                workout5='Crunches',
                set5='Sets: 2 Reps: 20',
                workout6='Lateral Raises',
                set6='Sets: 3 Reps: 10',
                workout7='Sumo Squats',
                set7='Sets: 4 Reps: 12',
                workout8='Bicep Curls',
                set8='Sets: 3 Reps: 10',
                time='12:00 pm',
                date='12/15/2020',
                clientFirstName='Peter',
                clientLastName='Kang',
                client_id=2,
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
    db.session.execute('TRUNCATE trainers CASCADE;')
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
