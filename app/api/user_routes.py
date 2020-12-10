from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

from app.forms import SignUpForm, CreateClientForm, CreateWorkoutForm, CreateIntensityForm, CreateWorkoutPlanForm
from app.models import Trainer, Client, Workout, WorkoutIntensity, WorkoutPlan, db
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


# grab trainer specific workouts by id
@trainer_routes.route('/<int:id>/workouts')
# @login_required
def workouts(id):
    trainer = Trainer.query.get(id)
    workouts = trainer.return_workouts()
    workoutsObj = workouts['workouts']
    print('loook at thisssssssssssss', workoutsObj)
    return {"workouts": workoutsObj}


@trainer_routes.route('/<int:id>/intensities')
# @login_required
def intensities(id):
    trainer = Trainer.query.get(id)
    intensities = trainer.return_workoutintensities()
    intensitiesObj = intensities['workoutintensity']
    print('loook at thisssssssssssss', intensitiesObj)
    return {"intensities": intensitiesObj}


# Grab client specific workouts
@trainer_routes.route('/client/<int:id>/workout-plans')
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


# @trainer_routes.route('/client/<int:id>/create-workout-plan')
# # @login_required
# def create_workout_plan(id):
#     client = Client.query.get(id)
#     workoutplans = client.return_workoutplans()
#     plansObj = workoutplans['workoutplans']
#     # for i in clientObj:
#     #     for k,v in i.items():
#     #         if k == "email" or k == "phone" or k == "amount" or k == "duedate" or k == "weight" or k == "age":
#     #             i[k] = 'Null'
#     return {"workoutplans": plansObj}

@trainer_routes.route('/workout-plans/<int:id>/routinelist')
# @login_required
def routine_lists(id):
    workoutplan = WorkoutPlan.query.get(id)
    routinelists = workoutplan.return_routinelist()
    listsObj = routinelists['routinelist']
    # for i in clientObj:
    #     for k,v in i.items():
    #         if k == "email" or k == "phone" or k == "amount" or k == "duedate" or k == "weight" or k == "age":
    #             i[k] = 'Null'
    return {"routinelists": listsObj}


# @trainer_routes.route('/<int:id>/clients')
# # @login_required
# def clients(id):
#     trainer = Trainer.query.get(id)
#     clients = trainer.to_dict()
#     print(clients['clients'])

#     return {"clients": clients['clients']}



@trainer_routes.route('/<int:id>/create-client', methods=["POST"])
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
        workoutplan = WorkoutPlan(
            name=form.data['name'],
            description=form.data['description'],
            time=form.data['time'],
            date=form.data['date'],
            client_id=id
        )
        db.session.add(workoutplan)
        db.session.commit()
        return workoutplan.to_dict()

    print('outsideee')
    return {'errors': validation_errors_to_error_messages(form.errors)}


@trainer_routes.route('/<int:id>/create-workout', methods=["POST"])
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


@trainer_routes.route('/<int:id>/create-intensity', methods=["POST"])
# @login_required
def create_intensity(id):
    """
    Creates a new workout
    """
    form = CreateIntensityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        intensity = WorkoutIntensity(
            reps=form.data['sets'],
            sets=form.data['reps'],
            trainer_id=id
        )
        db.session.add(intensity)
        db.session.commit()
        return intensity.to_dict()

    print('outsideee')
    return {'errors': validation_errors_to_error_messages(form.errors)}


@trainer_routes.route('/delete-intensity/<int:id>', methods=["GET", "DELETE"])
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
