from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Optional
from app.models import Trainer, Client
# from app.models import User



class CreateIntensityForm(FlaskForm):
    sets = IntegerField('sets', validators=[DataRequired()])
    reps = IntegerField('reps', validators=[DataRequired()])
    trainer_id = IntegerField('trainer_id')
