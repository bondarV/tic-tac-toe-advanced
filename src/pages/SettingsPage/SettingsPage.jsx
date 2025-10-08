import {Container} from "../../components/ui/index.jsx";

function SettingsPage() {
    return (
        <Container containerStyles={{backgroundColor: 'white'}}
                   contentStyles={{display: "flex", flexDirection: 'column', alignItems: 'center'}}>
            <h1>Choose the next settings for game:</h1>
            <form action="">
                <div>
                    <label>Mode:
                    </label>
                    <input type="radio" className="type" name='mode' value="Dark"/>
                    <input type="radio" className="type" name='mode' value="Light"/>
                </div>
            </form>
        </Container>

    )
}

export {SettingsPage};