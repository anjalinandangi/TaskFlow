package com.example.ToDoList.repository;



import org.springframework.data.jpa.repository.JpaRepository;


import com.example.ToDoList.entity.*;




public interface TaskRepository extends JpaRepository<Task, Long> {
}
