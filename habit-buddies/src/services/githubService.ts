// src/services/githubService.ts
import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com/A-Ravioli/HabitBuddies';
const REPO_OWNER = 'A-Ravioli';
const REPO_NAME = 'HabitBuddies';
const FILE_PATH = 'shared/habits.json';
const BRANCH = 'main';
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN; // Ensure this is securely stored

// Fetch habits.json from GitHub
const fetchHabits = async () => {
  try {
    const url = `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `token ${TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    const { content, sha } = response.data;
    const decodedContent = Buffer.from(content, 'base64').toString('utf8');
    return { data: JSON.parse(decodedContent), sha };
  } catch (error) {
    console.error('Error fetching habits from GitHub:', error);
    return null;
  }
};

// Update habits.json on GitHub
const updateHabits = async (updatedData: any, sha: string) => {
  try {
    const url = `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
    const updatedContent = Buffer.from(JSON.stringify(updatedData, null, 2)).toString('base64');

    const response = await axios.put(
      url,
      {
        message: 'Update habits.json',
        content: updatedContent,
        sha: sha, // The SHA of the file being updated
        branch: BRANCH,
      },
      {
        headers: {
          Authorization: `token ${TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error updating habits on GitHub:', error);
    return null;
  }
};

export default {
  fetchHabits,
  updateHabits,
};