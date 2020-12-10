from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class WorkoutPlan(db.Model, UserMixin):
  __tablename__ = 'workoutplans'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(255), nullable=False)
  description = db.Column(db.Text)
  rating = db.Column(db.Integer)
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

  def return_exerciselist(self):
    return {
      "exerciselist": [elist.to_dict() for elist in self.exerciselist]
    }


  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "description": self.description,
      "rating": self.rating,
      "time": self.time,
      "date": self.date,
    }

      # "reviews": [review.to_dict() for review in self.reviews]
