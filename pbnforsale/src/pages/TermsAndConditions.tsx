import { useEffect } from 'react';

export default function TermsAndConditions() {
  useEffect(() => {
    document.title = 'Terms and Conditions - Nexalogic Technologies';
    const desc = document.querySelector("meta[name='description']");
    if (desc) {
      desc.setAttribute('content', 'Review the Terms and Conditions for using Nexalogic Technologies, including service usage, pricing, and liability.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 text-gray-200 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Terms and Conditions</h1>
        <p className="mb-4">
          Welcome to Nexalogic Technologies. By accessing or using our website, you agree to comply with
          and be bound by these Terms and Conditions. These terms outline the rules and regulations
          for using our services, including backlink packages and SEO consultations.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Use of Services</h2>
        <p className="mb-4">
          You must agree not to misuse our services or engage in any activity that could harm the
          integrity of our network. We reserve the right to refuse service or cancel orders at our
          discretion.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Pricing and Payment</h2>
        <p className="mb-4">
          All package prices are listed on our website. Payments are processed securely. Refunds are
          subject to our money-back guarantee terms.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Intellectual Property</h2>
        <p className="mb-4">
          All content, design, and materials on this site are the property of Nexalogic Technologies and
          are protected by copyright laws. You may not reproduce or redistribute any material without
          our permission.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
        <p className="mb-4">
          We are not liable for any indirect, incidental, or consequential damages arising from the
          use of our services. Our liability is limited to the amount paid for services through our
          site.
        </p>
        <p className="mt-8">
          If you have questions regarding these terms, please contact us at{' '}
          <a href="mailto:sales@nexalogic.site" className="text-gold-500 hover:underline">
            sales@nexalogic.site
          </a>.
        </p>
      </div>
    </div>
  );
}
