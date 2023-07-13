package com.example.myapplication

import android.app.ListActivity
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat.startActivity
import androidx.fragment.app.FragmentActivity

class TeachersRegisterAdapter(private val dataList: List<Teacher>) : BaseAdapter() {

    override fun getCount(): Int {
        return dataList.size
    }

    override fun getItem(position: Int): Any {
        return dataList[position]
    }

    override fun getItemId(position: Int): Long {
        return position.toLong()
    }


    override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {
        val view: View = convertView ?: LayoutInflater.from(parent?.context)
            .inflate(R.layout.teacher_button, parent, false)

        val dataItem = dataList[position]

        val textViewexpYears = view.findViewById<TextView>(R.id.expYearsTextView)
        val buttonTeacher = view.findViewById<Button>(R.id.teacherButton)

        textViewexpYears.text = dataItem.expYears.toString()
        buttonTeacher.text = dataItem.username

        return view
    }
}