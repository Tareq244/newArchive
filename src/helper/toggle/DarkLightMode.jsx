import { useState } from "react";

function DarkLightMode() {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        document.body.classList.toggle("dark");

        setIsDark(!isDark);
    };

    return(
        <button onClick={toggleTheme}>
            {isDark ? "☀️" : "🌙"}
        </button>
    );
}
export default DarkLightMode;