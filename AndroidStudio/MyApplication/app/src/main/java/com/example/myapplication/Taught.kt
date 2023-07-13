package com.example.myapplication

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast

class TaughtActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_taught)

        val bundle = intent.extras
        val dato = bundle?.getString("username")
        Toast.makeText(this,dato, Toast.LENGTH_LONG).show()


    }
}