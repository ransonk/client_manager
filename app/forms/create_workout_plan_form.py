from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Optional
from app.models import Trainer, Client
# from app.models import User



class CreateWorkoutPlanForm(FlaskForm):
    name = StringField('first name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    rating = StringField('rating', validators=[Optional()])
    time = StringField('time', validators=[DataRequired()])
    date = StringField('date', validators=[DataRequired()])
    client_id = IntegerField('client_id')
