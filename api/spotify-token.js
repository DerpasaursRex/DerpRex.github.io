// Serverless function to get Spotify access token
export default async function handler(req, res) {
  // Enable CORS - Allow all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  console.log('Token request received');

  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return res.status(500).json({ error: 'Missing Spotify credentials' });
    }

    // Get access token using Client Credentials flow
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
      },
      body: 'grant_type=client_credentials'
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error_description || 'Failed to get token' });
    }

    res.status(200).json({ 
      access_token: data.access_token,
      expires_in: data.expires_in 
    });

  } catch (error) {
    console.error('Error getting Spotify token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

