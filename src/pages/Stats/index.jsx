function Stats() {
    return (
        <div style={{backgroundColor: 'white'}}
        >
            <h1>Choose the next settings for game:</h1>
            <form action="">
                <div>
                    <label>Mode:
                    </label>
                    <input type="radio" className="type" name='mode' value="Dark"/>
                    <input type="radio" className="type" name='mode' value="Light"/>
                </div>
            </form>
        </div>

    )
}

export {Stats};