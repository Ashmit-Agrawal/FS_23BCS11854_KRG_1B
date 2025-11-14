package com.habittracker.repository;
import com.habittracker.model.Completion;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CompletionRepository extends MongoRepository<Completion, String> {
    List<Completion> findByHabitId(String habitId);
}
