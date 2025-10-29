import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Terms of Service</h1>
          <p className="text-center text-muted-foreground mb-12">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Agreement to Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ministry Resources Provided</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>ELOHIM'S provides:</p>
                <ul>
                  <li>Spiritual books and teaching materials</li>
                  <li>Video and audio teachings</li>
                  <li>Bible study resources</li>
                  <li>Upper Room fellowship community</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>When using our services, you agree to:</p>
                <ul>
                  <li>Provide accurate and truthful information</li>
                  <li>Use our services for lawful purposes only</li>
                  <li>Respect intellectual property rights</li>
                  <li>Maintain confidentiality of sensitive information shared during consultations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  All content on this website, including text, graphics, logos, and images, is the property of 
                  ELOHIM'S ministry and is protected by copyright laws. You may freely share our content for ministry 
                  purposes, but commercial use requires explicit written permission.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  Our services are provided "as is" without warranties of any kind. We shall not be liable for any 
                  indirect, incidental, special, or consequential damages arising from the use of our services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Termination</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  We reserve the right to terminate or suspend access to our services at any time, without prior notice, 
                  for conduct that we believe violates these Terms of Service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon 
                  posting on this website. Your continued use of the service constitutes acceptance of the modified terms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  For questions about these Terms of Service, please reach out through our contact page or social media channels.
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

export default Terms;