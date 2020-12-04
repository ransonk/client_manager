from flask import Blueprint, jsonify, session, request
from app.models import Trainer, Client, db
# from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm, CreateClientForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    print('here')
    if form.validate_on_submit():

        #if trainer exists with that email
        #else login with client
        # Add the trainer to the session, we are logged in!
        # user = User.query.filter(User.email == form.data['email']).first()
        # Add the client to the session, we are logged in!
        # else client
        # # user = User.query.filter(User.email == form.data['email']).first()
        # #>>>>>>>>>>> do we need client.to_dict()?
        user = Trainer.query.filter(Trainer.email == form.data['email']).first() or Client.query.filter(Client.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        trainer = Trainer(
            firstName=form.data['firstName'],
            lastName=form.data['lastName'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(trainer)
        db.session.commit()
        login_user(trainer)
        return trainer.to_dict()

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

@auth_routes.route('/create-client', methods=['POST'])
def create_client():
    """
    Creates a new client account
    """
    form = CreateClientForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print(form.data)
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
            trainer_id=form.data['trainer_id']
        )
        db.session.add(client)
        db.session.commit()
        # login_user(client)
        return client.to_dict()

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


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
