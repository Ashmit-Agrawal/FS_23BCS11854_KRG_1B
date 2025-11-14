package com.habittracker.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.habittracker.model.Completion;
import com.habittracker.model.Habit;
import com.habittracker.model.User;
import com.habittracker.repository.CompletionRepository;
import com.habittracker.repository.HabitRepository;
import com.habittracker.repository.UserRepository;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HabitRepository habitRepository;

    @Autowired
    private CompletionRepository completionRepository;

    @GetMapping("/{userId}")
    public Map<String, Object> getUserDashboard(@PathVariable String userId) {

        User user = userRepository.findById(userId).orElseThrow();
        List<Habit> habits = habitRepository.findByUserId(userId);

        // Weekly performance summary (past 7 days)
        LocalDate today = LocalDate.now();
        LocalDate weekStart = today.minusDays(6);

        List<Completion> completions = completionRepository.findAll().stream()
                .filter(c -> habits.stream().anyMatch(h -> h.getId().equals(c.getHabitId())))
                .filter(c -> {
                    try {
                        LocalDate d = LocalDate.parse(c.getDate().trim());
                        return (d.isAfter(weekStart.minusDays(1)) && d.isBefore(today.plusDays(1))) && c.isStatus();
                    } catch (Exception e) {
                        return false;
                    }
                })
                .collect(Collectors.toList());

        long totalCompleted = completions.size();
        Map<String, Long> habitCompletionCount = completions.stream()
                .collect(Collectors.groupingBy(Completion::getHabitId, Collectors.counting()));

        Map<String, Object> summary = new HashMap<>();
        summary.put("name", user.getName());
        summary.put("level", user.getLevel());
        summary.put("xp", user.getXp());
        summary.put("badges", user.getBadges());
        summary.put("totalHabits", habits.size());
        summary.put("totalCompletions", totalCompleted);
        summary.put("habitBreakdown", habitCompletionCount);
        summary.put("weekStart", weekStart);
        summary.put("today", today);

        return summary;
    }
}
