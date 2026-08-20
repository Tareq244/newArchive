import { environment } from "../enviroments";

const apiUrl = environment.apiUrl;

export const createFolder = async (folderData) => {
  const response = await fetch(`${apiUrl}Folders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify(folderData),
  });

  // نقرأ الـ response كنص أولاً
  const text = await response.text();

  // إذا فيه JSON نحوله، وإذا فاضي نخليه null
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
      text ||
      `Failed to create folder (${response.status})`
    );
  }

  return data;
};