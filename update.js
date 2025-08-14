const fs = require('fs');
const fetch = require('node-fetch');

const API_URL = 'https://mtpro.xyz/api/?type=mtproto';
const RETRY_CONFIG = {
    MAX_RETRIES: 3,
    INITIAL_DELAY: 1000,
    MAX_DELAY: 8000,
    BACKOFF_FACTOR: 2
};

const ALLOWED_COUNTRIES = ['IR'];  // از کد بالا

async function fetchWithRetry(url) {
    let lastError;
    for (let attempt = 0; attempt <= RETRY_CONFIG.MAX_RETRIES; attempt++) {
        try {
            if (attempt > 0) {
                const delay = Math.min(
                    RETRY_CONFIG.INITIAL_DELAY * Math.pow(RETRY_CONFIG.BACKOFF_FACTOR, attempt - 1),
                    RETRY_CONFIG.MAX_DELAY
                );
                await new Promise(resolve => setTimeout(resolve, delay));
            }
            const response = await fetch(url, { timeout: 30000 });
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const data = await response.json();

            // چک کشور ساده (اگر API کشور بدهد)
            const filtered = data.filter(proxy => ALLOWED_COUNTRIES.includes(proxy.country || 'IR'));
            return filtered;
        } catch (error) {
            lastError = error;
        }
    }
    throw lastError || new Error('Max retries exceeded');
}

async function updateProxies() {
    try {
        const proxies = await fetchWithRetry(API_URL);
        fs.writeFileSync('mtproto.json', JSON.stringify(proxies, null, 2));
        console.log('Proxy list updated successfully.');
    } catch (error) {
        console.error('Update failed:', error);
    }
}

updateProxies();