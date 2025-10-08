import './NavBar.css'
import { NavItem } from './NavItem/NavItem';
function NavBar({ pages }) {
  return (
    <>
      <ul className="nav">
        {pages.map((page) => (
          <NavItem key={page.id} id={page.id} name={page.name} />
        ))}
      </ul>
    </>
  );
}

export { NavBar };
