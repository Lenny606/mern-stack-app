const ENV = {
    DEV: 'development',
    PROD: 'production'
};

const getEnvironment = () => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined' && window.location) {
        // Check if we're on localhost or a development domain
        if (window.location.hostname === 'localhost' || window.location.hostname.includes('dev.')) {
            return ENV.DEV;
        }
    }

    // Check Node environment variable
    if (process.env.NODE_ENV === 'development') {
        return ENV.DEV;
    }

    // Default to production
    return ENV.PROD;
};

const isDev = () => getEnvironment() === ENV.DEV;
const isProd = () => getEnvironment() === ENV.PROD;

// Config object with environment-specific values
const config = {
    apiUrl: isDev() ? 'http://localhost:5000/api' : 'https://api.yourdomain.com',
    debugMode: isDev(),
    // Add other configuration variables as needed
};

export { isDev, isProd, config };