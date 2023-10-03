from dataclasses import dataclass
from flask import Flask, jsonify, request, render_template, redirect, flash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS
from sqlalchemy.orm import aliased

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost:3306/proyecto_cloud'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.secret_key = 'my_secret_key'

db = SQLAlchemy(app)

CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}}, methods=["GET", "POST", "PUT", "DELETE"])

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
    res = db.session.query(Estudiante.id,Usuario.username,Usuario.email,Usuario.password).filter(Estudiante.usuario_id==Usuario.id).filter(Usuario.username == student_name).first()
    students = {"estudiante_id":res[0],"usuario_username":res[1],"usuario_email":res[2],"usuario_password":res[3]}
    return jsonify(students)

@app.route('/teachers/get/<teacher_name>', methods=['GET'])
def route_get_teachers_by_name(teacher_name):
    res = db.session.query(Profesor.id,Usuario.username,Usuario.email,Usuario.password).filter(Profesor.usuario_id==Usuario.id).filter(Usuario.username == teacher_name).first()
    teacher = {"profesor_id":res[0],"usuario_username":res[1],"usuario_email":res[2],"usuario_password":res[3]}
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
        u_estudiante = aliased(Usuario,name="u_estudiante")
        u_profesor = aliased(Usuario,name="u_profesor")
        res = db.session.query(Ensenanza.id,Ensenanza.clase_aprobada,Ensenanza.url,Ensenanza.fecha,Estudiante.usuario_id,u_estudiante.username,Profesor.usuario_id,u_profesor.username).filter(Ensenanza.estudiante_id == Estudiante.id).filter(Estudiante.usuario_id == u_estudiante.id).filter(Ensenanza.profesor_id == Profesor.id).filter(Profesor.usuario_id == u_profesor.id).all()
        clase = []
        for i in res:
            temp = {"ensenanza_id":i[0],"ensenanza_clase_aprobada":i[1],"ensenanza_url":i[2],"ensenanza_fecha":i[3],"estudiante_username":i[5],"profesor_username":i[7]}
            clase.append(temp)
        return jsonify(clase)
    elif request.method == 'POST':
        clase = request.get_json()
        return insert_clase(clase)

@app.route('/teachers/<teacher_course>', methods=['GET'])
def route_get_teacher_by_course(teacher_course):
    res = db.session.query(Profesor.id,Profesor.experiencia,Profesor.curso,Usuario.username,Usuario.email).filter(Profesor.usuario_id==Usuario.id).filter(Profesor.curso == teacher_course).all()
    teachers = []
    for i in res:
        temp = {"profesor_id":i[0],"usuario_username":i[3],"usuario_email":i[4],"profesor_experiencia":i[1],"profesor_curso":i[2]}
        teachers.append(temp)
    return jsonify(teachers)

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
    if request.method == 'GET':
        u_estudiante = aliased(Usuario,name="u_estudiante")
        u_profesor = aliased(Usuario,name="u_profesor")
        res = db.session.query(Ensenanza.id,Ensenanza.clase_aprobada,Ensenanza.url,Ensenanza.fecha,Estudiante.usuario_id,u_estudiante.username,Profesor.usuario_id,u_profesor.username).filter(Ensenanza.estudiante_id == Estudiante.id).filter(Estudiante.usuario_id == u_estudiante.id).filter(Ensenanza.profesor_id == Profesor.id).filter(Profesor.usuario_id == u_profesor.id).filter(u_profesor.username == teacher_name).all()
        clase = []
        for i in res:
            temp = {"ensenanza_id":i[0],"ensenanza_clase_aprobada":i[1],"ensenanza_url":i[2],"ensenanza_fecha":i[3],"estudiante_username":i[5]}
            clase.append(temp)
        return jsonify(clase)

def insert_student(student_data):
    #Inserta el nuevo estudiante en la tabla usuario
    user = Usuario(username=student_data['username'],email=student_data['email'],password=student_data['password'])
    db.session.add(user)
    db.session.commit()
    
    #Inserta el nuevo estudiante en la tabla estudiante
    student = Estudiante(usuario_id=user.id)
    db.session.add(student)
    db.session.commit()
    return "SUCCESS"
    
def insert_teacher(teacher_data):

    user = Usuario(username=teacher_data['username'],email=teacher_data['email'],password=teacher_data['password'])
    db.session.add(user)
    db.session.commit()

    teacher = Profesor(usuario_id=user.id,experiencia=teacher_data['experiencia'],curso=teacher_data["curso"])
    db.session.add(teacher)
    db.session.commit()
    return "SUCCESS"

def insert_clase(data):
    student = Estudiante.query.join(Usuario, Estudiante.usuario_id==Usuario.id).filter(Usuario.username == data["estudiante_username"]).add_columns(Estudiante.id).first()
    
    teacher = Profesor.query.join(Usuario, Profesor.usuario_id==Usuario.id).filter(Usuario.username == data["profesor_username"]).add_columns(Profesor.id).first()

    if student is None or teacher is None:
        return "Error: Estudiante o profesor no encontrado."
    
    lesson = Ensenanza(estudiante_id = student[1],profesor_id=teacher[1],url=data["url"],fecha=data["fecha"],clase_aprobada=False)
    db.session.add(lesson)
    db.session.commit()
    return "SUCCESS"

def get_clase_by_name(student_name):
    u_estudiante = aliased(Usuario,name="u_estudiante")
    u_profesor = aliased(Usuario,name="u_profesor")
    res = db.session.query(Ensenanza.id,Ensenanza.clase_aprobada,Ensenanza.url,Ensenanza.fecha,Estudiante.usuario_id,u_estudiante.username,Profesor.usuario_id,u_profesor.username).filter(Ensenanza.estudiante_id == Estudiante.id).filter(Estudiante.usuario_id == u_estudiante.id).filter(Ensenanza.profesor_id == Profesor.id).filter(Profesor.usuario_id == u_profesor.id).filter(u_estudiante.username == student_name).all()
    clase = []
    for i in res:
        temp = {"ensenanza_id":i[0],"ensenanza_clase_aprobada":i[1],"ensenanza_url":i[2],"ensenanza_fecha":i[3],"profesor_username":i[7]}
        clase.append(temp)
    return jsonify(clase)

def update_clase(clase_id, new_clase):
    lesson = Ensenanza.query.filter_by(id=clase_id).first()
    lesson.clase_aprobada = new_clase["clase_aprobada"]
    db.session.commit()
    db.session.refresh(lesson)
    return 'SUCCESS'

def delete_clase(clase_id):
    lesson = Ensenanza.query.get_or_404(clase_id)
    db.session.delete(lesson)
    db.session.commit()
    return 'SUCCESS'

def get_students():
    res = db.session.query(Estudiante.id,Usuario.username,Usuario.email,Usuario.password).filter(Estudiante.usuario_id==Usuario.id).all()
    students = []
    for i in res:
        temp = {"estudiante_id":i[0],"usuario_username":i[1],"usuario_email":i[2],"usuario_password":i[3]}
        students.append(temp)
    return jsonify(students)

def get_teachers():
    res = db.session.query(Profesor.id,Usuario.username,Usuario.email,Usuario.password).filter(Profesor.usuario_id==Usuario.id).all()
    teachers = []
    for i in res:
        temp = {"profesor_id":i[0],"usuario_username":i[1],"usuario_email":i[2],"usuario_password":i[3]}
        teachers.append(temp)
    return jsonify(teachers)

#def delete_student(student_id):
#    student = Estudiante.query.get_or_404(student_id)
#    db.session.delete(student)
#    db.session.commit()
#    return 'SUCCESS'

#Terminal: python -m flask --app orm/server run

@app.route('/', methods=['GET'])
def test_connection():
    return "Conection Working"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, debug=False)