package com.example.ToDoList.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ToDoList.entity.Task;
import com.example.ToDoList.repository.TaskRepository;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repo;

    public List<Task> getAllTasks() {
        return repo.findAll();
    }

    public Task addTask(Task task) {
        return repo.save(task);
    }

    public Task updateTask(Long id, Task task) {

        Task existing = repo.findById(id).orElseThrow();

        existing.setTitle(task.getTitle());
        existing.setDescription(task.getDescription());
        existing.setPriority(task.getPriority());
        existing.setDueDate(task.getDueDate());
        existing.setCompleted(task.isCompleted());

        return repo.save(existing);
    }

    public void deleteTask(Long id) {
        repo.deleteById(id);
    }
}