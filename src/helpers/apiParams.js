const params = {
    Response: false,
    status: 'active',
    search: '',
    limit: 50,
}

// Construct the query string by encoding the parameters
export const queryString = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');