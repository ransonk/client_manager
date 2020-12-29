from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

from app.forms import SignUpForm, CreateClientForm, CreateWorkoutForm, CreateIntensityForm, CreateWorkoutPlanForm, CreateWorkoutHistoryForm
from app.models import Trainer, Client, History, Workout, WorkoutIntensity, WorkoutPlan, db
from werkzeug.security import generate_password_hash

trainer_routes = Blueprint('trainers', __name__)
client_routes = Blueprint('clients', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@trainer_routes.route('/')
@login_required
def users():

    trainers = Trainer.query.all()
    return {"trainers": [trainer.to_dict() for trainer in trainers]}


@trainer_routes.route('/<int:id>')
@login_required
def trainer(id):
    trainer = Trainer.query.get(id)
    return trainer.to_dict()

# Grab clients safely for particular trainer (no phones/emails)
@trainer_routes.route('/<int:id>/s-clients')
#this one ->>>>>>>>>>>
# @login_required
def safe_clients(id):
    trainer = Trainer.query.get(id)
    clients = trainer.return_clients()
    clientObj = clients['clients']
    for i in clientObj:
        for k,v in i.items():
            if k == "email" or k == "phone" or k == "amount" or k == "duedate" or k == "weight" or k == "age":
                i[k] = 'Null'
    return {"clients": clientObj}


@trainer_routes.route('/client/<int:id>')
@login_required
def client(id):
    print('loook heree')
    client = Client.query.get(id)
    return client.to_dict()



@trainer_routes.route("/client/<int:id>/update", methods=["GET", "PUT"])
#this one ->>>>>>>>>>>
# @login_required
def updateClient(id):
    client = Client.query.get(id)
    req_data = request.get_json()
    # return f"{req_data}"
    client.firstName = req_data['firstName']
    client.lastName = req_data['lastName']
    client.email = req_data['email']
    client.phone = req_data['phone']
    client.weight = req_data['weight']
    client.age = req_data['age']
    client.duedate = req_data['duedate']
    client.amount = req_data['amount']
    client.paid = req_data['paid']
    client.noshows = req_data['noshows']
    client.cancellations = req_data['cancellations']
    client.hashed_password = generate_password_hash(req_data['password'])
    db.session.add(client)
    db.session.commit()
    return client.to_dict()



@trainer_routes.route("/<int:id>/todays-clients", methods=["GET"])
#this one ->>>>>>>>>>>
# @login_required
def today_workout_plans(id):
    trainer = Trainer.query.get(id)
    today_plans = trainer.return_workoutplans()
    plansObj = today_plans['workoutplans']
    # plansObj = workoutplans['workoutplans']
    return {"workoutplans": plansObj}


# grab trainer specific workouts by id
@trainer_routes.route('/<int:id>/workouts')
#this one ->>>>>>>>>>>
# @login_required
def workouts(id):
    trainer = Trainer.query.get(id)
    workouts = trainer.return_workouts()
    workoutsObj = workouts['workouts']
    print('loook at thisssssssssssss', workoutsObj)
    return {"workouts": workoutsObj}


@trainer_routes.route('/<int:id>/intensities')
#this one ->>>>>>>>>>>
# @login_required
def intensities(id):
    trainer = Trainer.query.get(id)
    intensities = trainer.return_workoutintensities()
    intensitiesObj = intensities['workoutintensity']
    print('loook at thisssssssssssss', intensitiesObj)
    return {"intensities": intensitiesObj}


# Grab client specific workouts
@trainer_routes.route('/client/<int:id>/workout-plans')
#this one ->>>>>>>>>>>
# @login_required
def workout_plans(id):
    client = Client.query.get(id)
    workoutplans = client.return_workoutplans()
    plansObj = workoutplans['workoutplans']
    # for i in clientObj:
    #     for k,v in i.items():
    #         if k == "email" or k == "phone" or k == "amount" or k == "duedate" or k == "weight" or k == "age":
    #             i[k] = 'Null'
    return {"workoutplans": plansObj}


@trainer_routes.route('/client/<int:id>/workout-history')
# @login_required
def workout_history(id):
    client = Client.query.get(id)
    workouthistory = client.return_workouthistory()
    #  = History.query.filter(History.client_id == id).all()
    # print(workouthistory)
    plansObj = workouthistory['history']

    return {"workouthistory": plansObj}


@trainer_routes.route('/workout-plans/<int:id>/routinelist')
# @login_required
def routine_lists(id):
    workoutplan = WorkoutPlan.query.get(id)
    routinelists = workoutplan.return_routinelist()
    listsObj = routinelists['routinelist']
    return {"routinelists": listsObj}



@trainer_routes.route('/<int:id>/create-client', methods=["POST"])
#this one ->>>>>>>>>>>
# @login_required
def create_client(id):
    print('route startedsdafdsafdsafdsafdasfds')
    """
    Creates a new client account
    """
    form = CreateClientForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print('hereeeeeeeeee')
        client = Client(
            firstName=form.data['firstName'],
            lastName=form.data['lastName'],
            email=form.data['email'],
            phone=form.data['phone'],
            weight=form.data['weight'],
            age=form.data['age'],
            duedate=form.data['duedate'],
            amount=form.data['amount'],
            paid=form.data['paid'],
            noshows=form.data['noshows'],
            cancellations=form.data['cancellations'],
            password=form.data['password'],
            trainer_id=id
        )
        db.session.add(client)
        db.session.commit()
        return client.to_dict()

    print('outsideee')
    return {'errors': validation_errors_to_error_messages(form.errors)}

@trainer_routes.route('/client/<int:id>/create-workout-plan', methods=["POST"])
#this one ->>>>>>>>>>>
# @login_required
def create_workout_plan(id):
    print('route startedsdafdsafdsafdsafdasfds')
    """
    Creates a new client account
    """
    form = CreateWorkoutPlanForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print('hereeeeeeeeee')
            # req_data = request.get_json()
        workoutplan = WorkoutPlan(
            name=form.data['name'],
            workout1=form.data['workout1'],
            set1=form.data['set1'],
            weight1=form.data['weight1'],
            workout2=form.data['workout2'],
            set2=form.data['set2'],
            weight2=form.data['weight2'],
            workout3=form.data['workout3'],
            set3=form.data['set3'],
            weight3=form.data['weight3'],
            workout4=form.data['workout4'],
            set4=form.data['set4'],
            weight4=form.data['weight4'],
            workout5=form.data['workout5'],
            set5=form.data['set5'],
            weight5=form.data['weight5'],
            workout6=form.data['workout6'],
            set6=form.data['set6'],
            weight6=form.data['weight6'],
            workout7=form.data['workout7'],
            set7=form.data['set7'],
            weight7=form.data['weight7'],
            workout8=form.data['workout8'],
            set8=form.data['set8'],
            weight8=form.data['weight8'],
            time=form.data['time'],
            date=form.data['date'],
            clientFirstName=form.data['clientFirstName'],
            clientLastName=form.data['clientLastName'],
            client_id=id,
            trainer_id=form.data['trainer_id']
        )
        db.session.add(workoutplan)
        db.session.commit()
        return workoutplan.to_dict()

    print('outsideee')
    return {'errors': validation_errors_to_error_messages(form.errors)}


@trainer_routes.route('/client/<int:id>/create-workout-history', methods=["POST"])
#this one ->>>>>>>>>>>
# @login_required
def create_workout_history(id):
    """
    Creates a new client account
    """
    form = CreateWorkoutHistoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print('hereeeeeeeeee')
            # req_data = request.get_json()
        workouthistory = History(
            name=form.data['name'],
            pushCount=form.data['pushCount'],
            pullCount=form.data['pullCount'],
            pushScore=form.data['pushScore'],
            pullScore=form.data['pullScore'],
            date=form.data['date'],
            client_id=id,
        )
        db.session.add(workouthistory)
        db.session.commit()
        return workouthistory.to_dict()

    print('outsideee')
    return {'errors': validation_errors_to_error_messages(form.errors)}


@trainer_routes.route('/<int:id>/create-workout', methods=["POST"])
#this one ->>>>>>>>>>>
# @login_required
def create_workout(id):
    """
    Creates a new workout
    """
    form = CreateWorkoutForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        workout = Workout(
            name=form.data['name'],
            type=form.data['type'],
            trainer_id=id
        )
        db.session.add(workout)
        db.session.commit()
        return workout.to_dict()

    print('outsideee')
    return {'errors': validation_errors_to_error_messages(form.errors)}


@trainer_routes.route('/delete-workout/<int:id>', methods=["GET", "DELETE"])
#this one ->>>>>>>>>>>
# @login_required
def delete_workout(id):
    """
    Deletes selected Workout Intensity
    """
    # intensity = WorkoutIntensity.query.filter(WorkoutIntensity.id == id).delete()
    workout = Workout.query.get(id)
    db.session.delete(workout)
    db.session.commit()
    return {'message':'delete successful'}


@trainer_routes.route('/delete-workoutPlan/<int:id>', methods=["GET", "DELETE"])
#this one ->>>>>>>>>>>
# @login_required
def delete_workoutPlan(id):
    """
    Deletes selected Workout Intensity
    """
    # intensity = WorkoutIntensity.query.filter(WorkoutIntensity.id == id).delete()
    workoutPlan = WorkoutPlan.query.get(id)
    db.session.delete(workoutPlan)
    db.session.commit()
    return {'message':'delete successful'}


@trainer_routes.route('/delete-client/<int:id>', methods=["GET", "DELETE"])
#this one ->>>>>>>>>>>
# @login_required
def delete_client(id):
    """
    Deletes selected Workout Intensity
    """
    # intensity = WorkoutIntensity.query.filter(WorkoutIntensity.id == id).delete()
    db.session.query(WorkoutPlan).filter(WorkoutPlan.client_id == id).delete()
    db.session.commit()
    client = Client.query.get(id)
    db.session.delete(client)
    db.session.commit()
    return {'message':'delete successful'}


@trainer_routes.route('/<int:id>/create-intensity', methods=["POST"])
#this one ->>>>>>>>>>>
# @login_required
def create_intensity(id):
    """
    Creates a new workout
    """
    form = CreateIntensityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        intensity = WorkoutIntensity(
            reps=form.data['reps'],
            sets=form.data['sets'],
            trainer_id=id
        )
        db.session.add(intensity)
        db.session.commit()
        return intensity.to_dict()

    print('outsideee')
    return {'errors': validation_errors_to_error_messages(form.errors)}


@trainer_routes.route('/delete-intensity/<int:id>', methods=["GET", "DELETE"])
#this one ->>>>>>>>>>>
# @login_required
def delete_intensity(id):
    """
    Deletes selected Workout Intensity
    """
    # intensity = WorkoutIntensity.query.filter(WorkoutIntensity.id == id).delete()
    intensity = WorkoutIntensity.query.get(id)
    db.session.delete(intensity)
    db.session.commit()
    return {'message':'delete successful'}



@client_routes.route('/')
@login_required
def users():
# def trainers():
    # trainers = Trainer.query.all()
    clients = Client.query.all()
    # return {"trainers": [trainer.to_dict() for trainer in trainers],
    #         "clients": [client.to_dict() for client in clients]}
    return {"clients": [client.to_dict() for client in clients]}

# def users():
    # users = User.query.all()
#     return {"users": [user.to_dict() for user in users]}

# @client_routes.route('/<int:id>')
# @login_required
# def client(id):
#     client = Client.query.get(id)
#     return client.to_dict()

# @user_routes.route('/<int:id>')
# @login_required
# def user(id):
#     user = User.query.get(id)
#     return user.to_dict()
