from dataclasses import dataclass
import psycopg2
from psycopg2 import sql
from flask import Flask, jsonify, request, render_template, redirect, flash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:7707lima&gre@localhost/megaprof'

app.secret_key = 'my_secret_key'

db = SQLAlchemy(app)

CORS(app)
CORS(app, origins="http://localhost:3000")

conn = psycopg2.connect(
        database="megaprof",
        user="postgres",
        password="7707lima&gre",
        host="localhost",
        port="5432"
    )

cursor = conn.cursor()

@dataclass
class Usuario(db.Model):
    id: int
    username: str
    email: str
    password: str

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    
    def __repr__(self):
        return f'<Usuario {self.id}>'
    def check_password(self,password):
        return self.password == password

@dataclass
class Estudiante(db.Model):
    id: int
    usuario_id: int

    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), unique=True, nullable=False)
    
    def __repr__(self):
        return f'<Estudiante {self.id}>'

@dataclass
class Profesor(db.Model):
    id: int
    usuario_id: int
    experiencia: int
    curso: str

    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), unique=True, nullable=False)
    experiencia = db.Column(db.Integer, nullable=False)
    curso = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<Profesor {self.id}>'

@dataclass
class Ensenanza(db.Model):
    id: int
    estudiante_id: int
    profesor_id: int
    clase_aprobada: bool
    url: str
    fecha: datetime

    id = db.Column(db.Integer, primary_key=True)
    estudiante_id = db.Column(db.Integer, db.ForeignKey('estudiante.id'))
    profesor_id = db.Column(db.Integer, db.ForeignKey('profesor.id'))
    clase_aprobada = db.Column(db.Boolean, nullable=False)
    url = db.Column(db.String(100), nullable=False)
    fecha = db.Column(db.DateTime, nullable=True, default=datetime.utcnow)

    def __repr__(self):
        return f'<Ensenanza {self.id}>'
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

#@app.route('/students/delete/<student_id>', methods=['GET', 'DELETE'])
#def route_delete_student(student_id):
#    return delete_student(student_id)

@app.route('/students/get/<student_name>', methods=['GET'])
def route_get_students_by_name(student_name):
    filter_query = sql.SQL("SELECT estudiante.id,username,email,password FROM estudiante JOIN usuario ON estudiante.usuario_id=usuario.id WHERE username=%s")
    cursor.execute(filter_query, (student_name,))
    student = cursor.fetchall()
    return jsonify(student)

@app.route('/teachers/get/<teacher_name>', methods=['GET'])
def route_get_teachers_by_name(teacher_name):
    filter_query = sql.SQL("SELECT profesor.id,username,email,password FROM profesor JOIN usuario ON profesor.usuario_id=usuario.id WHERE username=%s")
    cursor.execute(filter_query, (teacher_name,))
    teacher = cursor.fetchall()
    return jsonify(teacher)

@app.route('/teachers', methods=['GET','POST'])
def route_add_teacher():
    if request.method == 'GET':
        return get_teachers()
    elif request.method == 'POST':
        teacher = request.get_json()
        return insert_teacher(teacher)

@app.route('/taught', methods=['GET','POST'])
def route_add_get_clase():
    if request.method == 'GET':
        cursor.execute("""
        SELECT e.id AS enseñanza_id, u_estudiante.username AS estudiante_username, u_profesor.username AS profesor_username, e.clase_aprobada, e.url, e.fecha
FROM ensenanza AS e
JOIN estudiante AS est ON e.estudiante_id = est.id
JOIN usuario AS u_estudiante ON est.usuario_id = u_estudiante.id
JOIN profesor AS prof ON e.profesor_id = prof.id
JOIN usuario AS u_profesor ON prof.usuario_id = u_profesor.id;
    """)
        clase = cursor.fetchall()
        return jsonify(clase)
    elif request.method == 'POST':
        clase = request.get_json()
        return insert_clase(clase)

@app.route('/teachers/<teacher_course>', methods=['GET'])
def route_get_teacher_by_course(teacher_course):
    filter_query = sql.SQL("SELECT profesor.id,username,email,experiencia,curso FROM profesor JOIN usuario ON profesor.usuario_id=usuario.id WHERE profesor.curso=%s")
    cursor.execute(filter_query, (teacher_course,))
    teacher = cursor.fetchall()
    return jsonify(teacher)

@app.route('/taught/<student_name>', methods=['GET'])
def route_clase_student_name(student_name):
    request.method == 'GET'
    return get_clase_by_name(student_name)
    
@app.route('/taught/id/<clase_id>', methods=['PUT','DELETE'])
def route_clase_clase_id(clase_id):
    if request.method == 'PUT':
        clase = request.get_json()
        return update_clase(clase_id, clase)
    elif request.method == 'DELETE':
        return delete_clase(clase_id)

@app.route('/taught/t/<teacher_name>', methods=['GET'])
def route_clase_teacher_name(teacher_name):

    filter_query = sql.SQL("""
        SELECT e.id AS enseñanza_id, u_estudiante.username AS estudiante_username, e.clase_aprobada, e.url, e.fecha
FROM ensenanza AS e
JOIN estudiante AS est ON e.estudiante_id = est.id
JOIN usuario AS u_estudiante ON est.usuario_id = u_estudiante.id
JOIN profesor AS prof ON e.profesor_id = prof.id
JOIN usuario AS u_profesor ON prof.usuario_id = u_profesor.id
WHERE u_profesor.username = %s;
    """)
    cursor.execute(filter_query, (teacher_name,))
    clase = cursor.fetchall()
    return jsonify(clase)

def insert_student(student_data):
    #Inserta el nuevo estudiante en la tabla usuario
    insert_query = sql.SQL("""
        INSERT INTO usuario (username, email, password)
        VALUES (%s, %s, %s)
        RETURNING id
    """)
    
    cursor.execute(insert_query, (
        student_data["username"],
        student_data["email"],
        student_data["password"]
    ))
    
    user_id = cursor.fetchone()[0]
    
    #Inserta el nuevo estudiante en la tabla estudiante
    insert_estudiante_query = sql.SQL("""
        INSERT INTO estudiante (usuario_id)
        VALUES (%s)
    """)
    
    cursor.execute(insert_estudiante_query, (user_id,))
    
    conn.commit()
    return "SUCCESS"
    
def insert_teacher(teacher_data):
    #Inserta el nuevo profesor en la tabla usuario
    insert_query = sql.SQL("""
        INSERT INTO usuario (username, email, password)
        VALUES (%s, %s, %s)
        RETURNING id
    """)
    
    cursor.execute(insert_query, (
        teacher_data["username"],
        teacher_data["email"],
        teacher_data["password"]
    ))
    
    #user_id = cursor.fetchone()[0]
    
    #Insertaa el nuevo profesor en la tabla profesor
    insert_teacher_query = sql.SQL("""
        INSERT INTO profesor (usuario_id, experiencia, curso)
VALUES (currval(pg_get_serial_sequence('usuario', 'id')), %s, %s);
    """)
    
    cursor.execute(insert_teacher_query, (
        teacher_data["experiencia"],
        teacher_data["curso"]
    ))
    
    conn.commit()
    return "SUCCESS"

def insert_clase(data):
    insert_query=sql.SQL("""INSERT INTO ensenanza (estudiante_id, profesor_id, clase_aprobada, url, fecha)
VALUES (%s, %s, true, %s, %s);
""")
    cursor.execute(insert_query, (
        data["estudiante_id"],
        data["profesor_id"],
        data["url"],
        data["fecha"]
    ))
    conn.commit()
    return "SUCCESS"

def get_clase_by_name(student_name):
    filter_query = sql.SQL("""
        SELECT e.id AS enseñanza_id, u_estudiante.username AS estudiante_username, u_profesor.username AS profesor_username, e.clase_aprobada, e.url, e.fecha
FROM ensenanza AS e
JOIN estudiante AS est ON e.estudiante_id = est.id
JOIN usuario AS u_estudiante ON est.usuario_id = u_estudiante.id
JOIN profesor AS prof ON e.profesor_id = prof.id
JOIN usuario AS u_profesor ON prof.usuario_id = u_profesor.id
WHERE u_estudiante.username = %s;
    """)
    cursor.execute(filter_query, (student_name,))
    clase = cursor.fetchall()
    return jsonify(clase)

def update_clase(clase_id, new_clase):
    update_query=sql.SQL("""UPDATE ensenanza SET clase_aprobada = %s WHERE id = %s;
""")
    cursor.execute(update_query,(new_clase["clase_aprobada"],clase_id))
    conn.commit()
    return 'SUCCESS'

def delete_clase(clase_id):
    delete_query=sql.SQL("""DELETE FROM ensenanza WHERE id = %s;""")
    cursor.execute(delete_query,(clase_id))
    conn.commit()
    return 'SUCCESS'

def get_students():
    cursor.execute("SELECT estudiante.id,username,email,password FROM estudiante JOIN usuario ON estudiante.usuario_id=usuario.id")
    students = cursor.fetchall()
    return jsonify(students)

def get_teachers():
    cursor.execute("SELECT profesor.id,username,email,password FROM profesor JOIN usuario ON profesor.usuario_id=usuario.id")
    teachers = cursor.fetchall()
    return jsonify(teachers)

#def delete_student(student_id):
#    student = Estudiante.query.get_or_404(student_id)
#    db.session.delete(student)
#    db.session.commit()
#    return 'SUCCESS'

#Terminal: python -m flask --app orm/server run