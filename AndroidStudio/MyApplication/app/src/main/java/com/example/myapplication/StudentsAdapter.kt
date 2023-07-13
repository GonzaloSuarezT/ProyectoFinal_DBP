package com.example.myapplication

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.TextView


// Esta clase adapter nos sirve para poder manejar el contenido de la lista de Views que queremos mostrar
class StudentsAdapter(private val dataList: List<Student>) : BaseAdapter() {

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
        val view: View = convertView ?: LayoutInflater.from(parent?.context).inflate(R.layout.student_item, parent, false)

        val dataItem = dataList[position]

        val textViewStudent = view.findViewById<TextView>(R.id.textViewStudent)

        textViewStudent.text = dataItem.username

        return view
    }
}