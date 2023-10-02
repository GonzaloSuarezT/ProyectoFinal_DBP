FROM python:3-slim

WORKDIR /programas/api-students

COPY . .

RUN pip3 install flask flask_sqlalchemy psycopg2 flask_cors

EXPOSE 8001

CMD ["python3", "server_student.py"]