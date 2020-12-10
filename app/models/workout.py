from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Workout(db.Model, UserMixin):
  __tablename__ = 'workouts'

  id = db.Column(db.Integer, primary_key = True)
  name= db.Column(db.String(255), nullable=False, unique = True)
  type = db.Column(db.String(40))
  trainer_id = db.Column(db.Integer, db.ForeignKey("trainers.id"))
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        server_onupdate=db.func.now()
    )

  trainer = db.relationship(
    "Trainer",
    back_populates="workouts"
  )

  routine = db.relationship(
    "Routine",
    back_populates="workout"
  )

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "type": self.type,
      "trainer_id": self.trainer_id
    }
