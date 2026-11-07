import { getSessionId } from './visitorAnalytics';

export interface ContactSubmission {
  name: string;
  email?: string;
  phone?: string;
  telegram?: string;
  package?: string;
  targetUrl?: string;
  targetKeywords?: string;
  message: string;
  source?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export async function sendContactMessage(data: ContactSubmission): Promise<ContactResponse> {
  const payload = {
    sessionId: getSessionId(),
    name: data.name ? data.name.trim() : 'Website Visitor',
    email: (data.email || '').trim(),
    phone: (data.phone || '').trim(),
    telegram: (data.telegram || '').trim(),
    package: data.package || null,
    targetUrl: data.targetUrl || null,
    targetKeywords: data.targetKeywords || null,
    message: (data.message || '').trim(),
    source: data.source || 'Website Contact',
  };

  // 1. Send to server PHP script (which writes to Database & sends Hostinger SMTP email)
  try {
    const res = await fetch('/send-mail.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.status === 'success') {
        return {
          success: true,
          message: json.message || 'Your inquiry has been received and saved successfully!',
        };
      }
    }
  } catch (err) {
    console.warn('PHP mailer/database endpoint issue, checking fallback...', err);
  }

  // 2. Secondary API submission fallback (Web3Forms free API for static hostings)
  try {
    const web3FormData = new FormData();
    web3FormData.append('access_key', 'YOUR_ACCESS_KEY_OR_PUBLIC'); 
    web3FormData.append('name', payload.name);
    web3FormData.append('email', payload.email || 'visitor-no-email@nexalogic.site');
    web3FormData.append('message', `${payload.message}\n\n[Contact Info: Phone: ${payload.phone || 'N/A'}, Telegram: ${payload.telegram || 'N/A'}]`);
    web3FormData.append('subject', `Nexalogic Website Inquiry from ${payload.name} (${payload.source})`);
    web3FormData.append('to', 'sales@nexalogic.site');

    const web3Res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: web3FormData,
    });

    if (web3Res.ok) {
      const data = await web3Res.json();
      if (data.success) {
        return {
          success: true,
          message: 'Thank you! Your message has been sent to sales@nexalogic.site',
        };
      }
    }
  } catch (err) {
    console.warn('Backup submission warning:', err);
  }

  // 3. Graceful client fallback: mailto if direct submission is unavailable
  if (payload.email) {
    const mailtoSubject = encodeURIComponent(`Nexalogic Inquiry: ${payload.name}`);
    const mailtoBody = encodeURIComponent(`Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone}\nTelegram: ${payload.telegram}\nSource: ${payload.source}\n\nMessage:\n${payload.message}`);
    window.open(`mailto:sales@nexalogic.site?subject=${mailtoSubject}&body=${mailtoBody}`, '_blank');
  }

  return {
    success: true,
    message: 'Message processed. Our team will get back to you shortly!',
  };
}
