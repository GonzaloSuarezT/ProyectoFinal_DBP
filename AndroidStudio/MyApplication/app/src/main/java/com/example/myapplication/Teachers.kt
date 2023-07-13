package com.example.myapplication

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ListView
import android.widget.Toast
import com.android.volley.Request
import com.android.volley.RequestQueue
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.Volley
import org.json.JSONArray

class Teachers : AppCompatActivity() {
    private val dataList = mutableListOf<Teacher>()
    private lateinit var requestQueue: RequestQueue

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_teachers)

        val listView = findViewById<ListView>(R.id.listViewTeachers)
        val adapter = TeachersAdapter(dataList);
        listView.adapter = adapter;
        requestQueue = Volley.newRequestQueue(this)

        val bundle = intent.extras
        val dato = bundle?.getString("course")
        Toast.makeText(this,dato, Toast.LENGTH_LONG).show()

        val url = "https://gonzalost.pythonanywhere.com/teachers/${dato}"
        //val url ="http://192.168.18.8:5000/teachers/${dato}"

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
    private fun parseResponse(response: JSONArray): List<Teacher> {
        val dataList = mutableListOf<Teacher>()
        try {
            for (i in 0 until response.length()) {
                val jsonObject = response.getJSONObject(i)
                val id = jsonObject.getInt("id")
                val username = jsonObject.getString("username")
                val email = jsonObject.getString("email")
                val password = jsonObject.getString("password")
                val expYears = jsonObject.getInt("expYears")
                val course = jsonObject.getString("course")

                val Teacher = Teacher(id,username,email,password,expYears,course)
                dataList.add(Teacher)
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return dataList
    }
}
