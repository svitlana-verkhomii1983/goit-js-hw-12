import axios from 'axios';

const API_KEY = '46804414-b7542e140c58663107171b647';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page, perPage) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
      },
    });
    return {
      hits: response.data.hits,
      totalHits: response.data.totalHits
    };
  } catch (error) {
    throw new Error(`HTTP error! status: ${error.response.status}`);
  }
}