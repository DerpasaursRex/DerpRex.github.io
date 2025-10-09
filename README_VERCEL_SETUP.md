# Spotify API with Vercel - Setup Guide

## 📁 Project Structure

```
your-project/
├── api/
│   ├── spotify-token.js        # Get Spotify access token
│   └── shuffle-playlist.js     # Get shuffled playlist tracks
├── vercel.json                 # Vercel configuration
├── package.json                # Project dependencies
├── .env.example                # Example environment variables
├── .gitignore                  # Git ignore file
└── (your existing HTML files)
```

## 🚀 Deployment Steps

### 1. Install Vercel CLI (if not already installed)
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Set Environment Variables
```bash
vercel env add SPOTIFY_CLIENT_ID
# Paste your Client ID when prompted

vercel env add SPOTIFY_CLIENT_SECRET
# Paste your Client Secret when prompted
```

### 4. Deploy to Vercel
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? (select your account)
- Link to existing project? **N**
- What's your project's name? (press Enter or type a name)
- In which directory is your code located? **./  (press Enter)**
- Want to override settings? **N**

### 5. Deploy to Production
```bash
vercel --prod
```

## 🔗 Your API Endpoints

After deployment, you'll get a URL like: `https://your-project.vercel.app`

Your endpoints will be:
- `https://your-project.vercel.app/api/spotify-token`
- `https://your-project.vercel.app/api/shuffle-playlist?playlistId=YOUR_PLAYLIST_ID`

## 🧪 Testing Locally

1. Create `.env.local` file:
```bash
cp .env.example .env.local
```

2. Add your credentials to `.env.local`

3. Run local dev server:
```bash
vercel dev
```

4. Test endpoints:
- http://localhost:3000/api/spotify-token
- http://localhost:3000/api/shuffle-playlist?playlistId=YOUR_PLAYLIST_ID

## 🎵 Using in Your Website

Add this JavaScript to your HTML:

```javascript
// Get your Vercel URL after deployment
const API_BASE = 'https://your-project.vercel.app';

// Example: Shuffle playlist
async function shufflePlaylist(playlistId) {
  try {
    const response = await fetch(`${API_BASE}/api/shuffle-playlist?playlistId=${playlistId}`);
    const data = await response.json();
    console.log('Shuffled tracks:', data.tracks);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Use it
shufflePlaylist('66TP5uc6hwyESdV9AuvUZJ'); // Your playlist ID
```

## 📝 Notes

- Environment variables are stored securely in Vercel
- Never commit `.env.local` to Git
- Free tier includes: 100GB bandwidth, serverless functions
- Functions auto-scale based on traffic

## 🔧 Troubleshooting

**Error: "Missing Spotify credentials"**
- Make sure you added environment variables with `vercel env add`

**Error: "CORS"**
- The `vercel.json` file handles CORS automatically

**Error: "Failed to get token"**
- Check your Client ID and Client Secret are correct
- Make sure they're added as environment variables

## 🎯 Next Steps

1. Deploy your functions
2. Get your Vercel URL
3. Update your HTML to call these endpoints
4. Test the shuffle functionality!

