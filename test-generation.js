// Test script to check website generation
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI('AIzaSyA_-l4-8Otmcq8EKmOJ5LaVroGlb5GeGRc');

async function testGeneration() {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `
Generate a complete website for a Restaurant business with the following requirements:

**User Request:** Create a modern restaurant website with menu, contact info, and reservation system
**Style:** modern
**Features:** Contact Form, Image Gallery, Testimonials

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
5. Apply modern design principles
6. Include proper semantic HTML5 elements
7. Make it visually appealing and professional
8. Do NOT reference external files (style.css, script.js, etc.)

The HTML should be a complete, self-contained website body that can be directly displayed.

Generate ONLY valid JSON without any additional text or markdown formatting.
    `.trim();

    try {
        console.log('Testing website generation...');
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log('Raw response length:', text.length);
        console.log('Raw response preview:', text.substring(0, 500));
        console.log('\n--- FULL RESPONSE ---');
        console.log(text);

        // Try to parse it
        const cleanedResponse = text.replace(/```json\n?/, '').replace(/```\n?$/, '').trim();
        const parsed = JSON.parse(cleanedResponse);

        console.log('\n--- PARSED DATA ---');
        console.log('Title:', parsed.title);
        console.log('Description:', parsed.description);
        console.log('HTML length:', parsed.html?.length || 'MISSING');
        console.log('Sections count:', parsed.sections?.length || 'MISSING');

        // Check HTML content
        if (parsed.html) {
            console.log('\n--- HTML PREVIEW ---');
            console.log(parsed.html.substring(0, 1000));
        } else {
            console.log('\n--- ERROR: NO HTML FOUND ---');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

testGeneration();
