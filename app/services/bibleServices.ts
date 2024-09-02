// services/bibleService.ts
import axios from 'axios';

const API_URL = 'https://bible-api.com'; // Replace with your chosen Bible API endpoint

export const getBibleVerse = async (reference: string) => {
  try {
    const response = await axios.get(`${API_URL}/${reference}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Bible verse:', error);
    throw error;
  }
};
