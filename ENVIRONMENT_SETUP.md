# Environment Variables

This project uses environment variables for sensitive configuration like API keys.

## Setup

1. Copy `.env.local` file (already created)
2. Get your own **Google Maps API Key**:
   - Visit: https://console.cloud.google.com/google/maps-apis
   - Create a new project or select existing
   - Enable "Maps Embed API"
   - Create credentials (API Key)
   - Copy your API key

3. Replace `your_api_key_here` in `.env.local` with your actual key:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_ACTUAL_KEY_HERE
   ```

4. Restart your development server

## Security Note

- `.env.local` is already in `.gitignore` and will not be committed
- Never commit API keys directly in code
- Get your own free API key from Google Cloud Console
