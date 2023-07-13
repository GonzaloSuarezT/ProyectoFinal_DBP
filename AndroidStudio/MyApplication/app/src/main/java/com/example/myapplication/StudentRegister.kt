package com.example.myapplication

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import com.android.volley.Request
import com.android.volley.RequestQueue
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import org.json.JSONArray
import org.json.JSONObject

class StudentRegister : AppCompatActivity() {
    private val dataList = mutableListOf<Student>()
    private lateinit var requestQueue: RequestQueue

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_student_register)

        val buttonRegisterStudent = findViewById<Button>(R.id.student_button_registrar)
        buttonRegisterStudent.setOnClickListener(){
            val intent = Intent(this,MainActivity::class.java)
            postear()
            startActivity(intent)
        }
            /* val jsonPost = JSONArray(
                "'username' : '${fieldUsername.text}'," +
                        "''email : '${fieldCorreo.text}'," +
                        "'expYears :'${fieldExpYears}'," +
                        "'course': '${fieldCourse}'," +
                        "'password' : '${fieldPassword}'")*/

        }
        fun postear(){
            val fieldUsername = findViewById<EditText>(R.id.student_username_camp)
            val fieldCorreo = findViewById<EditText>(R.id.student_correo_camp)
            val fieldPassword = findViewById<EditText>(R.id.student_password_camp)

            val jsonObject = JSONObject()
            jsonObject.put("username","${fieldUsername.text}")
            jsonObject.put("email","${fieldCorreo.text}")
            jsonObject.put("password","${fieldPassword.text}")

            val jsonPost = JSONArray()
            jsonPost.put(jsonObject)

            requestQueue = Volley.newRequestQueue(this)

            val url = "https://gonzalost.pythonanywhere.com/students"

            //val url ="http://192.168.188.8:5000/teachers"

            val JsonObjectRequest = JsonObjectRequest(
                Request.Method.POST, url, jsonObject,
                {
                },
                { error ->
                    println(error.toString())
                })
            requestQueue.add(JsonObjectRequest)

            val jsonArrayRequest = JsonArrayRequest(
                Request.Method.POST, url, jsonPost,
                {
                },
                { error ->
                    println(error.toString())
                })
            requestQueue.add(jsonArrayRequest)

        }


    }
