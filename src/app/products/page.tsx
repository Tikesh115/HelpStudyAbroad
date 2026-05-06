'use client';

import { useCallback, useEffect, useState } from 'react';
import { Box, CircularProgress, Container, MenuItem, Pagination, Select, TextField, Typography } from '@mui/material';
import { fetchCategories } from '@/services/productApi';
import { useProductStore } from '@/store/productStore';
import ProtectedRoute from '../../components/common/ProtectedRoute';
import ProductCard from '../../components/products/ProductCard';

export default function ProductsPage() {
    const { products, total, loading, getProducts, searchProductList, filterByCategory } = useProductStore();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState<{ slug: string; name: string; url?: string }[]>([]);

    const limit = 10;

    useEffect(() => {
        const loadCategories = async () => {
            const data = await fetchCategories();
            setCategories(data);
        };

        loadCategories();
    }, []);

    useEffect(() => {
        const skip = (page - 1) * limit;
        getProducts(limit, skip);
    }, [page]);

    const handleSearch = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setSearch(value);
            setPage(1);

            if (value.trim()) {
                await searchProductList(value);
            } else {
                getProducts(limit, 0);
            }
        },
        [getProducts, searchProductList]
    );

    const handleCategoryChange = (event: any) => {
        const value = event.target.value;
        setSelectedCategory(value);
        setPage(1);
        filterByCategory(value);
    };

    return (
        <ProtectedRoute>
            <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 4 }}>
                <Container maxWidth="lg">
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: '#1e293b' }}>
                            Products
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#64748b' }}>
                            Browse and explore our product catalog
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            mb: 4,
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'stretch', sm: 'flex-start' },
                        }}
                    >
                        <TextField
                            fullWidth
                            label="Search Products"
                            placeholder="Search by name or description..."
                            value={search}
                            onChange={handleSearch}
                            sx={{
                                flex: 1,
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: '#fff',
                                },
                            }}
                        />

                        <Select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            displayEmpty
                            sx={{
                                minWidth: { xs: '100%', sm: 240 },
                                bgcolor: '#fff',
                                border: '1px solid #e2e8f0',
                                borderRadius: '6px',
                            }}
                        >
                            <MenuItem value="">All Categories</MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category.slug} value={category.slug}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                            <CircularProgress />
                        </Box>
                    ) : products.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <Typography variant="h6" sx={{ color: '#64748b', mb: 1 }}>
                                No products found
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                Try adjusting your search or filter criteria
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
                                        lg: 'repeat(4, minmax(0, 1fr))',
                                    },
                                    gap: 3,
                                    mb: 4,
                                }}
                            >
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
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
