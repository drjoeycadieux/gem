import { GoogleGenerativeAI } from '@google/generative-ai';
import { GenerationRequest, WebsiteData } from '@/types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export class GeminiService {
    private model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    async generateWebsite(request: GenerationRequest): Promise<WebsiteData> {
        const prompt = this.buildPrompt(request);

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            return this.parseResponse(text);
        } catch (error) {
            console.error('Error generating website:', error);
            throw new Error('Failed to generate website. Please try again.');
        }
    } private buildPrompt(request: GenerationRequest): string {
        return `
Generate a complete website for a ${request.businessType} business with the following requirements:

**User Request:** ${request.prompt}
**Style:** ${request.style}
**Features:** ${request.features.join(', ')}

Please provide a JSON response with the following structure:
{
  "title": "Website title",
  "description": "Website description",
  "html": "COMPLETE HTML BODY CONTENT with all sections included - do not use external CSS/JS files",
  "css": "Additional CSS styles if needed (optional)",
  "sections": [
    {
      "id": "unique-id",
      "type": "hero|about|services|contact|features|testimonials|gallery|footer",
      "title": "Section title",
      "content": "Section content in HTML format"
    }
  ],
  "theme": {
    "primaryColor": "#hexcolor",
    "secondaryColor": "#hexcolor",
    "backgroundColor": "#hexcolor",
    "textColor": "#hexcolor",
    "fontFamily": "font-family-name"
  }
}

CRITICAL REQUIREMENTS:
1. The "html" field must contain the COMPLETE website body content with ALL sections
2. Use only Tailwind CSS classes (no external CSS files)
3. Include all sections (hero, about, services, contact, etc.) in the HTML
4. Make it fully responsive and modern
5. Apply ${request.style} design principles
6. Include proper semantic HTML5 elements
7. Make it visually appealing and professional
8. Do NOT reference external files (style.css, script.js, etc.)
9. Do NOT use external images (no .jpg, .png, .gif files) - use CSS backgrounds, gradients, or icons instead
10. Use placeholder text like "Lorem ipsum" or generic content instead of specific images
11. For visual elements, use CSS gradients, Tailwind background colors, or Unicode symbols

The HTML should be a complete, self-contained website body that can be directly displayed without any external dependencies.

Generate ONLY valid JSON without any additional text or markdown formatting.
    `.trim();
    } private parseResponse(response: string): WebsiteData {
        try {
            // Clean the response to ensure it's valid JSON
            const cleanedResponse = response.replace(/```json\n?/, '').replace(/```\n?$/, '').trim();

            const data = JSON.parse(cleanedResponse);

            // Validate the response structure
            if (!data.title || !data.sections || !Array.isArray(data.sections)) {
                throw new Error('Invalid response structure');
            }            // Check if HTML is complete or needs to be constructed from sections
            if (!data.html || data.html.length < 200 || data.html.includes('<div id="root"></div>')) {
                console.log('Constructing HTML from sections...');
                data.html = this.constructHtmlFromSections(data.sections, data.theme);
            }            // Clean any external image references from the HTML
            data.html = this.cleanExternalReferences(data.html);

            // Also clean external references from individual sections
            if (data.sections && Array.isArray(data.sections)) {
                data.sections = data.sections.map(section => ({
                    ...section,
                    content: this.cleanExternalReferences(section.content || '')
                }));
            }

            return data as WebsiteData;
        } catch (error) {
            console.error('Error parsing Gemini response:', error);

            // Return a fallback website structure
            return this.getFallbackWebsite();
        }
    } private constructHtmlFromSections(sections: any[], theme?: any): string {
        const sectionsHtml = sections.map(section => section.content).join('\n');

        return `
<div class="min-h-screen bg-white">
    ${sectionsHtml}
</div>
        `.trim();
    }

    private cleanExternalReferences(html: string): string {
        // Remove external image references and replace with CSS alternatives
        let cleanedHtml = html;

        // Replace image tags with div elements using CSS backgrounds
        cleanedHtml = cleanedHtml.replace(
            /<img[^>]+src=["'][^"']*\.(jpg|jpeg|png|gif|webp)["'][^>]*>/gi,
            '<div class="bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg h-48 flex items-center justify-center text-gray-600"><span class="text-4xl">🖼️</span></div>'
        );

        // Remove any remaining external file references
        cleanedHtml = cleanedHtml.replace(/src=["'][^"']*\.(css|js|jpg|jpeg|png|gif|webp)["']/gi, '');
        cleanedHtml = cleanedHtml.replace(/href=["'][^"']*\.(css|js)["']/gi, '');

        // Replace background-image URLs with gradients
        cleanedHtml = cleanedHtml.replace(
            /background-image:\s*url\([^)]+\)/gi,
            'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        );

        return cleanedHtml;
    } private getFallbackWebsite(): WebsiteData {
        return {
            title: "Your Professional Website",
            description: "A modern, professional website for your business",
            html: `
<div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <header class="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div class="container mx-auto px-6 py-20">
            <div class="text-center">
                <h1 class="text-5xl font-bold mb-4">Welcome to Your Website</h1>
                <p class="text-xl mb-8">Professional, modern, and ready for your business</p>
                <button class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
                    Get Started
                </button>
            </div>
        </div>
    </header>

    <!-- About Section -->
    <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-6">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-gray-800 mb-4">About Us</h2>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                    We provide exceptional services with a focus on quality, innovation, and customer satisfaction.
                </p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="text-center p-6 bg-white rounded-lg shadow-md">
                    <div class="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span class="text-white text-2xl">⭐</span>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Quality</h3>
                    <p class="text-gray-600">Excellence in everything we do</p>
                </div>
                <div class="text-center p-6 bg-white rounded-lg shadow-md">
                    <div class="w-16 h-16 bg-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span class="text-white text-2xl">🚀</span>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Innovation</h3>
                    <p class="text-gray-600">Cutting-edge solutions for modern needs</p>
                </div>
                <div class="text-center p-6 bg-white rounded-lg shadow-md">
                    <div class="w-16 h-16 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span class="text-white text-2xl">💎</span>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Support</h3>
                    <p class="text-gray-600">24/7 customer service and support</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="py-20">
        <div class="container mx-auto px-6">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                    Comprehensive solutions tailored to meet your specific needs and goals.
                </p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div class="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
                    <h3 class="text-xl font-semibold mb-4 text-blue-600">Service One</h3>
                    <p class="text-gray-600 mb-4">Professional service designed to help your business grow and succeed.</p>
                    <a href="#" class="text-blue-600 font-semibold hover:text-blue-800">Learn More →</a>
                </div>
                <div class="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
                    <h3 class="text-xl font-semibold mb-4 text-purple-600">Service Two</h3>
                    <p class="text-gray-600 mb-4">Expert solutions with proven results and exceptional customer satisfaction.</p>
                    <a href="#" class="text-purple-600 font-semibold hover:text-purple-800">Learn More →</a>
                </div>
                <div class="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-300">
                    <h3 class="text-xl font-semibold mb-4 text-green-600">Service Three</h3>
                    <p class="text-gray-600 mb-4">Innovative approaches to solve complex challenges and drive success.</p>
                    <a href="#" class="text-green-600 font-semibold hover:text-green-800">Learn More →</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="py-20 bg-gray-800 text-white">
        <div class="container mx-auto px-6">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold mb-4">Get In Touch</h2>
                <p class="text-lg text-gray-300 max-w-2xl mx-auto">
                    Ready to start your project? Contact us today for a consultation.
                </p>
            </div>
            <div class="max-w-lg mx-auto">
                <form class="space-y-6">
                    <div>
                        <input type="text" placeholder="Your Name" 
                               class="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-blue-500 focus:outline-none">
                    </div>
                    <div>
                        <input type="email" placeholder="Your Email" 
                               class="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-blue-500 focus:outline-none">
                    </div>
                    <div>
                        <textarea placeholder="Your Message" rows="4"
                                  class="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-blue-500 focus:outline-none"></textarea>
                    </div>
                    <button type="submit" 
                            class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-8">
        <div class="container mx-auto px-6 text-center">
            <p>&copy; 2025 Your Business Name. All rights reserved.</p>
            <p class="mt-2 text-gray-400">Built with AI Website Builder</p>
        </div>
    </footer>
</div>
            `.trim(),
            css: "",
            sections: [
                {
                    id: "hero",
                    type: "hero",
                    title: "Hero Section",
                    content: "<div class='bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20'><div class='container mx-auto text-center'><h1 class='text-5xl font-bold mb-4'>Welcome to Your Website</h1><p class='text-xl mb-8'>Professional, modern, and ready for your business</p></div></div>"
                },
                {
                    id: "about",
                    type: "about",
                    title: "About Us",
                    content: "<div class='py-20 bg-gray-50'><div class='container mx-auto'><h2 class='text-4xl font-bold text-center mb-8'>About Us</h2><p class='text-lg text-gray-600 text-center max-w-2xl mx-auto'>We provide exceptional services with a focus on quality, innovation, and customer satisfaction.</p></div></div>"
                },
                {
                    id: "services",
                    type: "services",
                    title: "Services",
                    content: "<div class='py-20'><div class='container mx-auto'><h2 class='text-4xl font-bold text-center mb-8'>Our Services</h2><p class='text-lg text-gray-600 text-center max-w-2xl mx-auto'>Comprehensive solutions tailored to meet your specific needs.</p></div></div>"
                },
                {
                    id: "contact",
                    type: "contact",
                    title: "Contact",
                    content: "<div class='py-20 bg-gray-800 text-white'><div class='container mx-auto text-center'><h2 class='text-4xl font-bold mb-8'>Get In Touch</h2><p class='text-lg mb-8'>Ready to start your project? Contact us today.</p></div></div>"
                }
            ],
            theme: {
                primaryColor: "#2563eb",
                secondaryColor: "#7c3aed",
                backgroundColor: "#ffffff",
                textColor: "#1f2937",
                fontFamily: "Inter, sans-serif"
            }
        };
    }

    async enhanceSection(sectionContent: string, instructions: string): Promise<string> {
        const prompt = `
Enhance this website section based on the following instructions:

**Current Section:**
${sectionContent}

**Enhancement Instructions:**
${instructions}

Return only the enhanced HTML content with Tailwind CSS classes. Make it modern, responsive, and visually appealing.
    `;

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text().trim();
        } catch (error) {
            console.error('Error enhancing section:', error);
            return sectionContent; // Return original content if enhancement fails
        }
    }
}

export const geminiService = new GeminiService();
