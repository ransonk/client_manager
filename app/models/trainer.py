from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Trainer(db.Model, UserMixin):
  __tablename__ = 'trainers'

  Id = db.Column(db.Integer, primary_key = True)
  FirstName = db.Column(db.String(40), nullable = False)
  LastName = db.Column(db.String(40), nullable = False)
  Email = db.Column(db.String(255), nullable = False)
  Hashed_Password = db.Column(db.String(255), nullable = False)
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

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "Id": self.id,
      "FirstName": self.FirstName,
      "LastName": self.LastName,
      "Email": self.Email
    }
