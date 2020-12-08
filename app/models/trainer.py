from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Trainer(db.Model, UserMixin):
  __tablename__ = 'trainers'

  id = db.Column(db.Integer, primary_key = True)
  firstName = db.Column(db.String(40), nullable = False)
  lastName = db.Column(db.String(40), nullable = False)
  email = db.Column(db.String(255), nullable = False)
  hashed_password = db.Column(db.String(255), nullable = False)
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        server_onupdate=db.func.now()
    )

  clients = db.relationship(
      "Client",
      back_populates="trainer"
  )

  workouts = db.relationship(
    "Workout",
    back_populates="trainer"
  )

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)

  def return_clients(self):
    return {
      "clients": [client.to_dict() for client in self.clients]
    }

  def return_workouts(self):
    return {
      "workouts": [workout.to_dict() for workout in self.workouts]
    }


  def to_dict(self):
    return {
      "id": self.id,
      "firstName": self.firstName,
      "lastName": self.lastName,
    }

  # def to_dict(self):
  #   return {
  #     "id": self.id,
  #     "firstName": self.firstName,
  #     "lastName": self.lastName,
  #     "email": self.email,
  #     "clients": [client.to_dict() for client in self.clients]
  #   }
