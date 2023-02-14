import { useState } from "react";
import Todo from "./Todo";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <main>
      <div
        className={isDarkMode ? "bg-dark text-white min-vh-100" : "min-vh-100"}
      >
        <Todo isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>
    </main>
  );
}
