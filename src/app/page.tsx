'use client';

import { useState } from 'react';
import WebsiteBuilder from '@/components/WebsiteBuilder';
import WebsitePreview from '@/components/WebsitePreview';
import { WebsiteData } from '@/types';

export default function Home() {
  const [generatedWebsite, setGeneratedWebsite] = useState<WebsiteData | null>(null);

  const handleWebsiteGenerated = (data: WebsiteData) => {
    setGeneratedWebsite(data);
  };

  const handleBack = () => {
    setGeneratedWebsite(null);
  };

  return (
    <main className="min-h-screen">
      {generatedWebsite ? (
        <WebsitePreview websiteData={generatedWebsite} onBack={handleBack} />
      ) : (
        <WebsiteBuilder onGenerate={handleWebsiteGenerated} />
      )}
    </main>
  );
}
