from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Optional
from app.models import Trainer, Client
# from app.models import User



class CreateWorkoutPlanForm(FlaskForm):
    name = StringField('first name', validators=[DataRequired()])
    workout1 = StringField('workout1')
    set1 = StringField('set1')
    weight1 = StringField('weight1')
    workout2 = StringField('workout2')
    set2 = StringField('set2')
    weight2 = StringField('weight2')
    workout3 = StringField('workout3')
    set3 = StringField('set3')
    weight3 = StringField('weight3')
    workout4 = StringField('workout4')
    set4 = StringField('set4')
    weight4 = StringField('weight4')
    workout5 = StringField('workout5')
    set5 = StringField('set5')
    weight5 = StringField('weight5')
    workout6 = StringField('workout6')
    set6 = StringField('set6')
    weight6 = StringField('weight6')
    workout7 = StringField('workout7')
    set7 = StringField('set7')
    weight7 = StringField('weight7')
    workout8 = StringField('workout8')
    set8 = StringField('set8')
    weight8 = StringField('weight8')
    time = StringField('time', validators=[DataRequired()])
    date = StringField('date', validators=[DataRequired()])
    clientFirstName = StringField('clientFirstName', validators=[DataRequired()])
    clientLastName = StringField('clientLastName', validators=[DataRequired()])
    client_id = IntegerField('client_id')
    trainer_id = IntegerField('trainer_id')
