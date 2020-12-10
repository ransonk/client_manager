from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class WorkoutPlan(db.Model, UserMixin):
  __tablename__ = 'workoutplans'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(255), nullable=False)
  description = db.Column(db.String(500))
  time = db.Column(db.String(255), nullable=False)
  date = db.Column(db.String(255), nullable=False)
  client_id = db.Column(db.Integer, db.ForeignKey("clients.id"))
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        server_onupdate=db.func.now()
    )

  client = db.relationship(
    "Client",
    back_populates="workoutplans"
  )

  routinelist = db.relationship(
    "RoutineList",
    back_populates="workoutplan"
  )

  # workout = db.relationship(
  #   "Workout",
  #   back_populates="workoutplan"
  # )

  # workoutintensity = db.relationship(
  #   "WorkoutIntensity",
  #   back_populates="workoutplan"
  # )

  reviews = db.relationship(
    "Review",
    back_populates="workoutplan"
  )

  # def return_routinelist(self):
  #   return {
  #   }


  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "description": self.description,
      "time": self.time,
      "date": self.date,
      "client_id": self.client_id

    }

      # "reviews": [review.to_dict() for review in self.reviews]
