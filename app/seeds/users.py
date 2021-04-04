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


    db.session.add(demo)
    db.session.add(demo1)
    db.session.add(demo2)

    db.session.commit()

def seed_history():

    demo = History(name="Chest and Arms",
   workout1='Bench Press',
   workout1Score=100,
   workout2='Bicep Curls',
   workout2Score=100,
   workout3='Incline Bench',
   workout3Score=95,
   workout4='Tricep Dips',
   workout4Score=75,
   workout5='Decline Bench',
   workout5Score=35,
    date='01/01/2021',
    client_id=1,
    trainer_id=1)

    demo1 = History(name="Leg Day",
   workout1='Squats',
   workout1Score=100,
   workout2='Calf Raises',
   workout2Score=100,
   workout3='Lunges',
   workout3Score=95,
   workout4='Leg Curl',
   workout4Score=75,
   workout5='Crunches',
   workout5Score=35,
    date='01/02/2021',
    client_id=1,
    trainer_id=1)


    demo2 = History(name="Back and Shoulders",
   workout1='Pull Ups',
   workout1Score=100,
   workout2='Rows',
   workout2Score=100,
   workout3='Shoulder Press',
   workout3Score=95,
   workout4='Lateral Pulldown',
   workout4Score=75,
   workout5='Lateral Raises',
   workout5Score=35,
    date='01/03/2021',
    client_id=1,
    trainer_id=1)

    demo3 = History(name="Chest and Arms",
   workout1='Bench Press',
   workout1Score=100,
   workout2='Bicep Curls',
   workout2Score=100,
   workout3='Incline Bench',
   workout3Score=95,
   workout4='Tricep Dips',
   workout4Score=75,
   workout5='Decline Bench',
   workout5Score=35,
    date='01/04/2021',
    client_id=1,
    trainer_id=1)

    demo4 = History(name="Leg Day",
   workout1='Squats',
   workout1Score=100,
   workout2='Calf Raises',
   workout2Score=100,
   workout3='Lunges',
   workout3Score=95,
   workout4='Leg Curl',
   workout4Score=75,
   workout5='Crunches',
   workout5Score=35,
    date='01/05/2021',
    client_id=1,
    trainer_id=1)


    demo5 = History(name="Back and Shoulders",
   workout1='Pull Ups',
   workout1Score=100,
   workout2='Rows',
   workout2Score=100,
   workout3='Shoulder Press',
   workout3Score=95,
   workout4='Lateral Pulldown',
   workout4Score=75,
   workout5='Lateral Raises',
   workout5Score=35,
    date='01/06/2021',
    client_id=1,
    trainer_id=1)

    demo6 = History(name="Chest and Arms",
   workout1='Bench Press',
   workout1Score=100,
   workout2='Bicep Curls',
   workout2Score=100,
   workout3='Incline Bench',
   workout3Score=95,
   workout4='Tricep Dips',
   workout4Score=75,
   workout5='Decline Bench',
   workout5Score=35,
    date='01/07/2021',
    client_id=1,
    trainer_id=1)

    demo7 = History(name="Leg Day",
   workout1='Squats',
   workout1Score=100,
   workout2='Calf Raises',
   workout2Score=100,
   workout3='Lunges',
   workout3Score=95,
   workout4='Leg Curl',
   workout4Score=75,
   workout5='Crunches',
   workout5Score=35,
    date='01/08/2021',
    client_id=1,
    trainer_id=1)


    demo8 = History(name="Back and Shoulders",
   workout1='Pull Ups',
   workout1Score=100,
   workout2='Rows',
   workout2Score=100,
   workout3='Shoulder Press',
   workout3Score=95,
   workout4='Lateral Pulldown',
   workout4Score=75,
   workout5='Lateral Raises',
   workout5Score=35,
    date='01/09/2021',
    client_id=1,
    trainer_id=1)

    demo9 = History(name="Chest and Arms",
   workout1='Bench Press',
   workout1Score=100,
   workout2='Bicep Curls',
   workout2Score=100,
   workout3='Incline Bench',
   workout3Score=95,
   workout4='Tricep Dips',
   workout4Score=75,
   workout5='Decline Bench',
   workout5Score=35,
    date='01/10/2021',
    client_id=1,
    trainer_id=1)

    demo10 = History(name="Leg Day",
   workout1='Squats',
   workout1Score=100,
   workout2='Calf Raises',
   workout2Score=100,
   workout3='Lunges',
   workout3Score=95,
   workout4='Leg Curl',
   workout4Score=75,
   workout5='Crunches',
   workout5Score=35,
    date='01/11/2021',
    client_id=1,
    trainer_id=1)


    demo11 = History(name="Back and Shoulders",
   workout1='Pull Ups',
   workout1Score=100,
   workout2='Rows',
   workout2Score=100,
   workout3='Shoulder Press',
   workout3Score=95,
   workout4='Lateral Pulldown',
   workout4Score=75,
   workout5='Lateral Raises',
   workout5Score=35,
    date='01/12/2021',
    client_id=1,
    trainer_id=1)

    demo12 = History(name="Chest and Arms",
   workout1='Bench Press',
   workout1Score=100,
   workout2='Bicep Curls',
   workout2Score=100,
   workout3='Incline Bench',
   workout3Score=95,
   workout4='Tricep Dips',
   workout4Score=75,
   workout5='Decline Bench',
   workout5Score=35,
    date='01/13/2021',
    client_id=1,
    trainer_id=1)

    demo13 = History(name="Leg Day",
   workout1='Squats',
   workout1Score=100,
   workout2='Calf Raises',
   workout2Score=100,
   workout3='Lunges',
   workout3Score=95,
   workout4='Leg Curl',
   workout4Score=75,
   workout5='Crunches',
   workout5Score=35,
    date='01/14/2021',
    client_id=1,
    trainer_id=1)


    demo14 = History(name="Back and Shoulders",
   workout1='Pull Ups',
   workout1Score=100,
   workout2='Rows',
   workout2Score=100,
   workout3='Shoulder Press',
   workout3Score=95,
   workout4='Lateral Pulldown',
   workout4Score=75,
   workout5='Lateral Raises',
   workout5Score=35,
    date='01/15/2021',
    client_id=1,
    trainer_id=1)

    demo15 = History(name="Upper Body",
   workout1='Push Ups',
   workout1Score=100,
   workout2='Bicep Curls',
   workout2Score=100,
   workout3='Pull Ups',
   workout3Score=95,
   workout4='Tricep Dips',
   workout4Score=75,
   workout5='Crunches',
   workout5Score=35,
    date='01/01/2021',
    client_id=2,
    trainer_id=1)

    demo16 = History(name="Lower Body",
   workout1='Squats',
   workout1Score=100,
   workout2='Calf Raises',
   workout2Score=100,
   workout3='Lunges',
   workout3Score=95,
   workout4='Leg Curl',
   workout4Score=75,
   workout5='Crunches',
   workout5Score=35,
    date='01/02/2021',
    client_id=2,
    trainer_id=1)

    demo17 = History(name="Upper Body",
   workout1='Push Ups',
   workout1Score=100,
   workout2='Bicep Curls',
   workout2Score=100,
   workout3='Pull Ups',
   workout3Score=95,
   workout4='Tricep Dips',
   workout4Score=75,
   workout5='Crunches',
   workout5Score=35,
    date='01/03/2021',
    client_id=2,
    trainer_id=1)

    demo18 = History(name="Lower Body",
   workout1='Squats',
   workout1Score=100,
   workout2='Calf Raises',
   workout2Score=100,
   workout3='Lunges',
   workout3Score=95,
   workout4='Leg Curl',
   workout4Score=75,
   workout5='Crunches',
   workout5Score=35,
    date='01/04/2021',
    client_id=2,
    trainer_id=1)

    demo19 = History(name="Upper Body",
   workout1='Push Ups',
   workout1Score=100,
   workout2='Bicep Curls',
   workout2Score=100,
   workout3='Pull Ups',
   workout3Score=95,
   workout4='Tricep Dips',
   workout4Score=75,
   workout5='Crunches',
   workout5Score=35,
    date='01/05/2021',
    client_id=2,
    trainer_id=1)

    demo20 = History(name="Lower Body",
   workout1='Squats',
   workout1Score=100,
   workout2='Calf Raises',
   workout2Score=100,
   workout3='Lunges',
   workout3Score=95,
   workout4='Leg Curl',
   workout4Score=75,
   workout5='Crunches',
   workout5Score=35,
    date='01/06/2021',
    client_id=2,
    trainer_id=1)

    demo21 = History(name="Upper Body",
   workout1='Push Ups',
   workout1Score=100,
   workout2='Bicep Curls',
   workout2Score=100,
   workout3='Pull Ups',
   workout3Score=95,
   workout4='Tricep Dips',
   workout4Score=75,
   workout5='Crunches',
   workout5Score=35,
    date='01/07/2021',
    client_id=2,
    trainer_id=1)

    demo22 = History(name="Lower Body",
   workout1='Squats',
   workout1Score=100,
   workout2='Calf Raises',
   workout2Score=100,
   workout3='Lunges',
   workout3Score=95,
   workout4='Leg Curl',
   workout4Score=75,
   workout5='Crunches',
   workout5Score=35,
    date='01/08/2021',
    client_id=2,
    trainer_id=1)

    demo23 = History(name="Bodyweight Routine",
   workout1='Crunches',
   workout1Score=100,
   workout2='Bicycle Kicks',
   workout2Score=100,
   workout3='Pull Ups',
   workout3Score=95,
   workout4='Tricep Dips',
   workout4Score=40,
   workout5='Push Ups',
   workout5Score=60,
    date='03/01/2021',
    client_id=3,
    trainer_id=1)

    demo24 = History(name="Lower Body",
   workout1='Lunges',
   workout1Score=100,
   workout2='Calf Raises',
   workout2Score=100,
   workout3='Squats',
   workout3Score=95,
   workout4='Leg Curl',
   workout4Score=75,
   workout5='Squats',
   workout5Score=35,
    date='03/02/2021',
    client_id=3,
    trainer_id=1)

    demo25 = History(name="Bodyweight Routine",
   workout1='Crunches',
   workout1Score=100,
   workout2='Bicycle Kicks',
   workout2Score=100,
   workout3='Pull Ups',
   workout3Score=95,
   workout4='Tricep Dips',
   workout4Score=40,
   workout5='Push Ups',
   workout5Score=60,
    date='03/03/2021',
    client_id=3,
    trainer_id=1)

    demo26 = History(name="Lower Body",
   workout1='Lunges',
   workout1Score=100,
   workout2='Calf Raises',
   workout2Score=100,
   workout3='Squats',
   workout3Score=95,
   workout4='Leg Curl',
   workout4Score=75,
   workout5='Squats',
   workout5Score=35,
    date='03/04/2021',
    client_id=3,
    trainer_id=1)

    demo27 = History(name="Bodyweight Routine",
   workout1='Crunches',
   workout1Score=100,
   workout2='Bicycle Kicks',
   workout2Score=100,
   workout3='Pull Ups',
   workout3Score=95,
   workout4='Tricep Dips',
   workout4Score=40,
   workout5='Push Ups',
   workout5Score=60,
    date='03/05/2021',
    client_id=3,
    trainer_id=1)

    demo28 = History(name="Lower Body",
   workout1='Lunges',
   workout1Score=100,
   workout2='Calf Raises',
   workout2Score=100,
   workout3='Squats',
   workout3Score=95,
   workout4='Leg Curl',
   workout4Score=75,
   workout5='Squats',
   workout5Score=35,
    date='03/06/2021',
    client_id=3,
    trainer_id=1)


    db.session.add_all([demo,
                        demo1,
                        demo3,
                        demo4,
                        demo5,
                        demo6,
                        demo7,
                        demo8,
                        demo9,
                        demo10,
                        demo11,
                        demo12,
                        demo13,
                        demo14,
                        demo15,
                        demo16,
                        demo17,
                        demo18,
                        demo19,
                        demo20,
                        demo21,
                        demo22,
                        demo23,
                        demo24,
                        demo25,
                        demo26,
                        demo27,
                        demo28,
                        ])

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

    demo11 = Workout(name='Calf Raises',
                type='push',
                trainer_id=1,)

    demo12 = Workout(name='Lunges',
                type='push',
                trainer_id=1,)

    demo13 = Workout(name='Leg Curl',
                type='pull',
                trainer_id=1,)

    demo14 = Workout(name='Bench Press',
                type='push',
                trainer_id=1,)

    demo15 = Workout(name='Incline Bench',
                type='push',
                trainer_id=1,)

    demo16 = Workout(name='Decline Bench',
                type='push',
                trainer_id=1,)

    demo17 = Workout(name='Lateral Pulldown',
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
    db.session.add(demo11)
    db.session.add(demo12)
    db.session.add(demo13)

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
                client_id=1,
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
