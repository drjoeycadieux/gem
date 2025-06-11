// Test the API endpoint directly
const { default: fetch } = await import('node-fetch');

const testApiEndpoint = async () => {
    const testData = {
        prompt: "Create a modern restaurant website with beautiful hero section, menu display, and contact form",
        businessType: "Restaurant",
        style: "modern",
        features: ["Contact Form", "Image Gallery", "Testimonials"]
    };

    try {
        console.log('Testing API endpoint...');
        const response = await fetch('http://localhost:3000/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData),
        });

        const result = await response.json();

        console.log('API Response Status:', response.status);
        console.log('Success:', result.success);

        if (result.success && result.data) {
            console.log('Title:', result.data.title);
            console.log('Description:', result.data.description);
            console.log('HTML Length:', result.data.html?.length || 'MISSING');
            console.log('Sections Count:', result.data.sections?.length || 'MISSING');

            if (result.data.html) {
                console.log('\n--- HTML PREVIEW (first 500 chars) ---');
                console.log(result.data.html.substring(0, 500));

                // Check if HTML looks complete
                if (result.data.html.length > 1000 && result.data.html.includes('class=')) {
                    console.log('\n✅ HTML appears to be complete and well-formed!');
                } else {
                    console.log('\n❌ HTML appears to be incomplete or malformed.');
                }
            }
        } else {
            console.log('❌ Error:', result.error);
        }

    } catch (error) {
        console.error('❌ Request failed:', error.message);
    }
};

// Run the test
testApiEndpoint();
