// Spotify API Integration
const SPOTIFY_API_BASE = 'https://derp-rex-github-io.vercel.app';

// Your playlist ID from the Spotify embed
const PLAYLIST_ID = '66TP5uc6hwyESdV9AuvUZJ';

// Cache for access token
let cachedToken = null;
let tokenExpiry = null;

/**
 * Get Spotify access token (cached)
 */
async function getSpotifyToken() {
  // Return cached token if still valid
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    console.log('✅ Using cached token');
    return cachedToken;
  }

  console.log('🔄 Fetching new token from:', `${SPOTIFY_API_BASE}/api/spotify-token`);
  
  try {
    const response = await fetch(`${SPOTIFY_API_BASE}/api/spotify-token`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);

    if (response.ok && data.access_token) {
      cachedToken = data.access_token;
      // Set expiry to 5 minutes before actual expiry for safety
      tokenExpiry = Date.now() + ((data.expires_in - 300) * 1000);
      console.log('✅ Token received successfully');
      return cachedToken;
    } else {
      console.error('❌ Failed to get token:', data);
      return null;
    }
  } catch (error) {
    console.error('❌ Error getting token:', error);
    return null;
  }
}

/**
 * Get shuffled playlist tracks
 */
async function getShuffledPlaylist(playlistId = PLAYLIST_ID) {
  console.log('🔄 Fetching shuffled playlist:', playlistId);
  
  try {
    const url = `${SPOTIFY_API_BASE}/api/shuffle-playlist?playlistId=${playlistId}`;
    console.log('Fetching from:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    console.log('Shuffle response status:', response.status);
    const data = await response.json();
    console.log('Shuffle response data:', data);

    if (response.ok && data.tracks) {
      console.log('✅ Got', data.tracks.length, 'shuffled tracks');
      return data.tracks;
    } else {
      console.error('❌ Failed to shuffle playlist:', data);
      return null;
    }
  } catch (error) {
    console.error('❌ Error shuffling playlist:', error);
    return null;
  }
}

/**
 * Get random track from playlist
 */
async function getRandomTrack(playlistId = PLAYLIST_ID) {
  console.log('🎲 Getting random track from playlist');
  const tracks = await getShuffledPlaylist(playlistId);
  if (tracks && tracks.length > 0) {
    const randomTrack = tracks[0].track;
    console.log('✅ Random track:', randomTrack.name, 'by', randomTrack.artists[0].name);
    return randomTrack;
  }
  console.error('❌ No tracks available');
  return null;
}

/**
 * Display shuffled playlist in UI
 */
async function displayShuffledPlaylist(containerId = 'shuffled-tracks') {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container #${containerId} not found`);
    return;
  }

  container.innerHTML = '<p style="color: #1DB954;">Shuffling playlist...</p>';

  const tracks = await getShuffledPlaylist();

  if (!tracks) {
    container.innerHTML = '<p style="color: #ff6b6b;">Failed to shuffle playlist</p>';
    return;
  }

  let html = `<h3 style="color: #1DB954; margin-bottom: 15px;">🎵 Shuffled Playlist (${tracks.length} tracks)</h3>`;
  html += '<div style="max-height: 400px; overflow-y: auto;">';

  tracks.forEach((item, index) => {
    const track = item.track;
    const artists = track.artists.map(a => a.name).join(', ');
    const albumImage = track.album.images[2]?.url || track.album.images[0]?.url;

    html += `
      <div style="display: flex; align-items: center; padding: 10px; background: rgba(255,255,255,0.05); margin-bottom: 5px; border-radius: 5px;">
        <span style="color: #888; width: 30px; text-align: center;">${index + 1}</span>
        ${albumImage ? `<img src="${albumImage}" alt="${track.name}" style="width: 40px; height: 40px; border-radius: 4px; margin: 0 10px;">` : ''}
        <div style="flex: 1;">
          <div style="color: white; font-weight: bold;">${track.name}</div>
          <div style="color: #888; font-size: 12px;">${artists}</div>
        </div>
        <a href="${track.external_urls.spotify}" target="_blank" style="color: #1DB954; text-decoration: none; padding: 5px 10px; border: 1px solid #1DB954; border-radius: 15px; font-size: 12px;">Play</a>
      </div>
    `;
  });

  html += '</div>';
  container.innerHTML = html;
}

/**
 * Display random track in UI
 */
async function displayRandomTrack(containerId = 'random-track') {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container #${containerId} not found`);
    return;
  }

  container.innerHTML = '<p style="color: #1DB954;">Getting random track...</p>';

  const track = await getRandomTrack();

  if (!track) {
    container.innerHTML = '<p style="color: #ff6b6b;">Failed to get random track</p>';
    return;
  }

  const artists = track.artists.map(a => a.name).join(', ');
  const albumImage = track.album.images[1]?.url || track.album.images[0]?.url;

  const html = `
    <div style="background: linear-gradient(135deg, rgba(29, 185, 84, 0.1), rgba(29, 185, 84, 0.05)); padding: 20px; border-radius: 15px; text-align: center;">
      <h3 style="color: #1DB954; margin-bottom: 15px;">🎲 Random Track</h3>
      ${albumImage ? `<img src="${albumImage}" alt="${track.name}" style="width: 200px; height: 200px; border-radius: 10px; margin-bottom: 15px; box-shadow: 0 8px 16px rgba(0,0,0,0.3);">` : ''}
      <h4 style="color: white; margin: 10px 0;">${track.name}</h4>
      <p style="color: #888; margin: 5px 0;">${artists}</p>
      <p style="color: #666; font-size: 12px; margin: 5px 0;">${track.album.name}</p>
      <a href="${track.external_urls.spotify}" target="_blank" style="display: inline-block; margin-top: 15px; background: #1DB954; color: white; padding: 10px 25px; border-radius: 25px; text-decoration: none; font-weight: bold;">Play on Spotify</a>
    </div>
  `;

  container.innerHTML = html;
}

// Export functions for global use
window.SpotifyAPI = {
  getToken: getSpotifyToken,
  shufflePlaylist: getShuffledPlaylist,
  getRandomTrack: getRandomTrack,
  displayShuffledPlaylist: displayShuffledPlaylist,
  displayRandomTrack: displayRandomTrack
};

console.log('✅ Spotify API integration loaded');

