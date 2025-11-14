package com.habittracker.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "completions")
public class Completion {
    @Id
    private String id;
    private String habitId;
    private String date;
    private boolean status; // true = completed
}
