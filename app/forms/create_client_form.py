from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Optional
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
    phone = StringField('phone', validators=[Optional()])
    weight = StringField('weight', validators=[Optional()])
    age = IntegerField('age', validators=[Optional()])
    duedate = StringField('duedate', validators=[Optional()])
    amount = StringField('amount', validators=[Optional()])
    paid = BooleanField('paid', validators=[Optional()])
    noshows = IntegerField('No Shows', validators=[Optional()])
    cancellations = IntegerField('Cancellations', validators=[Optional()])
    password = StringField('password', validators=[DataRequired()])
    trainer_id = IntegerField('trainer_id')
