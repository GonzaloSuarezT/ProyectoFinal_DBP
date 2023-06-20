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


@app.route('/registerstudent',methods=['POST'])
def stundent_register():
    if request.method=='POST':
        data=request.get_json()
        student=Student(id=data["id"],username=data["username"],email=data["email"],password=data["password"])
        db.session.add(student)
        db.session.commit()
        return "Estudiante registrado correctamente"



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
    
@app.route('/registerteacher',methods=['POST'])
def teacher_register():
    if request.method=='POST':
        data=request.get_json()
        teacher=Teacher(id=data["id"],username=data["username"],email=data["email"],password=data["password"],expYears=data["expYears"],course=data["course"])
        db.session.add(teacher)
        db.session.commit()
        return "Profesor registrado correctamente"

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
    
@app.route('/profesor',methods="POST")
def publicar_clase():
    if request.method=="POST":
        data = request.get_json()
        clase = Taught(fecha = data["fecha"], url = data["url"],check = data["check"],studentName = data["studentName"],teacherName=data["teacherName"],teacherCourse=data["teacherCourse"])
        db.session.add(clase)
        db.session.commit()
        return "Clase registrada correctamente"

with app.app_context():
    db.create_all()


@app.route('/profesores',methods="GET")
def mostrar_profes():
    if request.method=="GET":
        data=request.get_json()
        curso=data["Curso"]
        todos_profesores=Teacher.query.all()
        #profesores= ?
        for profesor in todos_profesores:
            if profesor.course==curso:
                #add profesor a profesores
        #return profesores

@app.route("/teacher",methods="GET")
def mostrar_clases():
    if request.method=="GET":
        data=request.get_json()
        profesor=data[""]
        clases_all=Taught.query.all()
        #clases_profesor= ?
        for clases in clases_all:
            if clases.teacherName == profesor:
                #add clases a clases_profesor
    
    
def actualizar_clase():
    if request.method=="PUT":
        data=request.get_json()
        update = data["check"]
        clase=Taught.query.get_or_404(data["id"])
        clase.check=update
        db.session.commit()
    return "clase actualizada"
            
    
#Terminal: python -m flask --app colors_server.py run