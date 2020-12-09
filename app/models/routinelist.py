from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class RoutineList(db.Model, UserMixin):
  __tablename__ = 'exerciselists'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(20))
  routines = db.relationship('Routine', backref='owner')
  workoutplan_id = db.Column(db.Integer, db.ForeignKey("workoutplans.id"))
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        server_onupdate=db.func.now()
    )

  # client = db.relationship(
  #   "Client",
  #   back_populates="workoutplans"
  # )

  workoutplan = db.relationship(
    "WorkoutPlan",
    back_populates="routinelist"
  )

  # workout = db.relationship(
  #   "Workout",
  #   back_populates="workoutplan"
  # )

  # workoutintensity = db.relationship(
  #   "WorkoutIntensity",
  #   back_populates="workoutplan"
  # )

  # reviews = db.relationship(
  #   "Review",
  #   back_populates="workoutplan"
  # )


  # def to_dict(self):
  #   return {
  #     "id": self.id,
  #     "name": self.name,
  #     "description": self.description,
  #     "rating": self.rating,
  #     "time": self.time,
  #     "date": self.date,
  #     "pull": self.pull,
  #     "push": self.push,
  #   }

      # "reviews": [review.to_dict() for review in self.reviews]
