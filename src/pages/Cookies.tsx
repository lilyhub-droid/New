import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Cookies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Cookie Notice</h1>
          <p className="text-center text-muted-foreground mb-12">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>What Are Cookies?</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
                  They help us provide you with a better experience by remembering your preferences and analyzing how you use our site.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Types of Cookies We Use</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <h4>Essential Cookies</h4>
                <p>
                  These cookies are necessary for the website to function properly. They enable basic functions like 
                  page navigation and access to secure areas of the website.
                </p>
                
                <h4>Analytics Cookies</h4>
                <p>
                  We use Google Analytics to understand how visitors interact with our website. These cookies help us 
                  improve our content and user experience.
                </p>
                
                <h4>Preference Cookies</h4>
                <p>
                  These cookies remember your preferences, such as your preferred language or theme (light/dark mode).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Third-Party Cookies</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>We may use third-party services that place cookies on your device:</p>
                <ul>
                  <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                  <li><strong>Google reCAPTCHA:</strong> For spam protection on forms</li>
                  <li><strong>EmailJS:</strong> For contact form functionality</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Managing Cookies</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  You can control and manage cookies in several ways:
                </p>
                <ul>
                  <li>Through your browser settings - most browsers allow you to refuse or accept cookies</li>
                  <li>By using browser add-ons that block tracking cookies</li>
                  <li>By opting out of Google Analytics through their opt-out browser add-on</li>
                </ul>
                <p>
                  Please note that disabling cookies may affect the functionality of our website.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cookie Retention</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  Different cookies have different lifespans:
                </p>
                <ul>
                  <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
                  <li><strong>Persistent cookies:</strong> Remain on your device for a set period or until manually deleted</li>
                  <li><strong>Analytics cookies:</strong> Typically expire after 2 years</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Updates to This Notice</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  We may update this Cookie Notice from time to time to reflect changes in our practices or for legal reasons. 
                  Please check this page periodically for updates.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  If you have any questions about our use of cookies, please contact us at:
                </p>
                <p>
                  Email: privacy@example.com<br />
                  Address: [Your Address]
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cookies;