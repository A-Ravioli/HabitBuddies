import dotenv from 'dotenv';

const GITHUB_API_URL = 'https://api.github.com/repos/username/repo/contents/habits.json';
dotenv.config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || 'YOUR_GITHUB_TOKEN';

export async function fetchHabitsFromGitHub(): Promise<any> {
  const response = await fetch(GITHUB_API_URL, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });
  const data = await response.json();
  return JSON.parse(atob(data.content));
}

export async function updateHabitsOnGitHub(habits: any): Promise<void> {
  const currentData = await fetchHabitsFromGitHub();
  const newContent = btoa(JSON.stringify(habits));

  const response = await fetch(GITHUB_API_URL, {
    method: 'PUT',
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      message: 'Updating habits',
      content: newContent,
      sha: currentData.sha,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to update habits on GitHub');
  }
}
