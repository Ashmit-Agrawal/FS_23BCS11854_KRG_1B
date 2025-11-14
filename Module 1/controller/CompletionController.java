package com.habittracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.habittracker.model.Completion;
import com.habittracker.model.User;
import com.habittracker.repository.CompletionRepository;
import com.habittracker.service.ProgressService;

@RestController
@RequestMapping("/api/completions")
@CrossOrigin(origins = "*")
public class CompletionController {

    @Autowired
    private CompletionRepository completionRepository;

    // Get all completions for a habit
    @GetMapping("/habit/{habitId}")
    public List<Completion> getCompletionsByHabit(@PathVariable String habitId) {
        return completionRepository.findByHabitId(habitId);
    }

    // Mark completion for a day
    @PostMapping
    public Completion markCompletion(@RequestBody Completion completion) {
        return completionRepository.save(completion);
    }

    // Update completion status
    @PutMapping("/{id}")
    public Completion updateCompletion(@PathVariable String id, @RequestBody Completion completionDetails) {
        Completion completion = completionRepository.findById(id).orElseThrow();
        completion.setStatus(completionDetails.isStatus());
        return completionRepository.save(completion);
    }


    @Autowired
    private ProgressService progressService;

    // Mark a completion and update XP, level, and badges
    @PostMapping("/update")
    public User updateUserProgress(@RequestParam String userId,
                                   @RequestParam String habitId,
                                   @RequestParam String date) {
        return progressService.updateProgress(userId, habitId, date);
    }
}




