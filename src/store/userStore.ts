import { create } from 'zustand';

import { getUser, searchUsers } from '../services/userApi';

interface UserStore {
    users: any[];
    total: number;
    loading: boolean;

    getUsers: (limit?: number, skip?: number) => Promise<void>;
    searchUsersList: (query: string) => Promise<void>;
}

export const useUserStore = create<UserStore>(
    (set) => ({
        users: [],
        total: 0,
        loading: false,

        getUsers: async (limit = 10, skip = 0) => {
            set({ loading: true });
            try {
                const data = await getUser(limit, skip);
                set({ users: data.users, total: data.total });
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                set({ loading: false });
            }
        },

        searchUsersList: async (query: string) => {
            set({ loading: true });
            try {
                const data = await searchUsers(query);
                set({ users: data.users, total: data.total });
            } catch (error) {
                console.error('Error searching users:', error);
            } finally {                
                set({ loading: false });
            }
        }
    })
)