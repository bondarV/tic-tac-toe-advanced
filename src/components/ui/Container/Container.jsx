import './Container.css'

function Container({ containerStyles={}, contentStyles={}, children}) {

    return (
        <div className='container' style={containerStyles}>
            <div className='content-block' style={contentStyles}>
                {children}
            </div>
        </div>
    )
}

export {Container}