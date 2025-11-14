package com.habittracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.habittracker.model.Habit;
import com.habittracker.repository.HabitRepository;

@RestController
@RequestMapping("/api/habits")
@CrossOrigin(origins = "*")
public class HabitController {

    @Autowired
    private HabitRepository habitRepository;

    // Get all habits for a specific user
    @GetMapping("/user/{userId}")
    public List<Habit> getHabitsByUser(@PathVariable String userId) {
        return habitRepository.findByUserId(userId);
    }

    // Add a new habit
    @PostMapping
    public Habit createHabit(@RequestBody Habit habit) {
        return habitRepository.save(habit);
    }

    // Update habit
    @PutMapping("/{id}")
    public Habit updateHabit(@PathVariable String id, @RequestBody Habit habitDetails) {
        Habit habit = habitRepository.findById(id).orElseThrow();
        habit.setName(habitDetails.getName());
        habit.setFrequency(habitDetails.getFrequency());
        return habitRepository.save(habit);
    }

    // Delete habit
    @DeleteMapping("/{id}")
    public void deleteHabit(@PathVariable String id) {
        habitRepository.deleteById(id);
    }
}
