from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Optional
from app.models import Trainer, Client
# from app.models import User



class CreateWorkoutHistoryForm(FlaskForm):
    name = StringField('first name', validators=[DataRequired()])
    workout1 = StringField('workout1')
    workout1Score = IntegerField('workout1Score')
    workout2 = StringField('workout2')
    workout2Score = IntegerField('workout2Score')
    workout3 = StringField('workout3')
    workout3Score = IntegerField('workout3Score')
    workout4 = StringField('workout4')
    workout4Score = IntegerField('workout4Score')
    workout5 = StringField('workout5')
    workout5Score = IntegerField('workout5Score')
    workout6 = StringField('workout6')
    workout6Score = IntegerField('workout6Score')
    workout7 = StringField('workout7')
    workout7Score = IntegerField('workout7Score')
    workout8 = StringField('workout8')
    workout8Score = IntegerField('workout8Score')
    date = StringField('date')
    client_id = StringField('client_id')
    trainer_id = StringField('client_id')
