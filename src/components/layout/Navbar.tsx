'use client';

import Link from 'next/link';

import {
    AppBar,
    Box,
    Button,
    Toolbar,
    Typography,
} from '@mui/material';

import { useRouter } from 'next/navigation';

import {
    useAuthStore,
} from '@/store/authStore';

import { usePathname } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    if (pathname === '/login') {
        return null;
    }

    const logout =
        useAuthStore(
            (state) =>
                state.logout
        );

    const handleLogout = () => {
        logout();

        router.push('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1 }}
                >
                    Help Study Abroad
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        maxWidth: '1200px',
                        margin: '0 auto',
                    }}
                >
                    <Link
                        href="/dashboard"
                        style={{
                            textDecoration:
                                'none',
                        }}
                    >
                        <Button color="inherit">
                            Dashboard
                        </Button>
                    </Link>

                    <Link
                        href="/users"
                        style={{
                            textDecoration:
                                'none',
                        }}
                    >
                        <Button color="inherit">
                            Users
                        </Button>
                    </Link>

                    <Link
                        href="/products"
                        style={{
                            textDecoration:
                                'none',
                        }}
                    >
                        <Button color="inherit">
                            Products
                        </Button>
                    </Link>

                    <Button
                        color="inherit"
                        onClick={
                            handleLogout
                        }
                    >
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar >
    );
}