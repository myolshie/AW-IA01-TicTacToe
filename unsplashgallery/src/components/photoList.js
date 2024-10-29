import React, { useState, useEffect } from 'react';
import { fetchPhotos } from '../services/unsplashService';
import { Link } from 'react-router-dom';
import { styled, CircularProgress, Grid2, Box, Container, Typography } from '@mui/material';

const PhotoItem = styled(Box)({
    textAlign: 'center',
    padding: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    transition: 'transform 0.2s',
    width: '314px',
    height: '550px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
        transform: 'scale(1.05)',
    },
});

const PhotoList = () => {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
  
    const loadPhotos = async () => {
      setLoading(true);
      try {
        const response = await fetchPhotos(page);
        setPhotos((prevPhotos) => [...prevPhotos, ...response]);
        setHasMore(response.length > 0);
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      loadPhotos();
    }, [page]);
  
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 300 && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);
  
    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom mt={3}> Photo Gallery </Typography>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <Grid2 container spacing={3} justifyContent="center">
                    {photos.map((photo) => (
                    <Grid2 item xs={12} sm={6} md={3} lg={3} key={photo.id}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                        <Link to={`/photos/${photo.id}`}>
                        <PhotoItem>
                            <img src={photo.urls.thumb} alt={photo.alt_description} style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }} />
                            <p style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '23px' }}>{photo.user.name}</p>
                        </PhotoItem>
                        </Link>
                    </div>
                    </Grid2>
                    ))}
                </Grid2>
                {loading && <CircularProgress />}
            </Box>
        </Container>
  );
};

export default PhotoList;
