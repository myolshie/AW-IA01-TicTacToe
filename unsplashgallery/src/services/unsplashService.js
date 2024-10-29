import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
  },
});

export const fetchPhotos = async (page) => {
  try {
    const response = await api.get(`/photos?page=${page}`, {
      params: { page, per_page: 10},
    });
    const data = Array.isArray(response.data) ? response.data : [];
    return data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

export const fetchPhotoById = async (id) => {
  try {
    const response = await api.get(`/photos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching photo details:', error);
    throw error;
  }
};


