'use client';

import Link from 'next/link';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

function ProductCard({ product }: any) {
    return (
        <Link href={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
            <Card
                sx={{
                    height: '100%',
                    transition: 'all 0.3s ease',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
                        borderColor: '#cbd5e1',
                    },
                }}
            >
                <CardMedia
                    component="img"
                    height="200"
                    image={product.thumbnail}
                    alt={product.title}
                    sx={{
                        objectFit: 'cover',
                        backgroundColor: '#f1f5f9',
                    }}
                />

                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', lineHeight: 1.3 }}>
                        {product.title}
                    </Typography>

                    <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>
                        {product.description ? product.description.substring(0, 60) + '...' : 'No description'}
                    </Typography>

                    <Typography variant="h6" sx={{ color: '#2563eb', fontWeight: 700, mt: 'auto' }}>
                        ${product.price}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}

export default React.memo(ProductCard);
