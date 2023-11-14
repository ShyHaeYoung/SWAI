import styled from "styled-components";
import { Col, Row, Text2, Wrappers } from "../components/styled-components";
import SideBannerImg from '../assets/side-banner.svg'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, BarElement, LinearScale, CategoryScale } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Title,
    BarElement,
    LinearScale,
    CategoryScale,
);

const RowWrappers = styled.div`
display: flex;
width: 100%;
`
const BorderContainer = styled.div`
width: 100%;
display: flex;
border:1px solid #ccc;
flex-wrap: wrap;
`
const ChartContainer = styled.div`

`
const BottmChartContainer = styled.div`
`
const ContentContainer = styled.div`
display: flex;
flex-direction: column;
padding: 2.5vh 5vw;
width:70vw;
row-gap: 2rem;
`
const DonutContainer = styled.div`
width: 40%;
`
const DataSection = styled.div`
border: 1px solid #ccc;
height: 100%;
display: flex;
`
const CarImg = styled.img`

`
const Result = () => {

    const navigate = useNavigate();
    const params = useParams();
    const donut_data = {
        labels: [],
        labelSuffix: "%",
        datasets: [
            {
                label: '차량 정보',
                data: [],
                backgroundColor: ['#f7efef', '#f8e0df', '#f6c6c4', '#f5ae8f', '#f2c096', '#e6a975', '#f7c15f', '#ffa700', '#ec8733', '#f06d00'],
                borderColor: ['#f7efef', '#f8e0df', '#f6c6c4', '#f5ae8f', '#f2c096', '#e6a975', '#f7c15f', '#ffa700', '#ec8733', '#f06d00'],
                borderWidth: 1,

            },

        ],

    };
    const donut_options = {
        plugins: {
            datalabels: {
                backgroundColor: function (context) {
                    return context.dataset.backgroundColor;
                },
                formatter: (val, context) => `${val}ㄴ개`,
                borderRadius: 25,
                borderWidth: 3,
                color: "black",
                font: {
                    weight: "bold"
                },
                padding: 6
            },
            tooltip: {
                callbacks: {
                    label: (ttItem) => `${ttItem.parsed}개`
                }
            }
        }
    }

    const [donutObj, setDonutObj] = useState(donut_data ?? {})
    const [carData, setCarData] = useState({});
    useEffect(() => {
        getResultData();
    }, [])

    const getResultData = async () => {
        try {
            const { data: response } = await axios.get(`/api/inspection/result/${params?.carNumber}`);
            setCarData(response);
            let car_donut_list = [];
            car_donut_list.push(response?.scratch)
            car_donut_list.push(response?.installation)
            car_donut_list.push(response?.exterior)
            car_donut_list.push(response?.gap)
            setDonutObj({
                ...donut_data,
                labels: ['스크래치', '장착불량', '외관손상', '단차'],
                datasets: [
                    {
                        ...donut_data.datasets[0],
                        data: car_donut_list
                    },

                ],
            });
        } catch (err) {
            console.log(err)
            toast.error(err?.response?.data);
            setTimeout(() => {
                navigate(-1);
            }, 500);
        }
    }
    return (
        <>
            <RowWrappers>
                <Col style={{ backgroundImage: `url(${SideBannerImg})`, minHeight: '100vh', width: '20vw', color: '#fff', fontWeight: 'bold' }}>
                    <Col style={{ margin: 'auto', alignItems: 'center', rowGap: '0.5rem' }}>
                        <Text2>{carData?.carNumber}</Text2>
                        <Text2>검사결과</Text2>
                        <Text2>VIEW</Text2>
                    </Col>
                </Col>
                <ContentContainer>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <BorderContainer>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((image, idx) => (
                                <>
                                    {carData?.imageUrlList && carData?.imageUrlList[idx] ?
                                        <>
                                            <CarImg src={carData?.imageUrlList[idx]} style={{ width: `${100 / 4}%`, height: '12vw' }} />
                                        </>
                                        :
                                        <>
                                            <Col style={{ width: `${100 / 4}%`, height: '12vw' }}>
                                                <DataSection>
                                                    <div style={{ margin: 'auto' }}>
                                                        사진 없음
                                                    </div>
                                                </DataSection>
                                            </Col>
                                        </>}
                                </>
                            ))}
                        </BorderContainer>
                    </Row>
                    <Row style={{ alignItems: 'center', columnGap: '1rem' }}>
                        <BorderContainer style={{ justifyContent: 'space-around', padding: '1rem 0' }}>
                            <div style={{ margin: 'auto' }}>
                                <Doughnut data={donutObj.labels.length > 0 ? donutObj : donut_data} options={donut_options} />
                            </div>
                            <Col style={{ margin: 'auto', rowGap: '0.5rem' }}>
                                <div>스크래치가 {carData?.scratch}개 발견되었습니다.</div>
                                <div>장착불량가 {carData?.installation}개 발견되었습니다.</div>
                                <div>외관손상가 {carData?.exterior}개 발견되었습니다.</div>
                                <div>단차가 {carData?.gap}개 발견되었습니다.</div>
                                <div>총 불량개수가 {carData?.totalDefects}개 발견되었습니다.</div>
                            </Col>
                        </BorderContainer>
                    </Row>
                </ContentContainer>
            </RowWrappers>
        </>
    )
}
export default Result;