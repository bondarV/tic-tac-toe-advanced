import './NavItem.css'
function NavItem({name, url,className}) {
    return <li className={className}><a href={url}>{name}</a></li>;
}

export {NavItem};
