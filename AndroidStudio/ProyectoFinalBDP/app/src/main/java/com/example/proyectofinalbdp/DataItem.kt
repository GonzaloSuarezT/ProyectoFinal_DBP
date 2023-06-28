package com.example.proyectofinalbdp

import java.time.LocalDate

data class Student(val id: Int,
                   val username: String,
                   val email: String,
                   val password: String)

data class Teacher(val id: Int,
                   val username: String,
                   val email: String,
                   val password: String,
                   val expYears: Int,
                   val course: String)

data class Taught(val fecha: LocalDate,
                  val url: String,
                  val check: Boolean,
                  val studentName: String,
                  val teacherName: String,
                  val teacherCourse: String)