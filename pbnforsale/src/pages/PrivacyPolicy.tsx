import { useEffect } from 'react';

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Privacy Policy - Nexalogic Technologies';
    const desc = document.querySelector("meta[name='description']");
    if (desc) {
      desc.setAttribute('content', 'Read our Privacy Policy for Nexalogic Technologies, covering data collection, usage and protection practices for our SEO services.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 text-gray-200 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
        <p className="mb-4">
          At Nexalogic Technologies, we value your privacy. This Privacy Policy outlines the types of
          personal information we collect, how we use it, and how we protect it. Our commitment is to
          handle your data in a secure and transparent manner.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
        <p className="mb-4">
          We may collect information that you voluntarily provide when contacting us, placing an
          order, or subscribing to our newsletter. This can include your name, email address, and
          other contact details.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
        <p className="mb-4">
          The data collected is used to respond to your inquiries, process orders, and improve our
          services. We may also use your email to send updates about our SEO packages and other
          relevant news.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
        <p className="mb-4">
          We implement appropriate security measures to protect your information from unauthorized
          access, disclosure, or alteration. However, no method of transmission over the internet is
          completely secure.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
        <p className="mb-4">
          We reserve the right to update this Privacy Policy as necessary. Any changes will be posted
          on this page with a revised effective date.
        </p>
        <p className="mt-8">
          If you have questions about our privacy practices, please contact us at{' '}
          <a href="mailto:sales@nexalogic.site" className="text-gold-500 hover:underline">
            sales@nexalogic.site
          </a>.
        </p>
      </div>
    </div>
  );
}
