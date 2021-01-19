from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Client(db.Model, UserMixin):
  __tablename__ = "clients"

  id = db.Column(db.Integer, primary_key = True)
  firstName = db.Column(db.String(40), nullable = False)
  lastName = db.Column(db.String(40), nullable = False)
  email = db.Column(db.String(255), unique = True)
  phone = db.Column(db.String(255))
  weight = db.Column(db.String(40))
  age = db.Column(db.Integer)
  duedate = db.Column(db.String(255))
  amount = db.Column(db.String(40))
  paid = db.Column(db.Boolean)
  noshows = db.Column(db.Integer)
  cancellations = db.Column(db.Integer)
  hashed_password = db.Column(db.String(255), nullable = False)
  trainer_id = db.Column(db.Integer, db.ForeignKey("trainers.id"))
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

  history = db.relationship(
    "History",
    back_populates="client"
  )
  reviews = db.relationship(
    "Review",
    back_populates="client"
  )

  workoutplans = db.relationship(
    "WorkoutPlan",
    back_populates="client"
  )

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def return_workoutplans(self):
    return {
      "workoutplans": [workoutplan.to_dict() for workoutplan in self.workoutplans]
    }

  def return_workouthistory(self):
    return {
      "history": [his.to_dict() for his in self.history]
    }

  def to_dict(self):
    return {
      "id": self.id,
      "firstName": self.firstName,
      "lastName": self.lastName,
      "email": self.email,
      "phone": self.phone,
      "weight": self.weight,
      "age": self.age,
      "duedate": self.duedate,
      "amount": self.amount,
      "paid": self.paid,
      "noshows": self.noshows,
      "cancellations": self.cancellations,
      "trainer_id": self.trainer_id
    }
