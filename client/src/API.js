const API_URL = process.env.REACT_APP_API_URL;

export async function listLogEntries() {
  const response = await fetch(`${API_URL}/api/logs`);
  return response.json();
}
