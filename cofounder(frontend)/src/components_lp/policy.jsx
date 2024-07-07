// src/components/PrivacyPolicy.js
import React from 'react';

const Policy = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="textxl font-bold text-gray-600 mb-2">Last Updated: 07-07-2024</p>
      <p className="mb-4">
        At LetsCoFound, we respect your privacy and are committed to protecting the personal
        information you share with us. This Privacy Policy explains how we collect, use, and
        safeguard your information when you visit our website and use our services. By accessing or
        using LetsCoFound, you agree to the terms of this Privacy Policy.
      </p>

      <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Personal Information:</strong> When you register for an account, use our services, or contact
          us, we may collect personal information such as your name, email address, phone
          number, and other contact details.
        </li>
        <li><strong>Usage Data:</strong> We collect information about how you interact with our website and
          services, including your IP address, browser type, operating system, pages visited, and
          the date and time of your visits.
        </li>
        <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking
          technologies to collect information about your use of our website and improve your
          experience.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4">
        <li><strong>To Provide and Improve Our Services:</strong> We use your information to deliver the
          services you request, enhance your experience, and improve our website and services.
        </li>
        <li><strong>To Communicate with You:</strong> We may use your contact information to send you
          updates, newsletters, marketing materials, and other information related to
          LetsCoFound. You can opt out of receiving these communications at any time.
        </li>
        <li><strong>To Ensure Security:</strong> We use your information to protect the security and integrity of
          our website and services.
        </li>
        <li><strong>To Comply with Legal Obligations:</strong> We may use your information to comply with
          applicable laws, regulations, and legal processes.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">3. Sharing Your Information</h2>
      <p className="mb-4">
        We do not sell, trade, or otherwise transfer your personal information to third parties except
        in the following circumstances:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Service Providers:</strong> We may share your information with trusted third-party service
          providers who assist us in operating our website, conducting our business, or
          providing services to you.
        </li>
        <li><strong>Legal Requirements:</strong> We may disclose your information if required by law or in
          response to a valid legal request.
        </li>
        <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or a portion of
          our assets, your information may be transferred to the new owner.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
      <p className="mb-4">
        We implement appropriate technical and organizational measures to protect your personal
        information from unauthorized access, use, or disclosure. However, no method of
        transmission over the internet or electronic storage is completely secure, and we cannot
        guarantee absolute security.
      </p>

      <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
      <p className="mb-4">You have the following rights regarding your personal information:</p>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Access:</strong> You can request access to the personal information we hold about you.</li>
        <li><strong>Correction:</strong> You can request that we correct any inaccurate or incomplete
          information.
        </li>
        <li><strong>Deletion:</strong> You can request that we delete your personal information, subject to certain
          exceptions.
        </li>
        <li><strong>Opt-Out:</strong> You can opt out of receiving marketing communications from us at any
          time.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">6. Third-Party Links</h2>
      <p className="mb-4">
        Our website may contain links to third-party websites. We are not responsible for the privacy
        practices or content of these websites. We encourage you to read the privacy policies of any
        third-party websites you visit.
      </p>

      <h2 className="text-2xl font-semibold mb-4">7. Changes to This Privacy Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. We will notify you of any changes by
        posting the new Privacy Policy on our website. Your continued use of LetsCoFound after the
        changes take effect constitutes your acceptance of the updated Privacy Policy.
      </p>

      <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, please contact us at:
      </p>
      <p className="mt-2">
        <strong>LetsCoFound</strong><br />
        Email: <a href="mailto:letscofoundglobal@gmail.com" className="text-blue-600 underline">letscofoundglobal@gmail.com</a><br />
        Phone: <a href="tel:7974644249" className="text-blue-600 underline">7974644249</a>
      </p>
    </div>
  );
};

export default Policy;
