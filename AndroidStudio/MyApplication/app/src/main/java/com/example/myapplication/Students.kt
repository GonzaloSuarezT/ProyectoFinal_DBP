package com.example.myapplication

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.ListView
import com.android.volley.Request
import com.android.volley.RequestQueue
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.Volley
import org.json.JSONArray

class Students : AppCompatActivity() {
    private val dataList = mutableListOf<Student>()
    private lateinit var requestQueue: RequestQueue

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_students)

        val listView = findViewById<ListView>(R.id.listViewStudents)
        val adapter = StudentsAdapter(dataList);
        listView.adapter = adapter;
        requestQueue = Volley.newRequestQueue(this)
        val url = "https://gonzalost.pythonanywhere.com/students"

        val jsonArrayRequest = JsonArrayRequest(
            Request.Method.GET, url, null,
            { response ->
                val parsedData = parseResponse(response)
                dataList.addAll (parsedData)
                adapter.notifyDataSetChanged()
            },
            { error ->
                println(error.toString())
            })
        requestQueue.add(jsonArrayRequest)

    }
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