import { useNavigate } from "react-router-dom";
import { OpacityButton, Row } from "./styled-components";

const Header = () => {

    const navigate = useNavigate();
    return (
        <>
            <Row style={{ position: 'absolute', top: '2rem', left: '2rem', columnGap: '1rem', color: '#fff' }}>
                <OpacityButton style={{ width: '2rem', textAlign: 'center' }} onClick={() => {
                    navigate('/')
                }}>홈</OpacityButton>
                <OpacityButton onClick={() => {
                    navigate('/report')
                }}>보고서</OpacityButton>
            </Row>
        </>
    )
}
export default Header;