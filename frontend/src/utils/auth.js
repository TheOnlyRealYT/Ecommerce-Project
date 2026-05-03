export const setToken = (token) => {
    localStorage.setItem('access_token', token.access);
    localStorage.setItem('refresh_token', token.refresh);
}

export const removeToken = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
}

export const getAccessToken = () => {
    return localStorage.getItem('access_token');
}

export const authFetch = async (url, options = {}) => {
    const token = getAccessToken();
    if (token) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
        };
    }
    const response = await fetch(url, options);
    if (response.status === 401) {
        // Token might be expired, trying token refresh
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
            const refreshResponse = await fetch('/api/token/refresh/', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: refreshToken }),
            });
            if (refreshResponse.ok) {
                const newTokens = await refreshResponse.json();
                setToken(newTokens);
                options.headers['Authorization'] = `Bearer ${newTokens.access}`;
                return await fetch(url, options);
            } else {
                removeToken();
            }
        } else {
            removeToken();
        }
    }
    return response;
}