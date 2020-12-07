from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Optional
from app.models import Trainer, Client
# from app.models import User



class CreateWorkoutForm(FlaskForm):
    name = StringField('first name', validators=[DataRequired()])
    description = StringField('last name', validators=[DataRequired()])
