from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class History(db.Model, UserMixin):
  __tablename__ = 'histories'

  id = db.Column(db.Integer, primary_key = True)
  name= db.Column(db.String(255), nullable=False)
  workout1= db.Column(db.String(40), nullable=True)
  workout1Score= db.Column(db.String(40), nullable=True)
  workout2= db.Column(db.String(40), nullable=True)
  workout2Score= db.Column(db.String(40), nullable=True)
  workout3= db.Column(db.String(40), nullable=True)
  workout3Score= db.Column(db.String(40), nullable=True)
  workout4= db.Column(db.String(40), nullable=True)
  workout4Score= db.Column(db.String(40), nullable=True)
  workout5= db.Column(db.String(40), nullable=True)
  workout5Score= db.Column(db.String(40), nullable=True)
  workout6= db.Column(db.String(40), nullable=True)
  workout6Score= db.Column(db.String(40), nullable=True)
  workout7= db.Column(db.String(40), nullable=True)
  workout7Score= db.Column(db.String(40), nullable=True)
  workout8= db.Column(db.String(40), nullable=True)
  workout8Score= db.Column(db.String(40), nullable=True)
  date= db.Column(db.String(40), nullable=False)
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
    back_populates="history"
  )

  trainer = db.relationship(
    "Trainer",
    back_populates="history"
  )


  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "pushCount": self.pushCount,
      "pullCount": self.pullCount,
      "pushScore": self.pushScore,
      "pullScore": self.pullScore,
      "date": self.date,
      "client_id": self.client_id,
      "trainer_id": self.trainer_id
    }
