import os
from flask import Flask, render_template, request, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
# from flask_login_multi.login_manager import LoginManager
# from app.libs.flask_login_multi import login_user

from .models import db, Trainer, Client
# from .models import db, User
# user_routes
# from .api.trainer_routes import trainer_routes
from .api.user_routes import trainer_routes, client_routes
from .api.auth_routes import auth_routes
# from flask_cors import CORS

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)

# Setup login manager
login_manager = LoginManager(app)
login_manager.login_view = 'auth.unauthorized'

login_manager.blueprint_login_views = {
    'trainer': 'trainer.trainer_login',
    'client': 'client.client_login',
}


# @login.trainer_loader
# def load_trainer(id):
@login_manager.user_loader
def load_user(id, endpoint='trainer'):
    if endpoint == 'client':
        return Client.query.get(id)
    else:
        return Trainer.query.get(id)


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
# app.register_blueprint(trainer_routes, url_prefix='/api/trainers')
app.register_blueprint(trainer_routes, url_prefix='/api/trainers')
app.register_blueprint(client_routes, url_prefix='/api/clients')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
