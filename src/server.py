from dataclasses import dataclass
from flask import Flask, jsonify, request, render_template, redirect, flash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from datetime import date
from flask_cors import CORS

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.secret_key = 'my_secret_key'

db = SQLAlchemy(app)

CORS(app)

@dataclass
class Student(db.Model):
    id: int
    username: str
    email: str
    password: str

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    
    def __repr__(self):
        return f'<Student {self.id}>'
    
    def check_password(self,password):
        return self.password == password

@dataclass
class Teacher(db.Model):
    id: int
    username: str
    email: str
    password: str
    expYears: int
    course: str

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    expYears = db.Column(db.Integer, nullable=True)
    course = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<Teacher {self.id}>'
    
    def check_password(self,password):
        return self.password == password

@dataclass
class Taught(db.Model):

    fecha: date
    url: str
    check: bool
    studentName: str
    teacherName: str
    teacherCourse: str

    fecha = db.Column(db.DateTime, primary_key=True)
    url = db.Column(db.String(100), nullable=False)
    check = db.Column(db.Boolean, nullable=False)
    studentName = db.Column(db.String(100), ForeignKey("Student.username"),nullable=False)
    teacherName = db.Column(db.String(100), ForeignKey("Teacher.username"),nullable=False)
    teacherCourse = db.Column(db.String(100), ForeignKey("Teacher.course"),nullable=False)

    def __repr__(self):
        return f'<Taught {self.name}>'
    

with app.app_context():
    db.create_all()


#Terminal: python -m flask --app colors_server.py run