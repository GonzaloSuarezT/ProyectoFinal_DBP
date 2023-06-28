package com.example.dbp

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.Button
import android.widget.TextView
import com.example.proyectofinalbdp.R
import com.example.proyectofinalbdp.Teacher

// Esta clase adapter nos sirve para poder manejar el contenido de la lista de Views que queremos mostrar
class DataAdapter(private val dataList: List<Teacher>) : BaseAdapter() {

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
        val view: View = convertView ?: LayoutInflater.from(parent?.context).inflate(R.layout.button_data, parent, false)

        val dataItem = dataList[position]

        val textViewButton = view.findViewById<Button>(R.id.teacher1)

        textViewButton.text = dataItem.username



        return view
    }
}