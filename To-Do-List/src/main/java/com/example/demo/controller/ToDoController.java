package com.example.demo.controller;

import com.example.demo.model.ToDo;
import com.example.demo.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class ToDoController {

    @Autowired
    private ToDoRepository toDoRepository;

    // Get all tasks
    @GetMapping
    public List<ToDo> getAllToDos() {
        return toDoRepository.findAll();
    }

    // Add a new task
    @PostMapping
    public ToDo createToDo(@RequestBody ToDo todo) {
        return toDoRepository.save(todo);
    }

    // Delete a task by ID
    @DeleteMapping("/{id}")
    public void deleteToDo(@PathVariable Long id) {
        toDoRepository.deleteById(id);
    }
 // Update a task by ID
    @PutMapping("/{id}")
    public ToDo updateToDo(@PathVariable Long id, @RequestBody ToDo updatedTodo) {
        ToDo existingTodo = toDoRepository.findById(id).orElse(null);
        if (existingTodo != null) {
            existingTodo.setTask(updatedTodo.getTask());
            existingTodo.setCompleted(updatedTodo.isCompleted());
            return toDoRepository.save(existingTodo);
        } else {
            return null;
        }
    }


}
