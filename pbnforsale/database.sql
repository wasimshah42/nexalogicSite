-- ========================================================
-- Nexalogic Technologies - Enterprise MySQL Database Schema
-- Compatible with Hostinger MySQL / MariaDB (phpMyAdmin)
-- ========================================================

CREATE DATABASE IF NOT EXISTS `nexalogic_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `nexalogic_db`;

-- 1. VISITORS & SESSIONS TABLE
-- Tracks unique visitors and their metadata across multiple visits
CREATE TABLE IF NOT EXISTS `visitors` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `session_id` VARCHAR(64) NOT NULL UNIQUE,
    `first_seen` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `last_seen` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `ip_address` VARCHAR(45) NOT NULL,
    `country` VARCHAR(64) DEFAULT 'Unknown',
    `country_code` VARCHAR(8) DEFAULT '??',
    `city` VARCHAR(64) DEFAULT 'Unknown',
    `isp` VARCHAR(128) DEFAULT 'Unknown',
    `device` VARCHAR(64) DEFAULT 'Desktop',
    `browser` VARCHAR(64) DEFAULT 'Unknown',
    `os` VARCHAR(64) DEFAULT 'Unknown',
    `landing_page` VARCHAR(255) DEFAULT '/',
    `referrer` TEXT,
    `utm_source` VARCHAR(64) DEFAULT NULL,
    `utm_medium` VARCHAR(64) DEFAULT NULL,
    `utm_campaign` VARCHAR(64) DEFAULT NULL,
    `total_pageviews` INT UNSIGNED DEFAULT 1,
    `total_events` INT UNSIGNED DEFAULT 1,
    `contact_email` VARCHAR(128) DEFAULT NULL,
    `contact_phone` VARCHAR(64) DEFAULT NULL,
    `contact_telegram` VARCHAR(64) DEFAULT NULL,
    INDEX `idx_session_id` (`session_id`),
    INDEX `idx_ip` (`ip_address`),
    INDEX `idx_last_seen` (`last_seen`),
    INDEX `idx_country` (`country_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. USER JOURNEY & ACTIVITY LOG TABLE
-- Logs granular events: page views, section scrolls, button clicks, chat opens
-- Auto-pruned after 30 days to save storage
CREATE TABLE IF NOT EXISTS `visitor_events` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `session_id` VARCHAR(64) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `event_type` VARCHAR(32) NOT NULL COMMENT 'page_view, click, scroll_section, chat_open, chat_message, package_select',
    `page_url` VARCHAR(255) NOT NULL,
    `element_id` VARCHAR(128) DEFAULT NULL,
    `event_data` TEXT DEFAULT NULL COMMENT 'JSON string containing event details',
    INDEX `idx_session_events` (`session_id`),
    INDEX `idx_event_type` (`event_type`),
    INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. LEADS & CONTACT SUBMISSIONS TABLE
-- High-intent inquiries from CTA form, Chatbot, and Order Placement
-- Stored PERMANENTLY (never auto-deleted)
CREATE TABLE IF NOT EXISTS `leads` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `session_id` VARCHAR(64) DEFAULT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `name` VARCHAR(128) NOT NULL DEFAULT 'Website Visitor',
    `email` VARCHAR(128) DEFAULT NULL,
    `phone` VARCHAR(64) DEFAULT NULL,
    `telegram` VARCHAR(64) DEFAULT NULL,
    `source` VARCHAR(64) NOT NULL DEFAULT 'Website Contact Form',
    `package_selected` VARCHAR(128) DEFAULT NULL,
    `target_url` VARCHAR(255) DEFAULT NULL,
    `target_keywords` TEXT DEFAULT NULL,
    `message` TEXT NOT NULL,
    `ip_address` VARCHAR(45) NOT NULL,
    `user_agent` TEXT DEFAULT NULL,
    `status` ENUM('new', 'in_progress', 'quoted', 'paid', 'fulfilled', 'archived') NOT NULL DEFAULT 'new',
    INDEX `idx_created_at` (`created_at`),
    INDEX `idx_email` (`email`),
    INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. CHAT CONVERSATIONS TABLE
-- Records visitor questions and Sarah AI responses for full transcript review
CREATE TABLE IF NOT EXISTS `chat_messages` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `session_id` VARCHAR(64) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `sender` ENUM('visitor', 'bot') NOT NULL,
    `message` TEXT NOT NULL,
    `step` VARCHAR(32) DEFAULT NULL,
    INDEX `idx_session_chat` (`session_id`),
    INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. OPTIONAL: 30-DAY RETENTION EVENT CLEANUP PROCEDURE
-- Can be called via cron job or PHP automatic periodic trigger
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS `prune_old_visitor_activity`()
BEGIN
    -- Delete activity events older than 30 days
    DELETE FROM `visitor_events` WHERE `created_at` < NOW() - INTERVAL 30 DAY;
    -- Note: Leads and visitor summary profiles are NEVER deleted.
END //
DELIMITER ;

