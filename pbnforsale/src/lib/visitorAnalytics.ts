/**
 * Nexalogic Technologies - Enterprise User Journey & Activity Tracker
 * Connects directly to MySQL / SQLite backend to track visitor paths, pageviews, and clicks.
 */

const SESSION_STORAGE_KEY = 'nx_session_id';

/**
 * Get or create a persistent visitor session ID
 */
export function getSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!sessionId) {
    const randomPart = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    sessionId = 'nx_' + Date.now().toString(36) + '_' + randomPart;
    localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  }
  return sessionId;
}

function getDeviceType(): string {
  const ua = navigator.userAgent;
  if (/mobile/i.test(ua)) {
    if (/android/i.test(ua)) return 'Android Mobile';
    if (/iphone|ipad|ipod/i.test(ua)) return 'iOS Device';
    return 'Mobile Device';
  }
  if (/macintosh|mac os x/i.test(ua)) return 'Mac Desktop';
  if (/windows/i.test(ua)) return 'Windows PC';
  if (/linux/i.test(ua)) return 'Linux Device';
  return 'Desktop Browser';
}

function getBrowserName(): string {
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
  return 'Browser';
}

function getOSName(): string {
  const ua = navigator.userAgent;
  if (ua.includes('Mac OS')) return 'macOS';
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
  if (ua.includes('Linux')) return 'Linux';
  return 'OS';
}

interface GeoCache {
  country?: string;
  countryCode?: string;
  city?: string;
  isp?: string;
}

let cachedGeo: GeoCache | null = null;

async function fetchGeo(): Promise<GeoCache> {
  if (cachedGeo) return cachedGeo;
  try {
    const res = await fetch('https://ipwho.is/');
    if (res.ok) {
      const data = await res.json();
      cachedGeo = {
        country: data.country || 'Unknown',
        countryCode: data.country_code || '??',
        city: data.city || 'Unknown',
        isp: data.connection?.isp || data.connection?.org || 'Unknown',
      };
      return cachedGeo;
    }
  } catch {
    // Ignore geo lookup failure
  }
  return { country: 'Unknown', countryCode: '??', city: 'Unknown', isp: 'Unknown' };
}

/**
 * Dispatch an activity event to the database
 */
export async function trackUserEvent(
  eventType: 'page_view' | 'click' | 'scroll_section' | 'chat_open' | 'chat_message' | 'package_select' | 'form_submit',
  elementId?: string,
  eventData?: Record<string, any>
) {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('lighthouse') || ua.includes('headlesschrome')) {
    return;
  }

  const sessionId = getSessionId();
  const geo = await fetchGeo();

  const urlParams = new URLSearchParams(window.location.search);

  const payload = {
    sessionId,
    eventType,
    page: window.location.pathname + (window.location.hash || ''),
    elementId: elementId || null,
    eventData: eventData || null,
    country: geo.country,
    countryCode: geo.countryCode,
    city: geo.city,
    isp: geo.isp,
    device: getDeviceType(),
    browser: getBrowserName(),
    os: getOSName(),
    referrer: document.referrer || 'Direct / Bookmark',
    utmSource: urlParams.get('utm_source'),
    utmMedium: urlParams.get('utm_medium'),
    utmCampaign: urlParams.get('utm_campaign'),
  };

  try {
    await fetch('/track-activity.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // Silent fail if network unreachable
  }
}

/**
 * Initialize automated user journey tracking (pageviews & interactions)
 */
export async function initVisitorAnalytics() {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('lighthouse') || ua.includes('headlesschrome')) {
    return;
  }

  // 1. Initial Pageview
  await trackUserEvent('page_view', 'body', {
    title: document.title,
    screen: `${window.innerWidth}x${window.innerHeight}`,
  });

  // 2. Track Route / Hash changes
  let currentPath = window.location.pathname + window.location.hash;
  window.addEventListener('popstate', () => {
    const newPath = window.location.pathname + window.location.hash;
    if (newPath !== currentPath) {
      currentPath = newPath;
      trackUserEvent('page_view', 'route_change', { path: newPath });
    }
  });

  // 3. Track CTA and Package Clicks automatically
  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement)?.closest('a, button');
    if (!target) return;

    const href = target.getAttribute('href') || '';
    const text = (target.textContent || '').trim().slice(0, 50);

    if (
      href.includes('#packages') ||
      href.includes('#contact') ||
      href.includes('mailto:') ||
      href.includes('t.me') ||
      href.includes('wa.me') ||
      target.getAttribute('aria-label')?.includes('chat')
    ) {
      trackUserEvent('click', target.id || target.className || 'button', {
        text,
        href,
      });
    }
  });
}
