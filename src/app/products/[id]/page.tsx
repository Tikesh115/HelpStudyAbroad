'use client';

import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Typography,
} from '@mui/material';

import Link from 'next/link';

import {
    useEffect,
    useState,
} from 'react';

import { useParams } from 'next/navigation';

import {
    fetchSingleProduct,
} from '@/services/productApi';

import {
    Swiper,
    SwiperSlide,
} from 'swiper/react';

import 'swiper/css';
import ProtectedRoute from '../../../components/common/ProtectedRoute';

export default function SingleProductPage() {
    const params = useParams();

    const [product, setProduct] =
        useState<any>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const getProduct =
            async () => {
                try {
                    const data =
                        await fetchSingleProduct(
                            params.id as string
                        );

                    setProduct(data);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };

        getProduct();
    }, [params.id]);

    if (loading) {
        return (
            <Box sx={{ p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <ProtectedRoute>
            <Box sx={{ p: 3, maxWidth: '1200px', margin: '0 auto' }}>
                <Link
                    href="/products"
                    style={{
                        textDecoration: 'none',
                    }}
                >
                    <Button variant="outlined">
                        Back to Products
                    </Button>
                </Link>

                <Card sx={{ mt: 3 }}>
                    <CardContent>
                        <Swiper
                            spaceBetween={20}
                            slidesPerView={1}
                        >
                            {product.images.map(
                                (
                                    image: string,
                                    index: number
                                ) => (
                                    <SwiperSlide
                                        key={index}
                                    >
                                        <img
                                            src={image}
                                            alt={
                                                product.title
                                            }
                                            style={{
                                                width: '100%',
                                                height:
                                                    '400px',
                                                objectFit:
                                                    'contain',
                                            }}
                                        />
                                    </SwiperSlide>
                                )
                            )}
                        </Swiper>

                        <Typography
                            variant="h4"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {product.title}
                        </Typography>

                        <Typography sx={{ mb: 2 }}>
                            {
                                product.description
                            }
                        </Typography>

                        <Typography sx={{ mb: 1 }}>
                            <strong>
                                Price:
                            </strong>{' '}
                            $
                            {product.price}
                        </Typography>

                        <Typography sx={{ mb: 1 }}>
                            <strong>
                                Rating:
                            </strong>{' '}
                            {
                                product.rating
                            }
                        </Typography>

                        <Typography sx={{ mb: 1 }}>
                            <strong>
                                Category:
                            </strong>{' '}
                            {
                                product.category
                            }
                        </Typography>

                        <Typography sx={{ mb: 1 }}>
                            <strong>
                                Brand:
                            </strong>{' '}
                            {product.brand}
                        </Typography>

                        <Typography sx={{ mb: 1 }}>
                            <strong>
                                Stock:
                            </strong>{' '}
                            {product.stock}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </ProtectedRoute >
    );
}