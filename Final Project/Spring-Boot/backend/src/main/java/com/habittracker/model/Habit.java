package com.habittracker.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "habits")
public class Habit {
    @Id
    private String id;
    private String userId;
    private String name;
    private String frequency;  // e.g. "daily"
    private String createdOn;
}
