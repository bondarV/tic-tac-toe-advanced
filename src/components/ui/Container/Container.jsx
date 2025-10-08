import './Container.css'
import {evaluateMargin} from "../../../utilities/evaluateMargin.js";

function Container({alignment = 'left',bgColor ='#4CB963' ,children}) {
   let margin = evaluateMargin(alignment);

    return (
        <div style={{margin: margin,  backgroundColor: bgColor }}  className='container'>
            <div className='content-block' >
                {children}
            </div>
        </div>
    )
}
export {Container}