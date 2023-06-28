package com.example.proyectofinalbdp

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.ListView
import com.example.dbp.DataAdapter
import org.json.JSONArray


class Cursos : AppCompatActivity() {
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
            startActivity(intent)
        }
        buttonCurso2Activity.setOnClickListener(){
            //val Intent =  Intent(this,second)
            val intent = Intent(this,Teachers::class.java)
            startActivity(intent)
        }
        buttonCurso3Activity.setOnClickListener(){
            //val Intent =  Intent(this,second)
            val intent = Intent(this,Teachers::class.java)
            startActivity(intent)
        }
        buttonCurso4Activity.setOnClickListener(){
            //val Intent =  Intent(this,second)
            val intent = Intent(this,Teachers::class.java)
            startActivity(intent)
        }
        buttonCurso5Activity.setOnClickListener(){
            //val Intent =  Intent(this,second)
            val intent = Intent(this,Teachers::class.java)
            startActivity(intent)
        }
        buttonCurso6Activity.setOnClickListener(){
            //val Intent =  Intent(this,second)
            val intent = Intent(this,Teachers::class.java)
            startActivity(intent)
        }

    }

    //no necesito Student
    // * Recibe un JSON y dexvuelve una lista con los elementos ya representados en clases
    private fun parseResponse(response: JSONArray): List<Student> {
        val dataList = mutableListOf<Student>()
        try {
            for (i in 0 until response.length()) {
                val jsonObject = response.getJSONObject(i)
                val id = jsonObject.getInt("id")
                val username = jsonObject.getString("username")
                val email = jsonObject.getString("email")
                val password = jsonObject.getString("password")

                val Student = Student(id,username,email,password)
                dataList.add(Student)
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }

        return dataList
    }


}