export interface WebsiteData {
    title: string;
    description: string;
    html: string;
    css: string;
    sections: Section[];
    theme: Theme;
}

export interface Section {
    id: string;
    type: 'hero' | 'about' | 'services' | 'contact' | 'features' | 'testimonials' | 'gallery' | 'footer';
    title: string;
    content: string;
    style?: React.CSSProperties;
}

export interface Theme {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
}

export interface GenerationRequest {
    prompt: string;
    businessType: string;
    style: 'modern' | 'classic' | 'minimal' | 'creative' | 'professional';
    features: string[];
}

export interface ApiResponse {
    success: boolean;
    data?: WebsiteData;
    error?: string;
}

export interface TemplateOption {
    id: string;
    name: string;
    description: string;
    preview: string;
    category: string;
}
