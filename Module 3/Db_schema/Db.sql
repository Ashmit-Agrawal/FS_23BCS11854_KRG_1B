-- =====================================================
-- DATABASE: daily_habit_tracker
-- PURPOSE : Schema for Daily Habit Tracker with Gamification
-- =====================================================

CREATE DATABASE IF NOT EXISTS daily_habit_tracker;
USE daily_habit_tracker;

-- =====================================================
-- 1. USER TABLE
-- =====================================================
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    level INT DEFAULT 1,
    xp_points INT DEFAULT 0
);

-- =====================================================
-- 2. HABITS TABLE
-- =====================================================
CREATE TABLE habits (
    habit_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    habit_name VARCHAR(100) NOT NULL,
    description TEXT,
    frequency ENUM('daily', 'weekly', 'custom') DEFAULT 'daily',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- =====================================================
-- 3. HABIT LOGS TABLE (DAILY COMPLETIONS)
-- =====================================================
CREATE TABLE habit_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    habit_id INT NOT NULL,
    log_date DATE NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (habit_id) REFERENCES habits(habit_id) ON DELETE CASCADE,
    UNIQUE (habit_id, log_date)
);

-- =====================================================
-- 4. BADGES TABLE
-- =====================================================
CREATE TABLE badges (
    badge_id INT AUTO_INCREMENT PRIMARY KEY,
    badge_name VARCHAR(100) NOT NULL,
    description TEXT,
    xp_reward INT DEFAULT 0,
    level_required INT DEFAULT 1
);

-- =====================================================
-- 5. USER_BADGES TABLE (EARNED BADGES)
-- =====================================================
CREATE TABLE user_badges (
    user_badge_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    badge_id INT NOT NULL,
    earned_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (badge_id) REFERENCES badges(badge_id) ON DELETE CASCADE,
    UNIQUE (user_id, badge_id)
);

-- =====================================================
-- 6. STREAKS TABLE
-- =====================================================
CREATE TABLE streaks (
    streak_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    habit_id INT NOT NULL,
    current_streak INT DEFAULT 0,
    longest_streak INT DEFAULT 0,
    last_updated DATE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (habit_id) REFERENCES habits(habit_id) ON DELETE CASCADE
);

-- =====================================================
-- 7. ANALYTICS
-- =====================================================
CREATE TABLE analytics_summary (
    analytics_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    week_start_date DATE NOT NULL,
    total_habits INT DEFAULT 0,
    habits_completed INT DEFAULT 0,
    consistency_rate DECIMAL(5,2) DEFAULT 0.00,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- =====================================================
-- SAMPLE DATA 
-- =====================================================
INSERT INTO users (username, email, password_hash, level, xp_points)
VALUES ('ashmit', 'ashmit@example.com', 'hashed_pw', 3, 1200);

INSERT INTO habits (user_id, habit_name, description, frequency)
VALUES 
(1, 'Morning Workout', 'Daily fitness routine', 'daily'),
(1, 'Read a Book', 'Read 20 pages of a book', 'daily');

INSERT INTO badges (badge_name, description, xp_reward, level_required)
VALUES 
('7-Day Streak', 'Awarded for maintaining a 7-day streak', 50, 1),
('30-Day Consistency', 'Awarded for maintaining a 30-day streak', 200, 3);
