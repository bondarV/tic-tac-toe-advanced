import './NavItem.css'
import {ListItem} from "../../../ui/ListItem/ListItem.jsx";
function NavItem({name, url,className}) {
    return <ListItem className={className}><a href={url}>{name}</a></ListItem>;
}

export {NavItem};
