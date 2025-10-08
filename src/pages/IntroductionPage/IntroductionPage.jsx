import './Introduction.module.css'
import {GameSelection, LastSessionContainer} from "../../components/layout";
import { Container} from "../../components/ui";

function IntroductionPage() {
    const styles = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    }
    return (
        <>
            <Container contentStyles={styles}>
                <GameSelection/>
                <LastSessionContainer/>
            </Container>
        </>
    )
}

export {IntroductionPage};
