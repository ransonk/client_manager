from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import SignUpForm, CreateClientForm
from app.models import Trainer, Client, db
# from app.models import User

# trainer_routes = Blueprint('trainers', __name__)
# user_routes = Blueprint('users', __name__)
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


# @trainer_routes.route('/')
@trainer_routes.route('/')
@login_required
def users():
# def trainers():
    trainers = Trainer.query.all()
    # clients = Client.query.all()
    # return {"trainers": [trainer.to_dict() for trainer in trainers],
    #         "clients": [client.to_dict() for client in clients]}
    return {"trainers": [trainer.to_dict() for trainer in trainers]}



# @trainer_routes.route('/<int:id>')
@trainer_routes.route('/<int:id>')
@login_required
def trainer(id):
    trainer = Trainer.query.get(id)
    return trainer.to_dict()

# Grab clients for particular trainer
@trainer_routes.route('/<int:id>/clients')
# @login_required
def clients(id):
    trainer = Trainer.query.get(id)
    clients = trainer.to_dict()
    print(clients['clients'])

    return {"clients": clients['clients']}

@trainer_routes.route('/<int:id>/create-client', methods=["POST"])
# @login_required
def create_client(id):
    print('route startedsdafdsafdsafdsafdasfds')
    """
    Creates a new client account
    """
    form = CreateClientForm()
    print(form.data['phone'])
    print(form.data['weight'])
    print(form.data['age'])
    print(form.data['duedate'])
    print(form.data['amount'])
    print(form.data['paid'])
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
            password=form.data['password'],
            trainer_id=id
        )
        db.session.add(client)
        db.session.commit()
        # login_user(client)
        return client.to_dict()

    print('outsideee')
        # user = User(
        #     username=form.data['username'],
        #     email=form.data['email'],
        #     password=form.data['password']
        # )
        # db.session.add(user)
        # db.session.commit()
        # login_user(user)
        # return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}





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

@client_routes.route('/<int:id>')
@login_required
def client(id):
    client = Client.query.get(id)
    return client.to_dict()

# @user_routes.route('/<int:id>')
# @login_required
# def user(id):
#     user = User.query.get(id)
#     return user.to_dict()
