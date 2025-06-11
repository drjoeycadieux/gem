#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🚀 AI Website Builder Setup\n');
console.log('This script will help you set up your environment variables.\n');

// Check if .env.local already exists
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    console.log('✅ .env.local file already exists!');
    rl.question('Do you want to update it? (y/n): ', (answer) => {
        if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
            promptForApiKey();
        } else {
            console.log('Setup cancelled. Your existing .env.local file remains unchanged.');
            rl.close();
        }
    });
} else {
    promptForApiKey();
}

function promptForApiKey() {
    console.log('\n📝 To get your Gemini API key:');
    console.log('1. Visit: https://makersuite.google.com/app/apikey');
    console.log('2. Sign in with your Google account');
    console.log('3. Create a new API key');
    console.log('4. Copy the generated key\n');

    rl.question('Enter your Gemini API key: ', (apiKey) => {
        if (!apiKey || apiKey.trim() === '') {
            console.log('❌ API key cannot be empty. Please try again.');
            promptForApiKey();
            return;
        }

        const envContent = `# AI Website Builder Environment Variables
# Generated on ${new Date().toISOString()}

GEMINI_API_KEY=${apiKey.trim()}
NODE_ENV=development
`;

        try {
            fs.writeFileSync(envPath, envContent);
            console.log('\n✅ Environment file created successfully!');
            console.log('📁 File saved as: .env.local');
            console.log('\n🎉 You can now run: npm run dev');
            console.log('🌐 Your AI Website Builder will be available at: http://localhost:3000\n');
        } catch (error) {
            console.error('❌ Error creating environment file:', error.message);
        }

        rl.close();
    });
}

rl.on('close', () => {
    console.log('Setup complete!');
    process.exit(0);
});
