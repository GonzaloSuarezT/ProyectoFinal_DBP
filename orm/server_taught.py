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

def insert_clase(data):
    student = Estudiante.query.join(Usuario, Estudiante.usuario_id==Usuario.id).filter(Usuario.username == data["estudiante_username"]).add_columns(Estudiante.id).first()
    
    teacher = Profesor.query.join(Usuario, Profesor.usuario_id==Usuario.id).filter(Usuario.username == data["profesor_username"]).add_columns(Profesor.id).first()

    if student is None or teacher is None:
        return "Error: Estudiante o profesor no encontrado."
    
    lesson = Ensenanza(estudiante_id = student[1],profesor_id=teacher[1],url=data["url"],fecha=data["fecha"],clase_aprobada=True)
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
    app.run(host='0.0.0.0', port=8003, debug=False)