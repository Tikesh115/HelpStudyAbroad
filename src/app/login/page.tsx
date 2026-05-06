'use client';

import { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, Container, Alert } from '@mui/material';
import api from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuthStore();
    const router = useRouter();

    const handleLogin = async () => {
        if (!username || !password) {
            setError('Please enter both username and password');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/login', { username, password });
            login(response.data.token, response.data.user);
            router.push('/dashboard');
        } catch (error: any) {
            setError(error.response?.data?.message || 'Login failed. Please check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                padding: 2,
            }}
        >
            <Container maxWidth="sm">
                <Card
                    sx={{
                        borderRadius: '12px',
                        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.12)',
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                mb: 1,
                                background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                textAlign: 'center',
                            }}
                        >
                            Help Study Abroad
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ textAlign: 'center', color: '#64748b', mb: 3 }}
                        >
                            Admin Dashboard
                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <TextField
                            fullWidth
                            label="Username"
                            placeholder="Enter your username"
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={loading}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={loading}
                            sx={{ mb: 3 }}
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            onClick={handleLogin}
                            disabled={loading}
                            sx={{
                                fontWeight: 600,
                                py: 1.5,
                                textTransform: 'none',
                                fontSize: '1rem',
                            }}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>

                        <Typography
                            variant="caption"
                            sx={{
                                display: 'block',
                                textAlign: 'center',
                                mt: 3,
                                color: '#64748b',
                            }}
                        >
                            Demo credentials: emilys / emilyspass
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}
