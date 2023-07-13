package com.example.myapplication

import android.annotation.SuppressLint
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

class TeacherRegister : AppCompatActivity() {
    private val dataList = mutableListOf<Teacher>()
    private lateinit var requestQueue: RequestQueue

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_teacher_register)
        val buttonRegisterTeacher = findViewById<Button>(R.id.teacher_button_registrar)
        buttonRegisterTeacher.setOnClickListener() {
            val intent = Intent(this, MainActivity::class.java)
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
        val fieldUsername = findViewById<EditText>(R.id.teacher_username_camp)
        val fieldCorreo = findViewById<EditText>(R.id.teacher_correo_camp)
        val fieldPassword = findViewById<EditText>(R.id.teacher_password_camp)
        val fieldExpYears = findViewById<EditText>(R.id.teacher_expyears_camp)
        val fieldCourse = findViewById<EditText>(R.id.teacher_course_camp)

        val jsonObject = JSONObject()
        jsonObject.put("username","${fieldUsername.text}")
        jsonObject.put("email","${fieldCorreo.text}")
        jsonObject.put("expYears","${Integer.parseInt(fieldExpYears.text.toString())}")
        jsonObject.put("course","${fieldCourse.text}")
        jsonObject.put("password","${fieldPassword.text}")

        val jsonPost = JSONArray()
        jsonPost.put(jsonObject)

        requestQueue = Volley.newRequestQueue(this)

        val url = "https://gonzalost.pythonanywhere.com/teachers"

        //val url ="http://192.168.188.8:5000/teachers"

        val jsonArrayRequest = JsonArrayRequest(
            Request.Method.POST, url, jsonPost,
            {
            },
            { error ->
                println(error.toString())
            })
        requestQueue.add(jsonArrayRequest)
        val JsonObjectRequest = JsonObjectRequest(
            Request.Method.POST, url, jsonObject,
            {
            },
            { error ->
                println(error.toString())
            })
        requestQueue.add(JsonObjectRequest)
    }
}