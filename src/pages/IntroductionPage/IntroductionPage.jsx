import './Introduction.module.css'
import {LastSessionContainer} from "../../components/layout/index.jsx";
import {Button, Container} from "../../components/ui/index.jsx";

function IntroductionPage() {
    const styles = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    }
    return (
        <>
            <Container contentStyles={styles}>
                <Button label={'Перейти до вибору режиму гри'}/>
                <LastSessionContainer/>
            </Container>
        </>
    )
}

export {IntroductionPage};
