'use client';

import { useEffect } from 'react';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useProductStore } from '@/store/productStore';
import { useUserStore } from '@/store/userStore';

type SummaryCardProps = {
    icon: typeof PeopleIcon;
    title: string;
    value: string;
    helperText: string;
};

const SummaryCard = ({ icon: Icon, title, value, helperText }: SummaryCardProps) => (
    <Card
        sx={{
            height: '100%',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
            transition: 'box-shadow 0.2s ease, transform 0.2s ease',
            '&:hover': {
                boxShadow: '0 8px 20px rgba(15, 23, 42, 0.08)',
                transform: 'translateY(-2px)',
            },
        }}
    >
        <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                        height: 40,
                        borderRadius: '10px',
                        bgcolor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                    }}
                >
                    <Icon sx={{ fontSize: 22, color: '#475569' }} />
                </Box>
                <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 600 }}>
                    {title}
                </Typography>
            </Box>

            <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a', lineHeight: 1.1 }}>
                {value}
            </Typography>

            <Typography variant="body2" sx={{ mt: 1, color: '#64748b' }}>
                {helperText}
            </Typography>
        </CardContent>
    </Card>
);

export default function DashboardPage() {
    const userTotal = useUserStore((state) => state.total);
    const productTotal = useProductStore((state) => state.total);
    const userLoading = useUserStore((state) => state.loading);
    const productLoading = useProductStore((state) => state.loading);
    const getUsers = useUserStore((state) => state.getUsers);
    const getProducts = useProductStore((state) => state.getProducts);

    useEffect(() => {
        getUsers(100, 0);
        getProducts(100, 0);
    }, [getUsers, getProducts]);

    const totalUsersValue = userTotal > 0 ? String(userTotal) : userLoading ? 'Loading' : '—';
    const totalProductsValue = productTotal > 0 ? String(productTotal) : productLoading ? 'Loading' : '—';

    return (
        <ProtectedRoute>
            <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 4 }}>
                <Container maxWidth="lg">
                    <Box sx={{ mb: 4 }}>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 700,
                                mb: 1,
                                color: '#0f172a',
                            }}
                        >
                            Dashboard
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#64748b', maxWidth: 640 }}>
                            Welcome back. This view summarizes the current admin state.
                        </Typography>
                    </Box>

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
                        <SummaryCard
                            icon={PeopleIcon}
                            title="Total Users"
                            value={totalUsersValue}
                            helperText="Loaded from the users store when available."
                        />
                        <SummaryCard
                            icon={ShoppingCartIcon}
                            title="Total Products"
                            value={totalProductsValue}
                            helperText="Loaded from the products store when available."
                        />
                    </Box>
                </Container>
            </Box>
        </ProtectedRoute>
    );
}
