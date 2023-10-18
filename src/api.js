import axios from 'axios';

export const fetchImages = async (page, query) => {
  const API_KEY = '39213885-34944342d2bc042f9d48f9344';
  const BASE_URL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    q: query,
    page,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });

  const response = await axios.get(`${BASE_URL}?${params}`);
  return response.data;
};
