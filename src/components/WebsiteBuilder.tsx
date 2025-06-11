'use client';

import { useState } from 'react';
import { Wand2, Loader2, Globe, Palette, Code, Sparkles, Zap } from 'lucide-react';
import { GenerationRequest, WebsiteData } from '@/types';
import { GenerationProgress } from './LoadingComponents';
import Footer from './Footer';

interface WebsiteBuilderProps {
    onGenerate: (data: WebsiteData) => void;
}

export default function WebsiteBuilder({ onGenerate }: WebsiteBuilderProps) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationStage, setGenerationStage] = useState<'analyzing' | 'generating' | 'formatting' | 'complete'>('analyzing');
    const [formData, setFormData] = useState<GenerationRequest>({
        prompt: '',
        businessType: '',
        style: 'modern',
        features: []
    });
    const [error, setError] = useState<string | null>(null);

    const businessTypes = [
        'Restaurant', 'E-commerce', 'Portfolio', 'Blog', 'Corporate',
        'Healthcare', 'Education', 'Real Estate', 'Technology', 'Creative Agency'
    ];

    const styles = [
        { value: 'modern', label: 'Modern', description: 'Clean lines, bold typography, contemporary feel', color: 'from-blue-500 to-cyan-500' },
        { value: 'classic', label: 'Classic', description: 'Timeless design, elegant typography, traditional layout', color: 'from-amber-500 to-orange-500' },
        { value: 'minimal', label: 'Minimal', description: 'Simple, clean, lots of white space', color: 'from-gray-500 to-slate-500' },
        { value: 'creative', label: 'Creative', description: 'Artistic, unique layouts, experimental design', color: 'from-purple-500 to-pink-500' },
        { value: 'professional', label: 'Professional', description: 'Business-focused, formal, trustworthy', color: 'from-indigo-500 to-blue-500' }
    ];

    const availableFeatures = [
        'Contact Form', 'Image Gallery', 'Testimonials', 'Social Media Links',
        'Newsletter Signup', 'Blog Section', 'Product Showcase', 'Team Section',
        'FAQ Section', 'Pricing Tables', 'Video Integration', 'Maps Integration'
    ];

    const handleFeatureToggle = (feature: string) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.includes(feature)
                ? prev.features.filter(f => f !== feature)
                : [...prev.features, feature]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsGenerating(true);
        setError(null);
        setGenerationStage('analyzing');

        try {
            // Simulate progress stages
            setTimeout(() => setGenerationStage('generating'), 1000);
            setTimeout(() => setGenerationStage('formatting'), 3000);

            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Failed to generate website');
            }

            setGenerationStage('complete');
            setTimeout(() => onGenerate(result.data), 500);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsGenerating(false);
        }
    }; return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-6xl mx-auto p-6 space-y-8">
                {/* Header */}
                <div className="text-center space-y-6 py-12">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-10 animate-pulse"></div>
                        </div>
                        <div className="relative flex items-center justify-center space-x-3">
                            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg animate-bounce">
                                <Globe className="h-8 w-8 text-white" />
                            </div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                AI Website Builder
                            </h1>
                        </div>
                    </div>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                        Transform your ideas into stunning websites with the power of AI.
                        <span className="text-purple-600 font-semibold"> Just describe what you need!</span>
                    </p>
                    <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
                        <div className="flex items-center space-x-2 bg-white/70 rounded-full px-4 py-2 backdrop-blur-sm">
                            <Sparkles className="w-4 h-4 text-green-500" />
                            <span>AI-Powered</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-white/70 rounded-full px-4 py-2 backdrop-blur-sm">
                            <Zap className="w-4 h-4 text-blue-500" />
                            <span>Lightning Fast</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-white/70 rounded-full px-4 py-2 backdrop-blur-sm">
                            <Code className="w-4 h-4 text-purple-500" />
                            <span>Export Ready</span>
                        </div>
                    </div>                </div>

                {/* Features Showcase */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                            <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">AI-Powered</h3>
                        <p className="text-gray-600">Advanced AI understands your vision and creates professional websites tailored to your needs.</p>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                            <Zap className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Lightning Fast</h3>
                        <p className="text-gray-600">Generate complete websites in seconds, not hours. From concept to completion in under a minute.</p>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4">
                            <Code className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Export Ready</h3>
                        <p className="text-gray-600">Download clean, optimized HTML files ready for hosting on any platform or server.</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Prompt Section */}
                    <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl p-8 space-y-6 hover:shadow-2xl transition-all duration-500 hover:bg-white/80">
                        <div className="flex items-center space-x-3">
                            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                                <Wand2 className="h-6 w-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Describe Your Vision</h2>
                            <div className="ml-auto text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">
                                Step 1 of 4
                            </div>
                        </div>
                        <div className="relative">
                            <textarea
                                value={formData.prompt}
                                onChange={(e) => setFormData(prev => ({ ...prev, prompt: e.target.value }))}
                                placeholder="Describe the website you want to create. Be specific about colors, layout, features, and style. For example: 'Create a modern restaurant website with warm colors, elegant typography, online menu with photos, reservation system, chef's story section, and customer testimonials.'"
                                className="w-full h-40 px-6 py-4 border-2 border-gray-200 rounded-2xl resize-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-gray-700 placeholder-gray-400 text-lg leading-relaxed shadow-inner"
                                required
                                maxLength={1000}
                            />
                            <div className="absolute bottom-4 right-4 text-sm text-gray-400 bg-white/80 rounded-lg px-2 py-1">
                                {formData.prompt.length}/1000
                            </div>
                        </div>
                    </div>

                    {/* Business Type */}
                    <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl p-8 space-y-6 hover:shadow-2xl transition-all duration-500 hover:bg-white/80">
                        <div className="flex items-center space-x-3">
                            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                                <Globe className="h-6 w-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Choose Your Industry</h2>
                            <div className="ml-auto text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                                Step 2 of 4
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {businessTypes.map(type => (
                                <label
                                    key={type}
                                    className={`relative group p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 text-center hover:scale-105 transform ${formData.businessType === type
                                            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-700 shadow-xl scale-105'
                                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-lg'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="businessType"
                                        value={type}
                                        checked={formData.businessType === type}
                                        onChange={(e) => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
                                        className="sr-only"
                                        required
                                    />
                                    <div className="font-semibold text-sm">{type}</div>
                                    {formData.businessType === type && (
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                    )}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Design Style */}
                    <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl p-8 space-y-6 hover:shadow-2xl transition-all duration-500 hover:bg-white/80">
                        <div className="flex items-center space-x-3">
                            <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl shadow-lg">
                                <Palette className="h-6 w-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Pick Your Style</h2>
                            <div className="ml-auto text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-full font-semibold">
                                Step 3 of 4
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {styles.map(style => (
                                <label
                                    key={style.value}
                                    className={`relative group p-6 border-2 rounded-3xl cursor-pointer transition-all duration-300 hover:scale-105 transform ${formData.style === style.value
                                            ? 'border-purple-500 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 shadow-2xl scale-105'
                                            : 'border-gray-200 hover:border-purple-300 hover:shadow-xl hover:bg-gradient-to-br hover:from-purple-50/50 hover:to-pink-50/50'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="style"
                                        value={style.value}
                                        checked={formData.style === style.value}
                                        onChange={(e) => setFormData(prev => ({ ...prev, style: e.target.value as any }))}
                                        className="sr-only"
                                    />
                                    <div className="space-y-4">
                                        <div className={`w-full h-3 rounded-full bg-gradient-to-r ${style.color} opacity-70`}></div>
                                        <h3 className={`font-bold text-lg ${formData.style === style.value ? 'text-purple-700' : 'text-gray-900'
                                            }`}>
                                            {style.label}
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">{style.description}</p>
                                    </div>
                                    {formData.style === style.value && (
                                        <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                                            <div className="w-3 h-3 bg-white rounded-full"></div>
                                        </div>
                                    )}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Features */}
                    <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl p-8 space-y-6 hover:shadow-2xl transition-all duration-500 hover:bg-white/80">
                        <div className="flex items-center space-x-3">
                            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg">
                                <Code className="h-6 w-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Select Features</h2>
                            <div className="ml-auto text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-semibold">
                                Step 4 of 4
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {availableFeatures.map(feature => (
                                <label
                                    key={feature}
                                    className={`relative p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 text-sm text-center hover:scale-105 transform ${formData.features.includes(feature)
                                            ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-700 shadow-lg scale-105'
                                            : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 hover:shadow-md'
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={formData.features.includes(feature)}
                                        onChange={() => handleFeatureToggle(feature)}
                                        className="sr-only"
                                    />
                                    <span className="font-medium">{feature}</span>
                                    {formData.features.includes(feature) && (
                                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-md">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                    )}
                                </label>
                            ))}
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Selected {formData.features.length} features
                            </p>
                        </div>
                    </div>

                    {/* Generation Progress */}
                    {isGenerating && (
                        <GenerationProgress stage={generationStage} />
                    )}

                    {/* Error Display */}
                    {error && (
                        <div className="bg-red-50/80 backdrop-blur-sm border-2 border-red-200 rounded-2xl p-6 shadow-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">!</span>
                                </div>
                                <p className="text-red-700 font-medium">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Generate Button */}
                    <div className="sticky bottom-6 z-10">
                        <button
                            type="submit"
                            disabled={isGenerating || !formData.prompt || !formData.businessType}
                            className={`w-full py-6 px-8 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl ${isGenerating || !formData.prompt || !formData.businessType
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transform hover:scale-105 active:scale-95'
                                } text-white`}
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                    <span>Creating Your Masterpiece...</span>
                                </>
                            ) : (
                                <>
                                    <Wand2 className="h-6 w-6" />
                                    <span>Generate My Website</span>
                                    <Sparkles className="h-6 w-6" />
                                </>
                            )}
                        </button>                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
}
