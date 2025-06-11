'use client';

import { useState } from 'react';
import { WebsiteData } from '@/types';
import { Eye, Code, Download, Edit, ArrowLeft, Monitor, Tablet, Smartphone } from 'lucide-react';

interface WebsitePreviewProps {
    websiteData: WebsiteData;
    onBack: () => void;
}

export default function WebsitePreview({ websiteData, onBack }: WebsitePreviewProps) {
    const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
    const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

    const downloadHTML = () => {
        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${websiteData.title}</title>
    <meta name="description" content="${websiteData.description}">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        ${websiteData.css || ''}
        body {
            font-family: ${websiteData.theme.fontFamily};
            color: ${websiteData.theme.textColor};
            background-color: ${websiteData.theme.backgroundColor};
        }
    </style>
</head>
<body>
    ${websiteData.html}
</body>
</html>
    `.trim();

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${websiteData.title.toLowerCase().replace(/\s+/g, '-')}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const getDeviceWidth = () => {
        switch (deviceMode) {
            case 'mobile': return 'w-80';
            case 'tablet': return 'w-[768px]';
            default: return 'w-full';
        }
    };

    const getDeviceHeight = () => {
        switch (deviceMode) {
            case 'mobile': return 'h-[600px]';
            case 'tablet': return 'h-[800px]';
            default: return 'h-[800px]';
        }
    }; return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 px-6 py-4 shadow-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={onBack}
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-all duration-200 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl font-medium"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span>Back to Builder</span>
                        </button>
                        <div className="h-6 w-px bg-gray-300" />
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                                <Eye className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">{websiteData.title}</h1>
                                <p className="text-sm text-gray-500">Generated Website Preview</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Device Mode Toggle */}
                        <div className="flex items-center space-x-1 bg-gray-100/80 backdrop-blur-sm rounded-xl p-1 shadow-md">
                            <button
                                onClick={() => setDeviceMode('desktop')}
                                className={`p-3 rounded-lg transition-all duration-200 ${deviceMode === 'desktop' ? 'bg-white shadow-lg text-blue-600 scale-105' : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                                    }`}
                            >
                                <Monitor className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setDeviceMode('tablet')}
                                className={`p-3 rounded-lg transition-all duration-200 ${deviceMode === 'tablet' ? 'bg-white shadow-lg text-blue-600 scale-105' : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                                    }`}
                            >
                                <Tablet className="h-5 w-5" />
                            </button>                            <button
                                onClick={() => setDeviceMode('mobile')}
                                className={`p-3 rounded-lg transition-all duration-200 ${deviceMode === 'mobile' ? 'bg-white shadow-lg text-blue-600 scale-105' : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                                    }`}
                            >
                                <Smartphone className="h-5 w-5" />
                            </button>
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex items-center space-x-1 bg-gray-100/80 backdrop-blur-sm rounded-xl p-1 shadow-md">
                            <button
                                onClick={() => setViewMode('preview')}
                                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${viewMode === 'preview' ? 'bg-white shadow-lg text-blue-600 scale-105' : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                                    }`}
                            >
                                <Eye className="h-4 w-4" />
                                <span className="font-medium">Preview</span>
                            </button>
                            <button
                                onClick={() => setViewMode('code')}
                                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${viewMode === 'code' ? 'bg-white shadow-lg text-blue-600 scale-105' : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                                    }`}
                            >                                <Code className="h-4 w-4" />
                                <span className="font-medium">Code</span>
                            </button>
                        </div>

                        <button
                            onClick={downloadHTML}
                            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                        >
                            <Download className="h-5 w-5" />
                            <span>Download</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {viewMode === 'preview' ? (
                    <div className="flex justify-center">
                        <div className={`${getDeviceWidth()} ${getDeviceHeight()} bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50`}>
                            <iframe
                                srcDoc={`
                  <!DOCTYPE html>
                  <html lang="en">
                  <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>${websiteData.title}</title>
                      <script src="https://cdn.tailwindcss.com"></script>
                      <style>
                          ${websiteData.css || ''}
                          body {
                              font-family: ${websiteData.theme.fontFamily};
                              color: ${websiteData.theme.textColor};
                              background-color: ${websiteData.theme.backgroundColor};
                              margin: 0;
                              padding: 0;
                          }
                      </style>
                  </head>
                  <body>
                      ${websiteData.html}
                  </body>
                  </html>
                `}
                                className="w-full h-full border-0"
                                title="Website Preview"
                            />
                        </div>
                    </div>) : (
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50">
                            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
                                <div className="flex items-center space-x-3">
                                    <Code className="h-6 w-6" />
                                    <h3 className="text-xl font-bold">Generated HTML Code</h3>
                                    <div className="ml-auto text-sm bg-white/20 px-3 py-1 rounded-full">
                                        Ready to deploy
                                    </div>
                                </div>
                            </div>
                            <div className="p-8">
                                <pre className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl overflow-x-auto text-sm border border-gray-200">
                                    <code className="text-gray-800 leading-relaxed">{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${websiteData.title}</title>
    <meta name="description" content="${websiteData.description}">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        ${websiteData.css || ''}
        body {
            font-family: ${websiteData.theme.fontFamily};
            color: ${websiteData.theme.textColor};
            background-color: ${websiteData.theme.backgroundColor};
        }
    </style>
</head>
<body>
${websiteData.html}
</body>
</html>`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
