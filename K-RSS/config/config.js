module.exports = {
  // Basic configuration
  port: process.env.PORT || 1200,

  // Cache configurations
  cache: {
    type: process.env.CACHE_TYPE || 'memory',
    routeExpire: 5 * 60, // Route cache expiration time in seconds
    contentExpire: 1 * 60 * 60, // Content cache expiration time in seconds
  },

  // Access control configuration
  accessKey: process.env.ACCESS_KEY || '',

  // Allow cross-origin requests
  allowOrigin: process.env.ALLOW_ORIGIN || '*',

  // User agent for HTTP requests
  ua: process.env.UA || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',

  // Proxy configuration
  proxy: {
    protocol: process.env.PROXY_PROTOCOL || '',
    host: process.env.PROXY_HOST || '',
    port: process.env.PROXY_PORT || '',
    auth: process.env.PROXY_AUTH || '',
    url_regex: process.env.PROXY_URL_REGEX || '.*',
  },

  // Debug mode
  debugInfo: process.env.DEBUG_INFO || false,
}; 