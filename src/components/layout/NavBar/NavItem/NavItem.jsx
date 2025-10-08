import './NavItem.css'
function NavItem({name, url,className}) {
    console.log(url)
    return <li className={className}><a href={url}>{name}</a></li>;
}

export {NavItem};
