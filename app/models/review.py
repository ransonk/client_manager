from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Review(db.Model, UserMixin):
  __tablename__ = "reviews"

  id = db.Column(db.Integer, primary_key = True)
  description = db.Column(db.Text)
  client_id = db.Column(db.Integer, db.ForeignKey("clients.id"))
  workoutplan_id = db.Column(db.Integer, db.ForeignKey("workoutplans.id"))
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        server_onupdate=db.func.now()
    )

  client = db.relationship(
    "Client",
    back_populates="reviews"
  )
  workoutplan = db.relationship(
    "WorkoutPlan",
    back_populates="reviews"
  )

  def to_dict(self):
    return {
      "id": self.id,
      "description": self.description
    }
