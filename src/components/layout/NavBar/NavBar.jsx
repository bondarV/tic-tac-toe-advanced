import './NavBar.css'
import {NavItem} from './NavItem/NavItem';
import {ListDisplay} from "../../ui/ListDisplay/ListDisplay.jsx";

function NavBar({pages}) {
    return (
        <>
            <ListDisplay className='nav'>
                {pages.map((page) => (
                    <NavItem className='nav-link' key={page.id} id={page.id} url={page.url} name={page.name}/>
                ))}
            </ListDisplay>
        </>
    );
}

export {NavBar};
