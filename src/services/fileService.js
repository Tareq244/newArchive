import { environment } from "../enviroments";

const apiUrl = environment.apiUrl;

export const uploadFile = async (file, parentId = null) => {
    const formData = new FormData();

    formData.append("file", file);

    if (parentId !== null) {
        formData.append("parentId", parentId);
    }

    const response = await fetch(`${apiUrl}/api/File/upload`, {
        method: "POST",
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to upload file");
    }

    return data;
};