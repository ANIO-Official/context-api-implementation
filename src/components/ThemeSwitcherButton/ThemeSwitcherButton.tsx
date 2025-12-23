import { useContext, useState } from "react"
import { ThemeContext } from "../../contexts/contexts"


export default function ThemeSwitcherButton() {
    const {theme, toggleTheme} = useContext(ThemeContext)
    const [text, setText] = useState<string>('Switch to Dark 🌙')
    
    const handleThemeChange = () =>{
        toggleTheme()
        setText( theme === 'light'? 'Switch to Light 🌞':'Switch to Dark 🌙')
    }

  
  return (
    <>
      <button onClick={handleThemeChange} className="theme-switcher-button">{text}</button>
    </>
  );
}
