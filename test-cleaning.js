// Quick test to verify image cleaning
const testHtml = `
<div class="hero">
    <img src="hero-image.jpg" alt="Hero">
    <img src="pizza-hero.jpg" class="w-full" alt="Pizza">
    <div style="background-image: url('chef-photo.jpg')">Content</div>
    <link href="styles.css" rel="stylesheet">
    <script src="script.js"></script>
</div>
`;

function cleanExternalReferences(html) {
    let cleanedHtml = html;

    // Replace image tags with div elements using CSS alternatives
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
}

console.log('Original HTML:');
console.log(testHtml);
console.log('\nCleaned HTML:');
console.log(cleanExternalReferences(testHtml));
