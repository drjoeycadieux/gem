'use client';

import { Globe, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative mt-20 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400 rounded-full blur-xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-400 rounded-full blur-xl"></div>
            </div>

            <div className="relative max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {/* Logo and Description */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                                <Globe className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold">AI Website Builder</h3>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                            Create stunning websites with the power of artificial intelligence.
                            Transform your ideas into reality in seconds.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-lg flex items-center space-x-2">
                            <Sparkles className="h-5 w-5 text-purple-400" />
                            <span>Features</span>
                        </h4>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                                <span>AI-Powered Generation</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                                <span>Responsive Design</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-pink-400 rounded-full"></div>
                                <span>Multiple Styles</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                                <span>Instant Export</span>
                            </li>
                        </ul>
                    </div>

                    {/* Technologies */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Powered By</h4>
                        <div className="flex flex-wrap gap-3">
                            <span className="px-3 py-1 bg-white/10 rounded-full text-sm backdrop-blur-sm border border-white/20">
                                Next.js 15
                            </span>
                            <span className="px-3 py-1 bg-white/10 rounded-full text-sm backdrop-blur-sm border border-white/20">
                                TypeScript
                            </span>
                            <span className="px-3 py-1 bg-white/10 rounded-full text-sm backdrop-blur-sm border border-white/20">
                                Tailwind CSS
                            </span>
                            <span className="px-3 py-1 bg-white/10 rounded-full text-sm backdrop-blur-sm border border-white/20">
                                Google Gemini
                            </span>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                {/* Bottom row */}
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    <p className="text-gray-300 text-sm flex items-center space-x-2">
                        <span>&copy; {currentYear} AI Website Builder. Made with</span>
                        <Heart className="h-4 w-4 text-red-400 fill-current animate-pulse" />
                        <span>and AI</span>
                    </p>

                    <div className="flex items-center space-x-6 text-sm text-gray-300">
                        <a href="#" className="hover:text-white transition-colors hover:underline">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-white transition-colors hover:underline">
                            Terms of Service
                        </a>
                        <a href="#" className="hover:text-white transition-colors hover:underline">
                            Support
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
