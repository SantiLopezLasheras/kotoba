import ThemeToggle from "./theme-toggle";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-bgPrimary">
      <div className="text-lg font-bold text-accent">KOTOBA</div>

      <div className="flex items-center space-x-4">
        <ThemeToggle />
      </div>
    </nav>
  );
}
