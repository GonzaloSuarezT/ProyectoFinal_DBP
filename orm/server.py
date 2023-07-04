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

    fecha = db.Column(db.DateTime, nullable=False)
    url = db.Column(db.String(100), nullable=False)
    check = db.Column(db.Boolean, nullable=False)
    studentName = db.Column(db.String(100), primary_key=True, nullable=False)
    teacherName = db.Column(db.String(100), primary_key=True, nullable=False)
    teacherCourse = db.Column(db.String(100),nullable=False)

    def __repr__(self):
        return f'<Taught {self.name}>'

with app.app_context():
    db.create_all()
    
    #Routes

@app.route('/students', methods=['POST','GET'])
def route_add_student():
    if request.method == 'GET':
        return get_students()
    elif request.method == 'POST':
        student = request.get_json()
        return insert_student(student)

@app.route('/students/delete/<student_id>', methods=['GET', 'DELETE'])
def route_delete_student(student_id):
    return delete_student(student_id)

def delete_student(student_id):
    student = Student.query.get_or_404(student_id)
    db.session.delete(student)
    db.session.commit()
    return 'SUCCESS'

@app.route('/students/get/<student_name>', methods=['GET'])
def route_get_students_by_name(student_name):
    student = Student.query.filter_by(username=student_name).all()
    return jsonify(student)

@app.route('/teachers/get/<teacher_name>', methods=['GET'])
def route_get_teachers_by_name(teacher_name):
    teacher = Teacher.query.filter_by(username=teacher_name).all()
    return jsonify(teacher)

@app.route('/teachers', methods=['GET','POST'])
def route_add_teacher():
    if request.method == 'GET':
        return get_teachers()
    elif request.method == 'POST':
        teacher = request.get_json()
        return insert_teacher(teacher)

@app.route('/taught/add', methods=['POST'])
def route_add_clase():
    clase = request.get_json()
    return insert_clase(clase)

@app.route('/teachers/<teacher_course>', methods=['GET'])
def route_get_teacher_by_course(teacher_course):
    teacher = Teacher.query.filter_by(course=teacher_course).all()
    return jsonify(teacher)

@app.route('/taught/<student_name>', methods=['GET','PUT','DELETE'])
def route_clase_student_name(student_name):
    if request.method == 'GET':
        return get_clase_by_name(student_name)
    elif request.method == 'PUT':
        clase = request.get_json()
        return update_clase(student_name, clase)
    elif request.method == 'DELETE':
        return delete_clase(student_name)

def insert_student(data):
    student = Student(username=data["username"], email=data["email"], password=data["password"])
    db.session.add(student)
    db.session.commit()
    return "SUCCESS"
    
def insert_teacher(data):
    teacher = Teacher(username=data["username"], email=data["email"], password=data["password"], expYears=data["expYears"], course=data["course"])
    db.session.add(teacher)
    db.session.commit()
    return "SUCCESS"

def insert_clase(data):
    clase = Taught(fecha=data["fecha"], url=data["url"], check=data["check"], studentName=data["studentName"], teacherName=data["teacherName"],teacherCourse=data["teacherCourse"])
    db.session.add(clase)
    db.session.commit()
    return "SUCCESS"

def get_clase_by_name(student_name):
    # Player.query.filter_by(id=3).first()
    clase = Taught.query.get_or_404(student_name)
    return jsonify(clase)

def update_clase(student_name, new_clase):
    clase = Taught.query.get_or_404(student_name)
    clase.check = new_clase["check"]
    db.session.commit()
    return 'SUCCESS'

def delete_clase(student_name):
    clase = Taught.query.get_or_404(student_name)
    db.session.delete(clase)
    db.session.commit()
    return 'SUCCESS'

def get_students():
    students = Student.query.all()
    return jsonify(students)

def get_teachers():
    teachers = Teacher.query.all()
    return jsonify(teachers)

"""

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
            
    """
#Terminal: python -m flask --app orm/server run