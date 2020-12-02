from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Client(db.Model, UserMixin):
  __tablename__ = 'clients'

  Id = db.Column(db.Integer, primary_key = True)
  FirstName = db.Column(db.String(40), nullable = False)
  LastName = db.Column(db.String(40), nullable = False)
  Phone = db.Column(db.String(255))
  Email = db.Column(db.String(255), unique = True)
  Weight = db.Column(db.Integer)
  Age = db.Column(db.Integer)
  DueDate = db.Column(db.String(255))
  Amount = db.Column(db.Integer)
  Paid = db.Column(db.Boolean)
  Hashed_Password = db.Column(db.String(255), nullable = False)
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        server_onupdate=db.func.now()
    )

  trainer = db.relationship(
    "Trainer",
    back_populates="clients"
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
      "Weight": self.Weight
      "Age": self.Age
      "DueDate": self.DueDate
      "Amount": self.Amount
      "Paid": self.Paid
    }
