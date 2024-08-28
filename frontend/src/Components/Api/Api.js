

let apiUrl = process.env.REACT_APP_BACKEND_URL;

export const getApi = async (url, token) => {
    try {
        const response = await fetch(`${apiUrl}${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        });
        const result = await response.json();
        return result;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


export const postApi = async (url, data) => {
    try {
        const response = await fetch(`${apiUrl}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        return result;

    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

export const postApiTeam = async (url, token, data) => {
    try {
        const response = await fetch(`${apiUrl}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        return result;

    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

export const putApi = async (url, token, data) => {
    try {
        const response = await fetch(`${apiUrl}${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        return result;

    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
};

export const deleteApi = async (url, token) => {
    try {
        const response = await fetch(`${apiUrl}${url}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
        });
        const result = await response.text();
        return result;

    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
};
