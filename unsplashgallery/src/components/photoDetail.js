import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, CircularProgress, Box } from '@mui/material';

const ImageDetail = () => {
  const { id } = useParams(); 
  const [imageInfo, setImageInfo] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

  useEffect(() => {
    const getImageDetails = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`https://api.unsplash.com/photos/${id}`, {
          params: { client_id: accessKey },
        });
        setImageInfo(data); 
      } catch (error) {
        console.error('Lỗi lấy thông tin ảnh:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getImageDetails();
  }, [id, accessKey]);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom mt={3}>
        Chi tiết ảnh
      </Typography>
      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : imageInfo ? (
        <Box textAlign="center" mt={4}>
          <img src={imageInfo.urls.full} alt={imageInfo.alt_description || 'Ảnh'} style={{ maxWidth: '100%', height: 'auto', borderRadius: '15px'}} />
          <Typography variant="h5">{imageInfo.title || 'Chưa có tiêu đề'}</Typography>
          <Typography variant="subtitle1">
            <strong>Tác giả:</strong> {imageInfo.user.name}
          </Typography>
          <Typography variant="body1">
            <strong>Mô tả:</strong> {imageInfo.description || 'Chưa có mô tả'}
          </Typography>
        </Box>
      ) : (
        <Typography color="error" align="center">
          Không thể tải thông tin ảnh.
        </Typography>
      )}
    </Container>
  );
};

export default ImageDetail;
