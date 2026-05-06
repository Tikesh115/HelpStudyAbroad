'use client';

import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Container, Pagination, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useUserStore } from '../../store/userStore';
import ProtectedRoute from '../../components/common/ProtectedRoute';
import UserCard from '../../components/users/UserCard';

export default function UsersPage() {
    const { users, total, loading, getUsers, searchUsersList } = useUserStore();
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const limit = 10;

    useEffect(() => {
        const skip = (page - 1) * limit;
        getUsers(limit, skip);
    }, [page]);

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        setPage(1);

        if (value.trim() === '') {
            getUsers(limit, 0);
        } else {
            searchUsersList(value);
        }
    };

    return (
        <ProtectedRoute>
            <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 4 }}>
                <Container maxWidth="lg">
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: '#1e293b' }}>
                            Users
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#64748b' }}>
                            Manage and search users across the platform
                        </Typography>
                    </Box>

                    <TextField
                        fullWidth
                        label="Search Users"
                        placeholder="Search by name, email, or company..."
                        value={searchQuery}
                        onChange={handleSearch}
                        sx={{
                            mb: 4,
                            '& .MuiOutlinedInput-root': {
                                bgcolor: '#fff',
                            },
                        }}
                    />

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                            <CircularProgress />
                        </Box>
                    ) : users.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <Typography variant="h6" sx={{ color: '#64748b', mb: 1 }}>
                                No users found
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                Try adjusting your search criteria
                            </Typography>
                        </Box>
                    ) : (
                        <>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: '1fr',
                                        sm: 'repeat(2, minmax(0, 1fr))',
                                        md: 'repeat(3, minmax(0, 1fr))',
                                    },
                                    gap: 3,
                                    mb: 4,
                                }}
                            >
                                {users.map((user) => (
                                    <UserCard key={user.id} user={user} />
                                ))}
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                                <Pagination
                                    count={Math.ceil(total / limit)}
                                    page={page}
                                    onChange={(_, value) => setPage(value)}
                                    color="primary"
                                    size="large"
                                    sx={{
                                        '& .MuiPaginationItem-root': {
                                            fontWeight: 500,
                                        },
                                    }}
                                />
                            </Box>
                        </>
                    )}
                </Container>
            </Box>
        </ProtectedRoute>
    );
}
