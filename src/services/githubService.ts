import axios from "axios";

const GITHUB_API_URL = "https://api.github.com/users/eemirmutlu/repos";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const fetchRepositories = async () => {
  try {
    const response = await axios.get(GITHUB_API_URL, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw error;
  }
};

const GITHUB_API_BASE_URL = "https://api.github.com";

export const fetchFileContent = async (
  owner: string,
  repo: string,
  path: string
) => {
  try {
    const response = await axios.get(
      `${GITHUB_API_BASE_URL}/repos/${owner}/${repo}/contents/${path}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );
    const content = atob(response.data.content);
    return content;
  } catch (error) {
    console.error("Error fetching file content:", error);
    throw error;
  }
};
