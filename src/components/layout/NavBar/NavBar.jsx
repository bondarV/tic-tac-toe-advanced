import {DisplayList} from "../../form/lists/DisplayList/DisplayList.jsx";

function NavBar({pages, changeActivePage}) {
    return (
        <nav>
            <DisplayList changeActivePage={changeActivePage} items={pages}/>
        </nav>
    );
}

export {NavBar};
