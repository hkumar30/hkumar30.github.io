#!/usr/bin/env node
/**
 * Test script to verify Spotify API integration
 * 
 * Usage:
 *   node scripts/test-spotify.mjs
 * 
 * This will test if your Spotify credentials are working correctly.
 * Make sure you have SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and 
 * SPOTIFY_REFRESH_TOKEN set in your .env.local file.
 */

import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env from project root
config({ path: join(__dirname, '..', '.env.local') });

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const SPOTIFY_RECENT_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

async function getToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    const missing = [];
    if (!clientId) missing.push('SPOTIFY_CLIENT_ID');
    if (!clientSecret) missing.push('SPOTIFY_CLIENT_SECRET');
    if (!refreshToken) missing.push('SPOTIFY_REFRESH_TOKEN');
    
    console.error('❌ Missing credentials:', missing.join(', '));
    console.log('\nTo fix this:');
    console.log('1. Create a .env.local file in your project root');
    console.log('2. Add your Spotify credentials (see .env.example)');
    console.log('\nTo get credentials:');
    console.log('1. Go to https://developer.spotify.com/dashboard');
    console.log('2. Create an app or use an existing one');
    console.log('3. Copy Client ID and Client Secret');
    console.log('4. Run: node scripts/refresh-spotify-token.mjs to get a refresh token');
    return null;
  }

  console.log('✓ Credentials found');
  console.log(`  Client ID: ${clientId.slice(0, 8)}...`);
  console.log(`  Refresh Token: ${refreshToken.slice(0, 8)}...`);

  try {
    const response = await fetch(SPOTIFY_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Token request failed:', error);
      
      if (error.includes('invalid_grant')) {
        console.log('\nYour refresh token has expired. To fix:');
        console.log('1. Run: node scripts/refresh-spotify-token.mjs');
        console.log('2. Follow the instructions to authenticate');
        console.log('3. Update SPOTIFY_REFRESH_TOKEN in .env.local');
      }
      return null;
    }

    const data = await response.json();
    console.log('✓ Successfully got access token');
    return data.access_token;
  } catch (error) {
    console.error('❌ Network error:', error.message);
    console.log('\nNote: If you\'re in a sandboxed environment, external API calls may be blocked.');
    console.log('The Spotify integration will work in production where network access is available.');
    return null;
  }
}

async function testNowPlaying(token) {
  console.log('\n📡 Testing /me/player/currently-playing...');
  
  try {
    const response = await fetch(SPOTIFY_NOW_PLAYING_URL, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (response.status === 200) {
      const data = await response.json();
      if (data?.item) {
        console.log('✓ Now playing:');
        console.log(`  Track: "${data.item.name}"`);
        console.log(`  Artist: ${data.item.artists.map(a => a.name).join(', ')}`);
        console.log(`  Album: ${data.item.album.name}`);
        console.log(`  Playing: ${data.is_playing ? 'Yes' : 'Paused'}`);
        return data.item;
      }
    } else if (response.status === 204) {
      console.log('ℹ Nothing currently playing (this is normal)');
      return null;
    } else if (response.status === 401) {
      console.error('❌ Authentication error - token may be expired');
      return null;
    }
    
    console.log(`ℹ Response status: ${response.status}`);
    return null;
  } catch (error) {
    console.error('❌ Error:', error.message);
    return null;
  }
}

async function testRecentlyPlayed(token) {
  console.log('\n📡 Testing /me/player/recently-played...');
  
  try {
    const response = await fetch(SPOTIFY_RECENT_URL, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.items?.[0]) {
        const track = data.items[0].track;
        const playedAt = new Date(data.items[0].played_at).toLocaleString();
        console.log('✓ Recently played:');
        console.log(`  Track: "${track.name}"`);
        console.log(`  Artist: ${track.artists.map(a => a.name).join(', ')}`);
        console.log(`  Played at: ${playedAt}`);
        return track;
      }
    }
    
    console.log(`ℹ Response status: ${response.status}`);
    return null;
  } catch (error) {
    console.error('❌ Error:', error.message);
    return null;
  }
}

async function main() {
  console.log('🎵 Spotify API Test\n');
  console.log('=' .repeat(50));

  const token = await getToken();
  
  if (!token) {
    console.log('\n❌ Test failed - could not get access token');
    process.exit(1);
  }

  await testNowPlaying(token);
  await testRecentlyPlayed(token);

  console.log('\n' + '='.repeat(50));
  console.log('✓ Test complete!');
  console.log('\nFor production builds:');
  console.log('1. Ensure SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_REFRESH_TOKEN');
  console.log('   are set as GitHub Secrets (Settings > Secrets and variables > Actions)');
  console.log('2. The build workflow in .github/workflows/deploy.yml will use these secrets');
}

main().catch(console.error);
