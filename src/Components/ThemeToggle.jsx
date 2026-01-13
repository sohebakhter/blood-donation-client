import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { BsMoon, BsSun } from "react-icons/bs";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle text-xl transition-all duration-300"
            aria-label="Toggle Theme"
        >
            {theme === "light" ? <BsMoon /> : <BsSun />}
        </button>
    );
};

export default ThemeToggle;
