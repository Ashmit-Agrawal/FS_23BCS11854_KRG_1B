package com.habittracker.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.habittracker.model.Completion;
import com.habittracker.model.User;
import com.habittracker.repository.CompletionRepository;
import com.habittracker.repository.UserRepository;

@Service
public class ProgressService {

    @Autowired
    private CompletionRepository completionRepository;

    @Autowired
    private UserRepository userRepository;

    // XP awarded for completing a habit once
    private static final int XP_PER_COMPLETION = 10;

    // XP needed to level up
    private static final int XP_PER_LEVEL = 100;

    // Mark completion and update streaks + XP
    public User updateProgress(String userId, String habitId, String date) {
        // 1. Save today's completion
        Completion completion = new Completion();
        completion.setHabitId(habitId);
        completion.setDate(date);
        completion.setStatus(true);
        completionRepository.save(completion);

        // 2. Update user XP
        User user = userRepository.findById(userId).orElseThrow();
        user.setXp(user.getXp() + XP_PER_COMPLETION);

        // 3. Level up if needed
        if (user.getXp() >= user.getLevel() * XP_PER_LEVEL) {
            user.setLevel(user.getLevel() + 1);
        }

        // 4. Update badges based on streaks
        int streak = calculateStreak(habitId);
        List<String> badges = (user.getBadges() != null) ? new ArrayList<>(user.getBadges()) : new ArrayList<>();

        if (streak == 3 && !badges.contains("3_day_streak")) badges.add("3_day_streak");
        if (streak == 7 && !badges.contains("7_day_streak")) badges.add("7_day_streak");
        if (streak == 30 && !badges.contains("30_day_streak")) badges.add("30_day_streak");

        user.setBadges(badges);

        return userRepository.save(user);
    }

    // Helper: calculate current streak for a habit
    private int calculateStreak(String habitId) {
        
        List<Completion> completions = completionRepository.findByHabitId(habitId)
                .stream()
                .filter(Completion::isStatus)
                .sorted(Comparator.comparing(Completion::getDate).reversed())
                .collect(Collectors.toList());

        int streak = 0;
        LocalDate today = LocalDate.now();

        for (Completion completion : completions) {
            LocalDate date = LocalDate.parse(completion.getDate().trim());
            if (date.equals(today.minusDays(streak))) {
                streak++;
            } else {
                break;
            }
        }
        return streak;
    }
}



