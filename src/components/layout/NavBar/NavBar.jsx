import './NavBar.css'
import {NavItem} from './NavItem/NavItem';

function NavBar({pages}) {
    return (
        <>
            <ul className="nav">
                {pages.map((page) => (
                    <NavItem className="nav-item" key={page.id} id={page.id} url={page.url} name={page.name}/>
                ))}
            </ul>
        </>
    );
}

export {NavBar};
