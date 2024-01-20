import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BiSun, BiMoon } from "react-icons/bi";


const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <button
        type="button"
        className="rounded-full bg-white text-gray-700 transition-all duration-200 hover:text-gray-900 dark:bg-[#1c1b22] dark:hover:text-white"
      >
        {["dark", "system"].includes(theme as string) && <BiMoon title="toggle dark mode" onClick={() => setTheme('light')} className="size-6 bg-white dark:bg-[#1c1b22]" />}
        {["light"].includes(theme as string) && (<BiSun title="toggle light mode" onClick={() => setTheme('dark')} className="size-6 bg-white dark:bg-[#1c1b22]" />)}
      </button>

      {/* <select value={theme} onChange={e => setTheme(e.target.value)}>
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select> */}
    </>
  );
};

export { ThemeToggle };
