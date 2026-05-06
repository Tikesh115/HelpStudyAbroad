'use client';

import React from 'react';
import Link from 'next/link';
import { Avatar, Card, CardContent, Typography } from '@mui/material';

function UserCard({ user }: any) {
    return (
        <Link href={`/users/${user.id}`} style={{ textDecoration: 'none' }}>
            <Card
                sx={{
                    p: 2,
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '1px solid #e2e8f0',
                    '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
                        borderColor: '#cbd5e1',
                    },
                }}
            >
                <Avatar
                    src={user.image}
                    sx={{
                        width: 80,
                        height: 80,
                        mb: 2,
                        border: '3px solid #e0e7ff',
                        backgroundColor: '#e0e7ff',
                    }}
                />

                <CardContent sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                        {user.firstName} {user.lastName}
                    </Typography>

                    <Typography variant="body2" sx={{ color: '#64748b' }}>
                        {user.email}
                    </Typography>

                    <Typography variant="caption" sx={{ color: '#94a3b8', mt: 0.5 }}>
                        {user.company?.name || 'N/A'}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}

export default React.memo(UserCard);
