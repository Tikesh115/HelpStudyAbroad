import api from './api';

export const getUser = async (
    limit = 10,
    skip = 0
) => {
    try {
        const response = await api.get(`/users?limit=${limit}&skip=${skip}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

export const searchUsers = async (query: string) => {
    try {        
        const response = await api.get(`/users/search?q=${encodeURIComponent(query)}`);
        return response.data;
    } catch (error) {
        console.error('Error searching users:', error);
        throw error;
    }
}

export const getUserById = async (id: string) => {
    try {
        const response = await api.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user with id ${id}:`, error);
        throw error;
    }
}