from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class WorkoutPlan(db.Model, UserMixin):
  __tablename__ = 'workoutplans'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(255), nullable=False)
  description = db.Column(db.Text)
  rating = db.Column(db.Integer)
  time = db.Column(db.Integer, nullable=False)
  date = db.Column(db.Integer, nullable=False)
  pull = db.Column(db.Boolean)
  push = db.Column(db.Boolean)
  noshows = db.Column(db.Integer)
  cancellations = db.Column(db.Integer)
  client_id = db.Column(db.Integer, db.ForeignKey("clients.id"))
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        server_onupdate=db.func.now()
    )

  workoutintensity = db.relationship(
    "WorkoutIntensity",
    back_populates="workoutplan"
  )
  reviews = db.relationship(
    "Review",
    back_populates="workoutplan"
  )

  def to_dict(self):
    return {
      "id": self.id,
      "description": self.description,
      "rating": self.rating,
      "time": self.time,
      "date": self.date,
      "pull": self.pull,
      "push": self.push,
      "noshows": self.noshows,
      "cancellations": self.cancellations,
      "reviews": [review.to_dict() for review in self.reviews]
    }
