exports.handler = async (event, context) => {
  const API_KEY = process.env.VITE_TMDB_API_KEY;
  const BASE_URL = 'https://api.themoviedb.org/3';

  // Extract the endpoint path by removing the proxy prefix
  // Matches both /api/tmdb and /.netlify/functions/tmdb to be safe
  let endpoint = event.path.replace(/^\/api\/tmdb/, '').replace(/^\/\.netlify\/functions\/tmdb/, '');

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server configuration error: API Key missing' })
    };
  }

  try {
    const url = new URL(BASE_URL + endpoint);
    url.searchParams.append('api_key', API_KEY);

    if (event.queryStringParameters) {
      Object.keys(event.queryStringParameters).forEach(key => {
        url.searchParams.append(key, event.queryStringParameters[key]);
      });
    }

    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Proxy error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', message: error.message })
    };
  }
};
