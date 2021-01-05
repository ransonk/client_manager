from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Optional
from app.models import Trainer, Client
# from app.models import User



class CreateWorkoutHistoryForm(FlaskForm):
    name = StringField('first name', validators=[DataRequired()])
    pushCount = StringField('pushCount')
    pullCount = StringField('pullCount')
    pushScore = StringField('pushScore')
    pullScore = StringField('pullScore')
    date = StringField('date')
    client_id = StringField('client_id')
    trainer_id = StringField('client_id')
