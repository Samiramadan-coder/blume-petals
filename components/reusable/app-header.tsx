import AppLogo from "./app-logo";
import NavLink from "./nav-link";

export default function AppHeader() {
  return (
    <header className="container">
      <div className="flex items-center justify-between gap-4 py-5">
        <AppLogo width={80} />

        <nav className="flex items-center gap-8">
          <NavLink href="/" label="Home" />
          <NavLink href="/shop" label="Shop" />
          <NavLink href="/builder" label="Builder" />
          <NavLink href="/about" label="About" />
        </nav>

        <div>control</div>
      </div>
    </header>
  );
}
