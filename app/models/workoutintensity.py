from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class WorkoutIntensity(db.Model, UserMixin):
  __tablename__ = 'workoutintensities'

  id = db.Column(db.Integer, primary_key = True)
  description = db.Column(db.Text)
  sets = db.Column(db.Integer, nullable=False)
  reps = db.Column(db.Integer, nullable=False)
  trainer_id = db.Column(db.Integer, db.ForeignKey("trainers.id"))
  workoutplan_id = db.Column(db.Integer, db.ForeignKey("workoutplans.id"))
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        server_onupdate=db.func.now()
    )

  trainer = db.relationship(
    "Trainer",
    back_populates="workoutintensity"
  )

  workoutplan = db.relationship(
    "WorkoutPlan",
    back_populates="workoutintensity"
  )


  def to_dict(self):
    return {
      "id": self.id,
      "description": self.description,
      "sets": self.sets,
      "reps": self.reps
    }
