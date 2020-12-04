from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Trainer, Client
# from app.models import User


def client_exists(form, field):
    print("Checking if client exists", field.data)
    email = field.data
    client = Client.query.filter(Client.email == email).first()
    if client:
        raise ValidationError("User is already registered.")


class CreateClientForm(FlaskForm):
    firstName = StringField('first name', validators=[DataRequired()])
    lastName = StringField('last name', validators=[DataRequired()])
    email = StringField('email', validators=[client_exists])
    phone = StringField('phone')
    weight = IntegerField('weight')
    age = IntegerField('age')
    duedate = StringField('duedate')
    amount = IntegerField('amount')
    paid = BooleanField("paid")
    password = StringField('password', validators=[DataRequired()])

# def user_exists(form, field):
#     print("Checking if user exits", field.data)
#     email = field.data
#     user = User.query.filter(User.email == email).first()
#     if user:
#         raise ValidationError("User is already registered.")


# class SignUpForm(FlaskForm):
#     username = StringField('username', validators=[DataRequired()])
#     email = StringField('email', validators=[DataRequired(), user_exists])
#     password = StringField('password', validators=[DataRequired()])
