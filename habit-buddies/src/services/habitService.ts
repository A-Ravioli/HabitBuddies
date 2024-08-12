// src/services/habitService.ts
import githubService from './githubService';

const fetchHabits = async () => {
  const response = await githubService.fetchHabits();
  if (response) {
    const { data, sha } = response;
    // You might want to store the sha for future updates
    localStorage.setItem('githubSha', sha);
    return data;
  }
  return [];
};

const updateHabits = async (updatedData: any) => {
  const sha = localStorage.getItem('githubSha');
  if (sha) {
    const response = await githubService.updateHabits(updatedData, sha);
    if (response) {
      localStorage.setItem('githubSha', response.content.sha);
    }
  }
};

export default {
  fetchHabits,
  updateHabits,
};
