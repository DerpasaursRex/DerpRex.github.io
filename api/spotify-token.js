// Serverless function to get Spotify access token
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
  
  console.log('Token request received from:', origin);

  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    console.log('Client ID present:', !!clientId);
    console.log('Client Secret present:', !!clientSecret);

    if (!clientId || !clientSecret) {
      console.error('Missing credentials');
      return res.status(500).json({ 
        error: 'Missing Spotify credentials',
        hasClientId: !!clientId,
        hasClientSecret: !!clientSecret
      });
    }

    // Get access token using Client Credentials flow
    console.log('Requesting token from Spotify...');
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
      },
      body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    console.log('Spotify response status:', response.status);

    if (!response.ok) {
      console.error('Token request failed:', data);
      return res.status(response.status).json({ 
        error: data.error_description || 'Failed to get token',
        details: data
      });
    }

    console.log('Token received successfully');
    res.status(200).json({ 
      access_token: data.access_token,
      expires_in: data.expires_in 
    });

  } catch (error) {
    console.error('Error getting Spotify token:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}

