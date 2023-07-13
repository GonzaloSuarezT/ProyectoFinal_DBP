package com.example.myapplication

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val buttonInicio = findViewById<Button>(R.id.inicio)
        val buttonShowStudents = findViewById<Button>(R.id.showStudents)
        val buttonRegisterStudent = findViewById<Button>(R.id.registerStudent)
        val buttonRegisterTeacher = findViewById<Button>(R.id.registerTeacher)
        buttonRegisterStudent.setOnClickListener(){
            val intent = Intent (this,StudentRegister::class.java)
            startActivity(intent)
        }
        buttonRegisterTeacher.setOnClickListener(){
            val intent = Intent (this,TeacherRegister::class.java)
            startActivity(intent)
        }

        buttonInicio.setOnClickListener(){
            //val Intent =  Intent(this,second)
            val intent = Intent(this, Cursos::class.java)
            startActivity(intent)
        }

        buttonShowStudents.setOnClickListener(){
            val intent = Intent(this, Students::class.java)
            startActivity(intent)
        }
    }
}