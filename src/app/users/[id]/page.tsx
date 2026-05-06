'use client';

import { useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Chip,
    Container,
    Divider,
    Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useParams, useRouter } from 'next/navigation';
import { getUserById } from '../../../services/userApi';
import ProtectedRoute from '../../../components/common/ProtectedRoute';

export default function SingleUserPage() {
    const params = useParams();
    const router = useRouter();

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserById(params.id as string);
                setUser(data);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [params.id]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', bgcolor: '#f8fafc' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!user) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', bgcolor: '#f8fafc' }}>
                <Typography variant="h6" color="error">
                    User not found
                </Typography>
            </Box>
        );
    }

    return (
        <ProtectedRoute>
            <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 4 }}>
                <Container maxWidth="md">
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => router.back()}
                        sx={{
                            mb: 3,
                            color: '#2563eb',
                            '&:hover': {
                                bgcolor: 'rgba(37, 99, 235, 0.08)',
                            },
                        }}
                    >
                        Back to Users
                    </Button>

                    <Card sx={{ border: '1px solid #e2e8f0' }}>
                        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 3,
                                    mb: 3,
                                    pb: 3,
                                    borderBottom: '1px solid #e2e8f0',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    textAlign: { xs: 'center', sm: 'left' },
                                }}
                            >
                                <Avatar
                                    src={user.image}
                                    alt={`${user.firstName} ${user.lastName}`}
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        border: '4px solid #e0e7ff',
                                        backgroundColor: '#e0e7ff',
                                    }}
                                />
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#1e293b' }}>
                                        {user.firstName} {user.lastName}
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                                        {user.gender && <Chip label={user.gender} size="small" variant="outlined" />}
                                        {user.company?.name && <Chip icon={<BusinessIcon />} label={user.company.name} size="small" />}
                                    </Box>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                                    gap: 3,
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <EmailIcon sx={{ color: '#2563eb', fontSize: 24 }} />
                                    <Box>
                                        <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                                            Email
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                            {user.email}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <PhoneIcon sx={{ color: '#10b981', fontSize: 24 }} />
                                    <Box>
                                        <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                                            Phone
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                            {user.phone || 'N/A'}
                                        </Typography>
                                    </Box>
                                </Box>

                                {user.address && (
                                    <Box sx={{ gridColumn: '1 / -1' }}>
                                        <Divider sx={{ my: 1 }} />
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mt: 1 }}>
                                            <LocationOnIcon sx={{ color: '#f59e0b', fontSize: 24, mt: 0.5 }} />
                                            <Box>
                                                <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                                                    Address
                                                </Typography>
                                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                    {user.address.address}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#64748b' }}>
                                                    {user.address.city}, {user.address.state} {user.address.postalCode}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                )}

                                {user.company && (
                                    <Box sx={{ gridColumn: '1 / -1' }}>
                                        <Divider sx={{ my: 1 }} />
                                        <Box sx={{ mt: 1 }}>
                                            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 1 }}>
                                                Company Information
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#1e293b' }}>
                                                <strong>Name:</strong> {user.company.name}
                                            </Typography>
                                            {user.company.department && (
                                                <Typography variant="body2" sx={{ color: '#1e293b' }}>
                                                    <strong>Department:</strong> {user.company.department}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </ProtectedRoute>
    );
}
