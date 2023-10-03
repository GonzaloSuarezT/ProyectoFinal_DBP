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

def get_students():
    res = db.session.query(Estudiante.id,Usuario.username,Usuario.email,Usuario.password).filter(Estudiante.usuario_id==Usuario.id).all()
    students = []
    for i in res:
        temp = {"estudiante_id":i[0],"usuario_username":i[1],"usuario_email":i[2],"usuario_password":i[3]}
        students.append(temp)
    return jsonify(students)

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
    app.run(host='0.0.0.0', port=8001, debug=False)