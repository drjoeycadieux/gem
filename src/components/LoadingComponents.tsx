'use client';

import { Loader2, Wand2 } from 'lucide-react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string;
}

export function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8'
    };

    return (
        <div className="flex items-center space-x-2">
            <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600`} />
            {text && <span className="text-gray-600">{text}</span>}
        </div>
    );
}

interface GenerationProgressProps {
    stage: 'analyzing' | 'generating' | 'formatting' | 'complete';
}

export function GenerationProgress({ stage }: GenerationProgressProps) {
    const stages = [
        { id: 'analyzing', label: 'Analyzing your request...', icon: '🤔', color: 'from-blue-500 to-cyan-500' },
        { id: 'generating', label: 'Generating website content...', icon: '✨', color: 'from-purple-500 to-pink-500' },
        { id: 'formatting', label: 'Formatting and styling...', icon: '🎨', color: 'from-emerald-500 to-teal-500' },
        { id: 'complete', label: 'Website ready!', icon: '🎉', color: 'from-green-500 to-emerald-500' }
    ];

    const currentStageIndex = stages.findIndex(s => s.id === stage);

    return (
        <div className="bg-white/70 backdrop-blur-md border-2 border-blue-200 rounded-3xl p-8 space-y-6 shadow-2xl">
            <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg animate-pulse">
                    <Wand2 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Creating Your Website</h3>
                <div className="ml-auto">
                    <div className="flex space-x-1">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${i <= currentStageIndex ? 'bg-blue-500' : 'bg-gray-300'
                                    } animate-pulse`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {stages.map((stageItem, index) => (
                    <div
                        key={stageItem.id}
                        className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-500 transform ${index <= currentStageIndex
                                ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 scale-105 shadow-lg'
                                : 'bg-gray-50 border-2 border-gray-200'
                            }`}
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${index <= currentStageIndex
                                ? `bg-gradient-to-r ${stageItem.color} shadow-lg`
                                : 'bg-gray-200'
                            }`}>
                            {index <= currentStageIndex ? stageItem.icon : '⏳'}
                        </div>
                        <div className="flex-1">
                            <span
                                className={`font-bold text-lg ${index <= currentStageIndex ? 'text-blue-900' : 'text-gray-500'
                                    }`}
                            >
                                {stageItem.label}
                            </span>
                        </div>
                        {index === currentStageIndex && stage !== 'complete' && (
                            <LoadingSpinner size="md" />
                        )}
                        {index < currentStageIndex && (
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg animate-bounce">
                                ✓
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 h-3 rounded-full transition-all duration-1000 shadow-inner"
                    style={{ width: `${((currentStageIndex + 1) / stages.length) * 100}%` }}
                />
            </div>

            <div className="text-center">
                <p className="text-gray-600 font-medium">
                    Step {currentStageIndex + 1} of {stages.length}
                </p>
            </div>
        </div>
    );
}
