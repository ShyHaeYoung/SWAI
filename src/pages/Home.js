import styled from 'styled-components';
import BannerImg from '../assets/banner.svg'
import { Col, Input, LongButton, OpacityButton, Row, SmallButton, Text1, Text3, Text4, Wrappers } from '../components/styled-components';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import ExampleImgSrc from '../assets/example.jpg'
import { serialize } from 'object-to-formdata';
import axios from 'axios';
import toast from 'react-hot-toast';
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
width:100%;
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
align-items: flex-start;
@media screen and (max-width: 800px){
    flex-direction:column;
}
`
const ExampleImg = styled.img`
position: absolute;
width:300px;
left: 0;
top: -200px;
`
const Home = () => {

    const navigate = useNavigate();
    const [content, setContent] = useState([]);
    const [carNumber, setCarNumber] = useState("");
    const [url, setUrl] = useState([]);
    const [showExampleImg, setShowExampleImg] = useState(false);
    const addFile = (e) => {
        let files = [...e.target.files];
        for (var i = 0; i < files.length; i++) {
            if (!(files[i]?.type == 'image/jpeg' || files[i]?.type == 'image/png')) {
                toast.error('png 또는 jpeg 파일 형식만 업로드 가능합니다.');
                $('#file1').val("");
                return;
            }
        }
        setContent([...content, ...files])
        if (files.length > 0) {
            let url_list = files.map((file) => {
                return URL.createObjectURL(file)
            })
            setUrl([...url, ...url_list])
        }
    };
    const onClickNextStep = async () => {
        if (!carNumber) {
            toast.error('차량번호를 입력해 주세요.');
            return;
        }
        if (content.length == 0) {
            toast.error('차량 이미지 파일을 업로드 해주세요.');
            return;
        }
        try {
            let obj = {
                carNumber,
                imageList: content,
            }
            let formData = new FormData();
            let form_data_options = {
                indices: true,
            }
            formData = serialize(obj, form_data_options);
            const response = await axios.post(`/api/inspection`, formData);
            if (response?.status == 201) {
                navigate(`/result/${carNumber}`)
            }
        } catch (err) {
            console.log(err);
            if (err?.response?.status == 400) {
                toast.error('차량번호가 중복됩니다.' + ` (${err?.response?.status})`);
            }
            return;
        }
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
                            <Col style={{ maxWidth: '150px', alignItems: 'flex-start', position: 'relative' }}>
                                <OpacityButton style={{ width: 'auto' }} onMouseOver={() => {
                                    setShowExampleImg(true);
                                }}
                                    onMouseLeave={() => {
                                        setShowExampleImg(false);
                                    }}
                                >예시</OpacityButton>
                                <StepTitle>STEP 1</StepTitle>
                                <Text4>아래의 업로드 버튼을 눌러 예시와 같은 각도로 챠랑을 찍은 이미지들을 업로드한다.</Text4>
                                <ExampleImg src={ExampleImgSrc} style={{ display: `${showExampleImg ? 'flex' : 'none'}` }} />
                            </Col>
                            <Col style={{ maxWidth: '150px' }}>
                                <StepTitle style={{ marginTop: '31px' }}>STEP 2</StepTitle>
                                <Text4>업로드 후 나오는 페이지에서 AI
                                    가 해당 부품의 결함 유무를 판별
                                    할 때까지 기다린다.</Text4>
                            </Col>
                            <Col style={{ maxWidth: '150px' }}>
                                <StepTitle style={{ marginTop: '31px' }}>STEP 3</StepTitle>
                                <Text4>판별 후 품질 결함이 있는 부품이 체크된 이미지가 나온다.</Text4>
                            </Col>
                            <Col style={{ maxWidth: '150px' }}>
                                <StepTitle style={{ marginTop: '31px' }}>STEP 4</StepTitle>
                                <Text4>보고서 페이지로 넘어가면 오늘의 검사결과를 볼 수 있고
                                    차량번호를 클릭하면 해당 차량의
                                     상세 결과 페이지로 넘어갈 수 있다.</Text4>
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
                        <input type="file" id="file1" multiple={true} onChange={addFile} style={{ display: 'none' }} />
                    </div>
                    {content.length > 0 &&
                        <>
                            <Row style={{ flexWrap: 'wrap' }}>
                                {url && url.map(item => (
                                    <img src={item} alt="#"
                                        style={{
                                            width: 'auto', height: '150px',
                                            margin: '1rem'
                                        }} />
                                ))}
                            </Row>
                            <Button style={{ margin: '1rem auto', width: '80%', maxWidth: '500px' }} variant='outlined' onClick={onClickNextStep}>확인</Button>
                        </>}
                </Col>
            </Wrappers>
        </>
    )
}
export default Home;