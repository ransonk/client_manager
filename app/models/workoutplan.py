from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class WorkoutPlan(db.Model, UserMixin):
  __tablename__ = 'workoutplans'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(255), nullable=False)
  workout1 = db.Column(db.String(500))
  set1 = db.Column(db.String(500))
  workout2 = db.Column(db.String(500))
  set2 = db.Column(db.String(500))
  workout3 = db.Column(db.String(500))
  set3 = db.Column(db.String(500))
  workout4 = db.Column(db.String(500))
  set4 = db.Column(db.String(500))
  workout5 = db.Column(db.String(500))
  set5 = db.Column(db.String(500))
  workout6 = db.Column(db.String(500))
  set6 = db.Column(db.String(500))
  workout7 = db.Column(db.String(500))
  set7 = db.Column(db.String(500))
  workout8 = db.Column(db.String(500))
  set8 = db.Column(db.String(500))
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
      "workout1": self.workout1,
      "set1": self.set1,
      "workout2": self.workout2,
      "set2": self.set2,
      "workout3": self.workout3,
      "set3": self.set3,
      "workout4": self.workout4,
      "set4": self.set4,
      "workout5": self.workout5,
      "set5": self.set5,
      "workout6": self.workout6,
      "set6": self.set6,
      "workout7": self.workout7,
      "set7": self.set7,
      "workout8": self.workout8,
      "set8": self.set8,
      "time": self.time,
      "date": self.date,
      "client_id": self.client_id

    }

      # "reviews": [review.to_dict() for review in self.reviews]
