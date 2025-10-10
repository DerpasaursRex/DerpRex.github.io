// Serverless function to get shuffled playlist tracks
export default async function handler(req, res) {
  // CRITICAL: Set CORS headers FIRST before anything else
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  console.log('Shuffle playlist request received from:', origin);

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
    console.log('Fetching playlist:', playlistId);
    const playlistResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50`, {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    });

    const playlistData = await playlistResponse.json();
    console.log('Playlist response status:', playlistResponse.status);

    if (!playlistResponse.ok) {
      console.error('Playlist fetch failed:', playlistData);
      return res.status(playlistResponse.status).json({ 
        error: 'Failed to get playlist',
        details: playlistData.error?.message || 'Unknown error'
      });
    }

    // Check if we have tracks
    if (!playlistData.items || playlistData.items.length === 0) {
      console.error('No tracks in playlist');
      return res.status(404).json({ error: 'No tracks found in playlist' });
    }

    console.log('Got', playlistData.items.length, 'tracks');

    // Shuffle the tracks (Fisher-Yates shuffle for better randomness)
    const tracks = [...playlistData.items];
    for (let i = tracks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tracks[i], tracks[j]] = [tracks[j], tracks[i]];
    }

    console.log('Shuffled successfully');

    res.status(200).json({ 
      tracks: tracks,
      total: tracks.length 
    });

  } catch (error) {
    console.error('Error shuffling playlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

