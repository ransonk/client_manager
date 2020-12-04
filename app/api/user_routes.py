from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Trainer, Client
# from app.models import User

# trainer_routes = Blueprint('trainers', __name__)
# user_routes = Blueprint('users', __name__)
trainer_routes = Blueprint('trainers', __name__, url_prefix="/trainer")
client_routes = Blueprint('clients', __name__, url_prefix="/client")


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


# @trainer_routes.route('/<int:id>')
@trainer_routes.route('/<int:id>')
@login_required
def trainer(id):
    trainer = Trainer.query.get(id)
    return trainer.to_dict()

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
