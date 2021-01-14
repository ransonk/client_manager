from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Optional
from app.models import Trainer, Client
# from app.models import User



class CreateWorkoutHistoryForm(FlaskForm):
    name = StringField('first name', validators=[DataRequired()])
    workout1 = StringField('workout1')
    workout1Score = StringField('workout1Score')
    workout2 = StringField('workout2')
    workout2Score = StringField('workout2Score')
    workout3 = StringField('workout3')
    workout3Score = StringField('workout3Score')
    workout4 = StringField('workout4')
    workout4Score = StringField('workout4Score')
    workout5 = StringField('workout5')
    workout5Score = StringField('workout5Score')
    workout6 = StringField('workout6')
    workout6Score = StringField('workout6Score')
    workout7 = StringField('workout7')
    workout7Score = StringField('workout7Score')
    workout8 = StringField('workout8')
    workout8Score = StringField('workout8Score')
    date = StringField('date')
    client_id = StringField('client_id')
    trainer_id = StringField('client_id')
