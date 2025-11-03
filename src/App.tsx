import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Contact } from "./components/sections/Contact";
import { CursorFollower } from "./components/CursorFollower";

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <CursorFollower />
      <Navigation scrolled={scrolled} />
      <Outlet /> {/* Har sahifaning o‘zi shu joyda chiqadi */}
      <Contact />
    </div>
  );
}
