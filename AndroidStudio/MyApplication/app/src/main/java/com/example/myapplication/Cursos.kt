package com.example.myapplication

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button

class Cursos: AppCompatActivity(){
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_cursos)

        val buttonCurso1Activity = findViewById<Button>(R.id.curso1)
        val buttonCurso2Activity = findViewById<Button>(R.id.curso2)
        val buttonCurso3Activity = findViewById<Button>(R.id.curso3)
        val buttonCurso4Activity = findViewById<Button>(R.id.curso4)
        val buttonCurso5Activity = findViewById<Button>(R.id.curso5)
        val buttonCurso6Activity = findViewById<Button>(R.id.curso6)

        buttonCurso1Activity.setOnClickListener(){
            //val Intent =  Intent(this,second)
            val intent = Intent(this,Teachers::class.java)
            intent.putExtra("course","Maths")
            startActivity(intent)
        }
        buttonCurso2Activity.setOnClickListener(){
            //val Intent =  Intent(this,second)
            val intent = Intent(this, Teachers::class.java)
            intent.putExtra("course","Literature")
            startActivity(intent)
        }
        buttonCurso3Activity.setOnClickListener(){
            //val Intent =  Intent(this,second)
            val intent = Intent(this,Teachers::class.java)
            intent.putExtra("course","History")
            startActivity(intent)
        }
        buttonCurso4Activity.setOnClickListener(){
            //val Intent =  Intent(this,second)
            val intent = Intent(this,Teachers::class.java)
            intent.putExtra("course","Chemistry")
            startActivity(intent)
        }
        buttonCurso5Activity.setOnClickListener(){
            //val Intent =  Intent(this,second)
            val intent = Intent(this,Teachers::class.java)
            intent.putExtra("course","Physics")
            startActivity(intent)
        }
        buttonCurso6Activity.setOnClickListener(){
            //val Intent =  Intent(this,second)
            val intent = Intent(this,Teachers::class.java)
            intent.putExtra("course","Geography")
            startActivity(intent)
        }

    }

}