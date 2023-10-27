import styled from "styled-components";
import { Col, Row, Text2, Wrappers } from "../components/styled-components";
import SideBannerImg from '../assets/side-banner.svg'
const RowWrappers = styled.div`
display: flex;
width: 100%;
`
const Video = styled.div`

`
const ChartContainer = styled.div`

`
const BottmChartContainer = styled.div`

`
const ContentContainer = styled.div`
display: flex;
flex-direction: column;
padding: 10vh 20vh;
`
const Result = () => {

    return (
        <>
            <RowWrappers>
                <Col style={{ backgroundImage: `url(${SideBannerImg})`, height: '100vh', width: '20%', color: '#fff', fontWeight: 'bold' }}>
                    <Col style={{ margin: 'auto', alignItems: 'center', rowGap: '0.5rem' }}>
                        <Text2>1a2b3c4d</Text2>
                        <Text2>검사결과</Text2>
                        <Text2>VIEW</Text2>
                    </Col>

                </Col>
                <ContentContainer>
                    <Row>
                        <Video>a</Video>
                        <ChartContainer>s</ChartContainer>
                    </Row>
                    <BottmChartContainer>d</BottmChartContainer>
                </ContentContainer>
            </RowWrappers>
        </>
    )
}
export default Result;