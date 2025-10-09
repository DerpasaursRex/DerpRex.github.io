// Serverless function to get shuffled playlist tracks
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { playlistId } = req.query;

    if (!playlistId) {
      return res.status(400).json({ error: 'playlistId is required' });
    }

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return res.status(500).json({ error: 'Missing Spotify credentials' });
    }

    // Get access token
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
      },
      body: 'grant_type=client_credentials'
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return res.status(tokenResponse.status).json({ error: 'Failed to get token' });
    }

    // Get playlist tracks
    const playlistResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    });

    const playlistData = await playlistResponse.json();

    if (!playlistResponse.ok) {
      return res.status(playlistResponse.status).json({ error: 'Failed to get playlist' });
    }

    // Shuffle the tracks
    const tracks = playlistData.items;
    const shuffled = tracks.sort(() => Math.random() - 0.5);

    res.status(200).json({ 
      tracks: shuffled,
      total: shuffled.length 
    });

  } catch (error) {
    console.error('Error shuffling playlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

