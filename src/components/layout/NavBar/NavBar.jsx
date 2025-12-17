import styles from './NavBar.module.css'
import {DisplayList} from "../../form/lists/DisplayList/DisplayList.jsx";

function NavBar({pages}) {
    return (
        <nav>
            <DisplayList items={pages}/>
        </nav>
    );
}

export {NavBar};
