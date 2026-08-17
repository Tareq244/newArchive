export const saveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
    const user = localStorage.getItem("user");

    if (!user || user === "undefined" || user === "null") {
        return null;
    }

    try {
        return JSON.parse(user);
    } catch (error) {
        console.error("Invalid user data:", error);

        localStorage.removeItem("user");

        return null;
    }
};

export const removeUser = () => {
    localStorage.removeItem("user");
};