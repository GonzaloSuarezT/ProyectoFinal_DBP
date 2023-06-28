package com.example.proyectofinalbdp

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val buttonInicio = findViewById<Button>(R.id.inicio)

        buttonInicio.setOnClickListener(){
            //val Intent =  Intent(this,second)
            val intent = Intent(this,Cursos::class.java)
            startActivity(intent)
        }

    }
}