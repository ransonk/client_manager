from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class WorkoutPlan(db.Model, UserMixin):
  __tablename__ = 'workoutplans'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(255), nullable=False)
  workout1 = db.Column(db.String(500))
  set1 = db.Column(db.String(500))
  weight1 = db.Column(db.String(500))
  workout2 = db.Column(db.String(500))
  set2 = db.Column(db.String(500))
  weight2 = db.Column(db.String(500))
  workout3 = db.Column(db.String(500))
  set3 = db.Column(db.String(500))
  weight3 = db.Column(db.String(500))
  workout4 = db.Column(db.String(500))
  set4 = db.Column(db.String(500))
  weight4 = db.Column(db.String(500))
  workout5 = db.Column(db.String(500))
  set5 = db.Column(db.String(500))
  weight5 = db.Column(db.String(500))
  workout6 = db.Column(db.String(500))
  set6 = db.Column(db.String(500))
  weight6 = db.Column(db.String(500))
  workout7 = db.Column(db.String(500))
  set7 = db.Column(db.String(500))
  weight7 = db.Column(db.String(500))
  workout8 = db.Column(db.String(500))
  set8 = db.Column(db.String(500))
  weight8 = db.Column(db.String(500))
  time = db.Column(db.String(255), nullable=False)
  date = db.Column(db.String(255), nullable=False)
  clientFirstName = db.Column(db.String(255), nullable=False)
  clientLastName = db.Column(db.String(255), nullable=False)
  client_id = db.Column(db.Integer, db.ForeignKey("clients.id"))
  trainer_id = db.Column(db.Integer, db.ForeignKey("trainers.id"))
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

  trainer = db.relationship(
    "Trainer",
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
      "weight1": self.weight1,
      "workout2": self.workout2,
      "set2": self.set2,
      "weight2": self.weight2,
      "workout3": self.workout3,
      "set3": self.set3,
      "weight3": self.weight3,
      "workout4": self.workout4,
      "set4": self.set4,
      "weight4": self.weight4,
      "workout5": self.workout5,
      "set5": self.set5,
      "weight5": self.weight5,
      "workout6": self.workout6,
      "set6": self.set6,
      "weight6": self.weight6,
      "workout7": self.workout7,
      "set7": self.set7,
      "weight7": self.weight7,
      "workout8": self.workout8,
      "set8": self.set8,
      "weight8": self.weight8,
      "time": self.time,
      "date": self.date,
      "clientFirstName": self.clientFirstName,
      "clientLastName": self.clientLastName,
      "client_id": self.client_id,
      "trainer_id": self.trainer_id

    }

      # "reviews": [review.to_dict() for review in self.reviews]
