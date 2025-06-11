# AI Website Builder

A powerful AI-powered website builder that uses Google's Gemini API to generate beautiful, responsive websites from simple text descriptions.

## Features

- **AI-Powered Generation**: Create complete websites using natural language descriptions
- **Multiple Design Styles**: Choose from modern, classic, minimal, creative, or professional designs
- **Responsive Design**: All generated websites are mobile-first and fully responsive
- **Live Preview**: See your website in real-time with desktop, tablet, and mobile views
- **Custom Features**: Add contact forms, galleries, testimonials, and more
- **Export Ready**: Download complete HTML files ready for hosting
- **TypeScript**: Full type safety and better development experience

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Google Gemini API** - AI website generation
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Google Gemini API key

### Installation

1. Clone or download this project

2. Install dependencies:
   ```bash
   npm install
   ```

3. **Quick Setup** (Recommended):
   ```bash
   npm run setup
   ```
   This interactive script will guide you through getting your Gemini API key and setting up your environment.

4. **Manual Setup** (Alternative):
   - Copy the environment template: `cp .env.example .env.local`
   - Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Add your API key to `.env.local`:
     ```
     GEMINI_API_KEY=your_actual_api_key_here
     ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Getting a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your `.env.local` file

## Usage

1. **Describe Your Website**: Enter a detailed description of the website you want to create
2. **Select Business Type**: Choose the type of business or website category
3. **Pick a Design Style**: Select from modern, classic, minimal, creative, or professional
4. **Choose Features**: Add specific features like contact forms, galleries, testimonials
5. **Generate**: Click the generate button and wait for AI to create your website
6. **Preview & Edit**: View your website in different device sizes
7. **Download**: Export the complete HTML file for hosting

## Project Structure

```
src/
├── app/
│   ├── api/generate/       # Gemini API integration
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page
├── components/
│   ├── WebsiteBuilder.tsx  # Main builder interface
│   └── WebsitePreview.tsx  # Website preview component
├── lib/
│   └── gemini.ts           # Gemini service integration
└── types/
    └── index.ts            # TypeScript type definitions
```

## API Integration

The application uses Google's Gemini 1.5 Flash model to generate websites. The AI understands natural language prompts and creates:

- Semantic HTML structure
- Tailwind CSS styling
- Responsive design
- Accessibility features
- Modern web standards

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have questions:

1. Check the troubleshooting section below
2. Create an issue on GitHub
3. Review the documentation

## Troubleshooting

### Common Issues

**API Key Error**: Make sure your Gemini API key is correctly set in `.env.local`

**Generation Fails**: Check your internet connection and API key validity

**Styling Issues**: Ensure Tailwind CSS is properly configured

**Build Errors**: Run `npm install` to ensure all dependencies are installed
