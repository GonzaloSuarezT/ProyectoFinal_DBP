package com.example.proyectofinalbdp

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import org.json.JSONArray

class Teachers : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_teachers)
    }
    // * Recibe un JSON y dexvuelve una lista con los elementos ya representados en clasesz
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
                val Teacher = Teacher(id,username,email,password,expYears, course)
                dataList.add(Teacher)
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }

        return dataList
    }
}