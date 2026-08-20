import { environment } from "../enviroments";

const apiUrl = environment.apiUrl;

export const uploadFile = async (file, parentId = null, description = null) => {
    const formData = new FormData();

    formData.append("file", file);

    if (parentId !== null) {
        formData.append("parentId", parentId);
    }

    if (description) {
        formData.append("description", description);
    }


    const response = await fetch(`${apiUrl}File/upload`, {
        method: "POST",
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to upload file");
    }

    return data;
};