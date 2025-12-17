import {ListItem} from "../ListItem/ListItem.jsx";

function DisplayList({className = '', itemClassName = '', items = []}) {
    return (
        <ul className={className} style={{display: "flex", justifyContent: "space-between"}}>
            {items.map((item) => (
                <ListItem className={itemClassName} key={item.id}>
                    <a href={item.url} title={item.name}>{item.name}</a>
                </ListItem>
            ))}
        </ul>
    )
}

export {DisplayList}