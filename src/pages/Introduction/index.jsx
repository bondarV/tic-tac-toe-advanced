import styles from './Introduction.module.css'
import {GameSelection, LastSessionContainer} from "../../components/layout";
import { Container} from "../../components/ui";

function Index() {
    return (
        <>
            <Container {...styles}>
                <GameSelection/>
                <LastSessionContainer/>
            </Container>
        </>
    )
}

export {Index};
