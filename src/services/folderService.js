import { environment } from "../enviroments";

const apiUrl = environment.apiUrl;

export const createFolder = async (folderData) => {
    const response = await fetch(`${apiUrl}/Folder`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(folderData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to create folder");
    }

    return data;
};