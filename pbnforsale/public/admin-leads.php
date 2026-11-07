<?php
// Nexalogic Technologies - Secure Leads & User Journey Admin Portal
// Access URL: https://nexalogic.site/admin-leads.php?key=nexalogic2026

require_once __DIR__ . '/db-config.php';

$SECRET_KEY = 'nexalogic2026'; // Change to any password key you prefer

$provided_key = $_GET['key'] ?? '';
if ($provided_key !== $SECRET_KEY) {
    header('HTTP/1.1 403 Forbidden');
    echo "<!DOCTYPE html><html><body style='font-family:sans-serif; background:#0a0a0a; color:#fff; text-align:center; padding:100px;'>";
    echo "<h2 style='color:#f59e0b;'>403 Access Denied</h2>";
    echo "<p>Please provide the correct access key parameter: <code>?key=YOUR_KEY</code></p>";
    echo "</body></html>";
    exit();
}

$pdo = get_db_connection();
$db_driver = $pdo->getAttribute(PDO::ATTR_DRIVER_NAME);

// Handle CSV Export
if (isset($_GET['action']) && $_GET['action'] === 'export') {
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=nexalogic_leads_' . date('Y-m-d') . '.csv');
    $output = fopen('php://output', 'w');
    fputcsv($output, ['ID', 'Date', 'Session ID', 'Name', 'Email', 'Phone', 'Telegram', 'Source', 'Package', 'Target URL', 'Message', 'IP']);

    $stmt = $pdo->query("SELECT id, created_at, session_id, name, email, phone, telegram, source, package_selected, target_url, message, ip_address FROM leads ORDER BY id DESC");
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        fputcsv($output, $row);
    }
    fclose($output);
    exit();
}

// Fetch Leads
$leadsStmt = $pdo->query("SELECT * FROM leads ORDER BY id DESC LIMIT 200");
$leads = $leadsStmt->fetchAll(PDO::FETCH_ASSOC);

// Fetch Recent Visitors & Journeys
$visitorsStmt = $pdo->query("SELECT * FROM visitors ORDER BY last_seen DESC LIMIT 150");
$visitors = $visitorsStmt->fetchAll(PDO::FETCH_ASSOC);

// Fetch Overall Stats
$stats = [
    'total_leads' => count($leads),
    'total_visitors' => 0,
    'total_pageviews' => 0,
    'active_24h' => 0,
];

try {
    $vCount = $pdo->query("SELECT COUNT(*) as c, SUM(total_pageviews) as pv FROM visitors")->fetch();
    if ($vCount) {
        $stats['total_visitors'] = (int)$vCount['c'];
        $stats['total_pageviews'] = (int)$vCount['pv'];
    }

    if ($db_driver === 'mysql') {
        $aCount = $pdo->query("SELECT COUNT(*) as c FROM visitors WHERE last_seen >= NOW() - INTERVAL 24 HOUR")->fetch();
    } else {
        $aCount = $pdo->query("SELECT COUNT(*) as c FROM visitors WHERE last_seen >= datetime('now', '-1 day')")->fetch();
    }
    if ($aCount) $stats['active_24h'] = (int)$aCount['c'];
} catch (Exception $e) {}

// Detail journey view for single session
$selected_session = $_GET['session'] ?? null;
$session_events = [];
$session_chat = [];
if ($selected_session) {
    $eStmt = $pdo->prepare("SELECT * FROM visitor_events WHERE session_id = ? ORDER BY id ASC");
    $eStmt->execute([$selected_session]);
    $session_events = $eStmt->fetchAll(PDO::FETCH_ASSOC);

    $cStmt = $pdo->prepare("SELECT * FROM chat_messages WHERE session_id = ? ORDER BY id ASC");
    $cStmt->execute([$selected_session]);
    $session_chat = $cStmt->fetchAll(PDO::FETCH_ASSOC);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nexalogic Portal - Leads & User Journeys</title>
    <style>
        * { box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0a0a0c; color: #f3f4f6; margin: 0; padding: 24px; line-height: 1.5; }
        .container { max-width: 1350px; margin: 0 auto; }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #262626; padding-bottom: 20px; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
        .title h1 { margin: 0; font-size: 24px; color: #ffffff; display: flex; align-items: center; gap: 10px; }
        .db-badge { background: #1f2937; color: #f59e0b; border: 1px solid #f59e0b44; font-size: 11px; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; font-weight: bold; }
        .title p { margin: 4px 0 0; color: #9ca3af; font-size: 13px; }
        .btn { display: inline-flex; align-items: center; gap: 8px; background: #f59e0b; color: #0a0a0a; text-decoration: none; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-size: 13px; transition: background 0.2s; }
        .btn:hover { background: #fbbf24; }
        
        .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-bottom: 24px; }
        .kpi-card { background: #141419; border: 1px solid #26262b; border-radius: 12px; padding: 16px 20px; }
        .kpi-card .val { font-size: 26px; font-weight: 800; color: #fff; margin-top: 4px; }
        .kpi-card .lbl { font-size: 12px; font-weight: 600; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.5px; }

        .tabs { display: flex; gap: 8px; margin-bottom: 16px; border-bottom: 1px solid #262626; padding-bottom: 8px; }
        .tab-btn { background: #16161a; color: #9ca3af; border: 1px solid #262626; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600; text-decoration: none; }
        .tab-btn.active { background: #f59e0b; color: #000; border-color: #f59e0b; }

        .table-wrap { overflow-x: auto; background: #121216; border: 1px solid #262626; border-radius: 12px; margin-bottom: 30px; }
        table { width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; }
        th { background: #18181e; color: #9ca3af; padding: 12px 16px; border-bottom: 1px solid #262626; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; }
        td { padding: 14px 16px; border-bottom: 1px solid #1f2026; vertical-align: top; }
        tr:hover td { background: #191920; }
        .badge { background: #1e1e24; color: #f59e0b; border: 1px solid #3b3b44; padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: bold; }
        .msg-cell { max-width: 400px; white-space: pre-wrap; word-break: break-word; color: #e5e7eb; }
        a.contact-link { color: #f59e0b; text-decoration: none; }
        a.contact-link:hover { text-decoration: underline; }

        /* Timeline for journey inspect */
        .timeline-box { background: #16161d; border: 1px solid #f59e0b44; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
        .timeline-box h3 { margin-top: 0; color: #f59e0b; }
        .timeline-item { border-left: 2px solid #f59e0b; padding-left: 14px; margin-bottom: 12px; position: relative; }
        .timeline-item::before { content:''; position: absolute; left: -6px; top: 4px; width: 10px; height: 10px; border-radius: 50%; background: #f59e0b; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="title">
                <h1>Nexalogic Leads & User Journey Portal <span class="db-badge"><?php echo strtoupper($db_driver); ?> ENGINE</span></h1>
                <p>Real-time database tracking for client inquiries, orders, and visitor journey analytics.</p>
            </div>
            <div>
                <a href="?key=<?php echo htmlspecialchars($provided_key); ?>&action=export" class="btn">
                    📥 Download Leads CSV
                </a>
            </div>
        </div>

        <!-- KPI Metrics -->
        <div class="kpi-grid">
            <div class="kpi-card">
                <div class="lbl">Total Leads</div>
                <div class="val"><?php echo $stats['total_leads']; ?></div>
            </div>
            <div class="kpi-card">
                <div class="lbl">Unique Visitors Tracked</div>
                <div class="val"><?php echo $stats['total_visitors']; ?></div>
            </div>
            <div class="kpi-card">
                <div class="lbl">Total Pageviews</div>
                <div class="val"><?php echo $stats['total_pageviews']; ?></div>
            </div>
            <div class="kpi-card">
                <div class="lbl">Active Visitors (24h)</div>
                <div class="val"><?php echo $stats['active_24h']; ?></div>
            </div>
        </div>

        <!-- Session Journey Inspector Modal / Panel -->
        <?php if ($selected_session): ?>
            <div class="timeline-box">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <h3>🔍 Visitor Journey Timeline for Session: <code><?php echo htmlspecialchars($selected_session); ?></code></h3>
                    <a href="?key=<?php echo htmlspecialchars($provided_key); ?>" style="color:#9ca3af; text-decoration:none;">✕ Close Inspector</a>
                </div>
                <p style="color:#9ca3af; font-size:12px; margin-bottom:16px;">Auto-pruned after 30 days to optimize storage.</p>
                
                <?php if (empty($session_events)): ?>
                    <p style="color:#6b7280;">No granular events logged for this session yet.</p>
                <?php else: ?>
                    <?php foreach ($session_events as $ev): ?>
                        <div class="timeline-item">
                            <span style="font-size:11px; color:#9ca3af;"><?php echo htmlspecialchars($ev['created_at']); ?></span> &bull; 
                            <strong style="color:#fff;"><?php echo htmlspecialchars($ev['event_type']); ?></strong> on 
                            <code style="color:#38bdf8;"><?php echo htmlspecialchars($ev['page_url']); ?></code>
                            <?php if (!empty($ev['event_data'])): ?>
                                <div style="font-size:12px; color:#cbd5e1; margin-top:2px;"><?php echo htmlspecialchars($ev['event_data']); ?></div>
                            <?php endif; ?>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>

                <?php if (!empty($session_chat)): ?>
                    <h4 style="color:#f59e0b; margin-top:20px;">💬 Chatbot Interaction History</h4>
                    <div style="background:#0f0f14; border:1px solid #26262b; border-radius:8px; padding:12px;">
                        <?php foreach ($session_chat as $c): ?>
                            <div style="margin-bottom:8px; font-size:13px;">
                                <strong style="color:<?php echo $c['sender'] === 'visitor' ? '#38bdf8' : '#f59e0b'; ?>;"><?php echo ucfirst($c['sender']); ?>:</strong>
                                <span><?php echo htmlspecialchars($c['message']); ?></span>
                                <span style="font-size:10px; color:#64748b;">(<?php echo $c['created_at']; ?>)</span>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <!-- SECTION 1: INQUIRIES & LEADS -->
        <h2 style="font-size:18px; color:#fff; margin-bottom:12px; display:flex; align-items:center; gap:8px;">
            📩 Leads & Client Inquiries (Permanent Storage)
        </h2>
        <div class="table-wrap">
            <?php if (empty($leads)): ?>
                <div style="padding:40px; text-align:center; color:#6b7280;">No leads recorded yet.</div>
            <?php else: ?>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Time</th>
                            <th>Visitor</th>
                            <th>Contact</th>
                            <th>Source</th>
                            <th>Details & Message</th>
                            <th>Journey</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($leads as $l): ?>
                            <tr>
                                <td><span class="badge">#<?php echo htmlspecialchars($l['id']); ?></span></td>
                                <td style="white-space:nowrap; color:#9ca3af; font-size:12px;"><?php echo htmlspecialchars($l['created_at']); ?></td>
                                <td><strong><?php echo htmlspecialchars($l['name']); ?></strong></td>
                                <td>
                                    <?php if (!empty($l['email'])): ?>
                                        <div>✉️ <a href="mailto:<?php echo htmlspecialchars($l['email']); ?>" class="contact-link"><?php echo htmlspecialchars($l['email']); ?></a></div>
                                    <?php endif; ?>
                                    <?php if (!empty($l['phone'])): ?>
                                        <div>📞 <a href="https://wa.me/<?php echo preg_replace('/[^0-9]/', '', $l['phone']); ?>" target="_blank" style="color:#10b981;"><?php echo htmlspecialchars($l['phone']); ?></a></div>
                                    <?php endif; ?>
                                    <?php if (!empty($l['telegram'])): ?>
                                        <div>✈️ <a href="https://t.me/<?php echo ltrim($l['telegram'], '@'); ?>" target="_blank" style="color:#60a5fa;">@<?php echo htmlspecialchars(ltrim($l['telegram'], '@')); ?></a></div>
                                    <?php endif; ?>
                                    <?php if (empty($l['email']) && empty($l['phone']) && empty($l['telegram'])): ?>
                                        <span style="color:#6b7280; font-style:italic;">Live Chat Browsing</span>
                                    <?php endif; ?>
                                </td>
                                <td><span style="color:#d1d5db; font-size:12px;"><?php echo htmlspecialchars($l['source']); ?></span></td>
                                <td class="msg-cell"><?php echo htmlspecialchars($l['message']); ?></td>
                                <td>
                                    <?php if (!empty($l['session_id'])): ?>
                                        <a href="?key=<?php echo htmlspecialchars($provided_key); ?>&session=<?php echo urlencode($l['session_id']); ?>" style="color:#38bdf8; font-size:12px; text-decoration:none;">View Path &rarr;</a>
                                    <?php else: ?>
                                        <span style="color:#6b7280; font-size:12px;">Direct</span>
                                    <?php endif; ?>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>

        <!-- SECTION 2: VISITOR USER JOURNEYS -->
        <h2 style="font-size:18px; color:#fff; margin-bottom:12px; display:flex; align-items:center; gap:8px;">
            🌐 Visitor Profiles & Live Journeys
        </h2>
        <div class="table-wrap">
            <?php if (empty($visitors)): ?>
                <div style="padding:40px; text-align:center; color:#6b7280;">No visitors tracked yet.</div>
            <?php else: ?>
                <table>
                    <thead>
                        <tr>
                            <th>Location</th>
                            <th>Device & OS</th>
                            <th>Landing Page</th>
                            <th>Referrer</th>
                            <th>Pageviews</th>
                            <th>Last Active</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($visitors as $v): ?>
                            <tr>
                                <td>
                                    <strong><?php echo htmlspecialchars($v['country']); ?></strong> 
                                    <span style="color:#9ca3af; font-size:11px;">(<?php echo htmlspecialchars($v['city']); ?>)</span>
                                    <div style="color:#64748b; font-size:11px;"><?php echo htmlspecialchars($v['isp']); ?></div>
                                </td>
                                <td>
                                    <div><?php echo htmlspecialchars($v['device']); ?></div>
                                    <span style="color:#64748b; font-size:11px;"><?php echo htmlspecialchars($v['browser']); ?> on <?php echo htmlspecialchars($v['os']); ?></span>
                                </td>
                                <td><code style="color:#38bdf8; font-size:12px;"><?php echo htmlspecialchars($v['landing_page']); ?></code></td>
                                <td style="color:#9ca3af; font-size:12px; max-width:200px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                                    <?php echo htmlspecialchars($v['referrer']); ?>
                                </td>
                                <td><span class="badge"><?php echo (int)$v['total_pageviews']; ?> pages</span></td>
                                <td style="color:#9ca3af; font-size:12px; white-space:nowrap;"><?php echo htmlspecialchars($v['last_seen']); ?></td>
                                <td>
                                    <a href="?key=<?php echo htmlspecialchars($provided_key); ?>&session=<?php echo urlencode($v['session_id']); ?>" style="color:#f59e0b; font-weight:600; font-size:12px; text-decoration:none;">
                                        Inspect Journey &rarr;
                                    </a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>
    </div>
</body>
</html>
