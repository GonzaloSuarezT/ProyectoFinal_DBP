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

#@app.route('/students/delete/<student_id>', methods=['GET', 'DELETE'])
#def route_delete_student(student_id):
#    return delete_student(student_id)

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

@app.route('/teachers/<teacher_course>', methods=['GET'])
def route_get_teacher_by_course(teacher_course):
    res = db.session.query(Profesor.id,Profesor.experiencia,Profesor.curso,Usuario.username,Usuario.email).filter(Profesor.usuario_id==Usuario.id).filter(Profesor.curso == teacher_course).all()
    teachers = []
    for i in res:
        temp = {"profesor_id":i[0],"usuario_username":i[3],"usuario_email":i[4],"profesor_experiencia":i[1],"profesor_curso":i[2]}
        teachers.append(temp)
    return jsonify(teachers)
   
def insert_teacher(teacher_data):

    user = Usuario(username=teacher_data['username'],email=teacher_data['email'],password=teacher_data['password'])
    db.session.add(user)
    db.session.commit()

    teacher = Profesor(usuario_id=user.id,experiencia=teacher_data['experiencia'],curso=teacher_data["curso"])
    db.session.add(teacher)
    db.session.commit()
    return "SUCCESS"

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
    app.run(host='0.0.0.0', port=8002, debug=False)