from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Trainer, Client
# from app.models import User


def trainer_exists(form, field):
    print("Checking if trainer exits", field.data)
    email = field.data
    trainer = Trainer.query.filter(Trainer.email == email).first()
    if trainer:
        raise ValidationError("User is already registered.")


class SignUpForm(FlaskForm):
    firstName = StringField('first name', validators=[DataRequired()])
    lastName = StringField('last name', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), trainer_exists])
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
