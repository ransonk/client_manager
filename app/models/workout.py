from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Workout(db.Model, UserMixin):
  __tablename__ = 'workouts'

  id = db.Column(db.Integer, primary_key = True)
  name= db.Column(db.String(255), nullable=False, unique = True)
  description = db.Column(db.Text)
  workoutintensity_id = db.Column(db.Integer, db.ForeignKey("workoutintensities.id"))
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        server_onupdate=db.func.now()
    )

  workoutintensity = db.relationship(
    "WorkoutIntensity",
    back_populates="workout"
  )

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "description": self.description
    }