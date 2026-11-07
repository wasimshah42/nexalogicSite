<?php
/**
 * Nexalogic Technologies - Database Connection Manager
 * Supports Hostinger MySQL / MariaDB with automatic SQLite zero-config fallback.
 */

// ========================================================
// 1. MYSQL DATABASE CREDENTIALS
// Local: nexalogic_db / root / (empty pass)
// Production (Hostinger): Change to your Hostinger database details
// ========================================================
define('DB_HOST', '127.0.0.1');
define('DB_NAME', 'nexalogic_db');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_PORT', '3306');

/**
 * Returns an active PDO connection (MySQL if configured, otherwise SQLite fallback)
 */
function get_db_connection() {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    // Try MySQL if DB_NAME is set
    if (!empty(DB_NAME) && !empty(DB_USER)) {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
            return $pdo;
        } catch (PDOException $e) {
            error_log("MySQL connection failed: " . $e->getMessage() . " -> Falling back to SQLite.");
        }
    }

    // SQLite Zero-Configuration Fallback
    $dataDir = __DIR__ . '/data';
    if (!file_exists($dataDir)) {
        @mkdir($dataDir, 0755, true);
        @file_put_contents($dataDir . '/.htaccess', "Deny from all\n");
    }

    $sqliteFile = $dataDir . '/nexalogic.db';
    $pdo = new PDO('sqlite:' . $sqliteFile);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // Initialize SQLite tables if not existing
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS visitors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT UNIQUE,
            first_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
            last_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
            ip_address TEXT,
            country TEXT,
            country_code TEXT,
            city TEXT,
            isp TEXT,
            device TEXT,
            browser TEXT,
            os TEXT,
            landing_page TEXT,
            referrer TEXT,
            utm_source TEXT,
            utm_medium TEXT,
            utm_campaign TEXT,
            total_pageviews INTEGER DEFAULT 1,
            total_events INTEGER DEFAULT 1,
            contact_email TEXT,
            contact_phone TEXT,
            contact_telegram TEXT
        );

        CREATE TABLE IF NOT EXISTS visitor_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            event_type TEXT,
            page_url TEXT,
            element_id TEXT,
            event_data TEXT
        );

        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            name TEXT,
            email TEXT,
            phone TEXT,
            telegram TEXT,
            source TEXT,
            package_selected TEXT,
            target_url TEXT,
            target_keywords TEXT,
            message TEXT,
            ip_address TEXT,
            user_agent TEXT,
            status TEXT DEFAULT 'new'
        );

        CREATE TABLE IF NOT EXISTS chat_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            sender TEXT,
            message TEXT,
            step TEXT
        );
    ");

    return $pdo;
}

/**
 * Auto-delete granular activity logs older than 30 days to keep storage clean
 * High-value records (leads and visitor profiles) are permanently preserved.
 */
function prune_old_events($pdo) {
    // 1% probabilistic execution to avoid overhead on every hit
    if (mt_rand(1, 100) !== 1) {
        return;
    }

    try {
        $driver = $pdo->getAttribute(PDO::ATTR_DRIVER_NAME);
        if ($driver === 'mysql') {
            $pdo->exec("DELETE FROM visitor_events WHERE created_at < NOW() - INTERVAL 30 DAY");
        } else {
            $pdo->exec("DELETE FROM visitor_events WHERE created_at < datetime('now', '-30 days')");
        }
    } catch (Exception $e) {
        error_log("Pruning error: " . $e->getMessage());
    }
}
?>

