
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="p-4 flex justify-start items-center">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">Privacy Policy</h1>
      </header>

      <div className="px-4 py-2 max-w-3xl mx-auto">
        <div className="prose prose-sm dark:prose-invert">
          <h2>Privacy Policy for Backchannel</h2>
          <p>Last Updated: May 9, 2025</p>
          
          <h3>1. Introduction</h3>
          <p>Welcome to Backchannel. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.</p>
          
          <h3>2. Information We Collect</h3>
          <p>We may collect personal information that you provide directly, including:</p>
          <ul>
            <li>Contact information (name, email address, phone number)</li>
            <li>Professional details (job title, company, work history)</li>
            <li>Profile information and preferences</li>
            <li>Connection data (who you connect with in the app)</li>
          </ul>
          
          <h3>3. How We Use Your Information</h3>
          <p>We may use the information we collect for various purposes, including:</p>
          <ul>
            <li>Providing, maintaining, and improving our services</li>
            <li>Creating and managing your account</li>
            <li>Facilitating connections between users</li>
            <li>Sending notifications related to your account</li>
          </ul>
          
          <h3>4. Sharing Your Information</h3>
          <p>We may share information as follows:</p>
          <ul>
            <li>With other users as part of the core functionality of the service</li>
            <li>With service providers who perform services on our behalf</li>
            <li>If required by law or to protect rights and safety</li>
          </ul>
          
          <h3>5. Data Security</h3>
          <p>We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
          
          <h3>6. Your Rights</h3>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access and receive a copy of your personal data</li>
            <li>Rectify inaccurate personal data</li>
            <li>Request deletion of your personal data</li>
            <li>Restrict processing of your personal data</li>
          </ul>
          
          <h3>7. Account Deletion</h3>
          <p>You can delete your account at any time through the Account Settings. When you delete your account, all of your personal information will be removed from our active databases.</p>
          
          <h3>8. Changes to This Privacy Policy</h3>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
          
          <h3>9. Contact Us</h3>
          <p>If you have questions about this Privacy Policy, please contact us at privacy@backchannel.example.com.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
