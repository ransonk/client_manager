from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class RoutineList(db.Model, UserMixin):
  __tablename__ = "routinelists"

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(20))
  workoutplan_id = db.Column(db.Integer, db.ForeignKey("workoutplans.id"))
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        server_onupdate=db.func.now()
    )

  routines = db.relationship(
    'Routine',
    backref='owner'
  )

  workoutplan = db.relationship(
    "WorkoutPlan",
    back_populates="routinelist"
  )

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "routines": [routine.to_dict() for routine in self.routines]
    }
