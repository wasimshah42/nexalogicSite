export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  source?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export async function sendContactMessage(data: ContactSubmission): Promise<ContactResponse> {
  const payload = {
    name: data.name.trim() || 'Website Visitor',
    email: data.email.trim(),
    message: data.message.trim(),
    source: data.source || 'Contact Form',
  };

  // 1. Try server PHP script (for Hostinger / Apache / Nginx setups)
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
          message: json.message || 'Your message was sent successfully to sales@nexalogic.site!',
        };
      }
    }
  } catch (err) {
    console.warn('PHP mailer endpoint unavailable, trying web submission fallback...', err);
  }

  // 2. Secondary API submission fallback (Web3Forms free API for static hostings)
  try {
    const web3FormData = new FormData();
    // Using Web3Forms public endpoint with sales@nexalogic.site email target
    web3FormData.append('access_key', 'YOUR_ACCESS_KEY_OR_PUBLIC'); 
    web3FormData.append('name', payload.name);
    web3FormData.append('email', payload.email);
    web3FormData.append('message', payload.message);
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
    console.warn('Web3Forms backup submission error:', err);
  }

  // 3. Graceful client fallback: trigger mailto link as direct option if automated APIs fail
  const mailtoSubject = encodeURIComponent(`Nexalogic Inquiry: ${payload.name}`);
  const mailtoBody = encodeURIComponent(`Name: ${payload.name}\nEmail: ${payload.email}\nSource: ${payload.source}\n\nMessage:\n${payload.message}`);
  
  // Return success with mailto trigger fallback
  window.open(`mailto:sales@nexalogic.site?subject=${mailtoSubject}&body=${mailtoBody}`, '_blank');

  return {
    success: true,
    message: 'Opened your mail client to send to sales@nexalogic.site. You can also contact us via WhatsApp or Telegram!',
  };
}
