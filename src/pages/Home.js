import styled from 'styled-components';
import BannerImg from '../assets/banner.svg'
import { Col, Input, LongButton, OpacityButton, Row, SmallButton, Text1, Text3, Text4, Wrappers } from '../components/styled-components';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

const Banner = styled.div`
display: flex;
flex-direction: column;
color: #fff;
align-items: center;
margin:1rem;
`
const StepTitle = styled.div`
text-align: left;
padding: 0.5rem 0;
border-bottom: 1px solid #000;
margin-bottom: 0.5rem;
max-width: 150px;
`
const ExplainContainer = styled.div`
display: flex;
padding: 5vh 5%;
background: #ffffff29;
justify-content: space-between;
width: 90%;
align-items: center;
@media screen and (max-width: 800px){
    flex-direction:column;
}
`
const TextContainer = styled.div`
display: flex;
justify-content: space-between;
width: 85%;
@media screen and (max-width: 800px){
    flex-direction:column;
}
`
const Home = () => {

    const navigate = useNavigate();
    const [content, setContent] = useState(undefined);
    const [carNumber, setCarNumber] = useState("");
    const [url, setUrl] = useState("");
    const addFile = (e) => {
        if (e.target.files[0]) {
            setContent(e.target.files[0]);
            setUrl(URL.createObjectURL(e.target.files[0]))
        }
        $('#file1').val("");
    };
    const onClickNextStep = async () => {
        navigate('/result', {
            state: {
                carNumber,
            }
        })
    }
    return (
        <>
            <Wrappers>
                <Banner style={{ backgroundImage: `url(${BannerImg})` }}>
                    <Text1 style={{ paddingTop: '12vh' }}>샌드위치AI</Text1>
                    <Text3 style={{ opacity: '0.7', paddingTop: '1rem' }}>AI를 통한 자동차 부품 품질 결함 유무 판별</Text3>
                    <Text4 style={{ opacity: '0.5', padding: '10vh' }}>presented by team sandwich</Text4>
                    <ExplainContainer>
                        <OpacityButton>사용방법</OpacityButton>
                        <TextContainer>
                            <Col style={{ maxWidth: '150px' }}>
                                <StepTitle>STEP 1</StepTitle>
                                <Text4>아래의 업로드 버튼을 눌러 차체
                                    를 360°로 촬영한 영상을 업로
                                    드한다.</Text4>
                            </Col>
                            <Col style={{ maxWidth: '150px' }}>
                                <StepTitle>STEP 2</StepTitle>
                                <Text4>업로드 후 나오는 페이지에서 AI
                                    가 해당 부품의 결함 유무를 판별
                                    할 때까지 기다린다.</Text4>
                            </Col>
                            <Col style={{ maxWidth: '150px' }}>
                                <StepTitle>STEP 3</StepTitle>
                                <Text4>판별 후 품질 결함이 있는 부품이
                                    체크된 영상이 나온다.</Text4>
                            </Col>
                            <Col style={{ maxWidth: '150px' }}>
                                <StepTitle>STEP 4</StepTitle>
                                <Text4>결함 부품의 개수, 불량 사유 등과
                                    함께 결과에 대한 리포트가 나온다.</Text4>
                            </Col>
                        </TextContainer>
                    </ExplainContainer>
                </Banner>
                <Col style={{ margin: '2rem auto', width: '100%' }}>
                    <Row style={{ margin: '1rem auto', alignItems: 'center', columnGap: '1rem' }}>
                        <SmallButton>차량 번호 입력</SmallButton>
                        <TextField
                            size='small'
                            value={carNumber}
                            onChange={(e) => {
                                setCarNumber(e.target.value)
                            }}
                        />
                    </Row>
                    <LongButton style={{ margin: '0 auto' }} for="file1">파일 업로드</LongButton>
                    <div>
                        <input type="file" id="file1" onChange={addFile} style={{ display: 'none' }} />
                    </div>

                    {content &&
                        <>
                            <img src={url} alt="#"
                                style={{
                                    width: 'auto', height: '150px',
                                    margin: '1rem auto'
                                }} />
                            <Button style={{ margin: '1rem auto', width: '80%', maxWidth: '500px' }} variant='outlined' onClick={onClickNextStep}>확인</Button>
                        </>}
                </Col>
            </Wrappers>
        </>
    )
}
export default Home;