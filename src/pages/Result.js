import styled from "styled-components";
import { Col, Row, Text2, Wrappers } from "../components/styled-components";
import SideBannerImg from '../assets/side-banner.svg'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, BarElement, LinearScale, CategoryScale } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

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
width: 40vw;
height: 30vh;
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
padding: 5vw 20vh;
width:60vw;
justify-content: space-between;
`
const DonutContainer = styled.div`
width: 40%;
`
const DataSection = styled.div`
border: 1px solid #ccc;
height: 100%;
display: flex;
`
const Result = () => {

    const location = useLocation();

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
        const { data: response } = await axios.get(`/api/dummy-data/${location.state?.carNumber}`);
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

    }
    return (
        <>
            <RowWrappers>
                <Col style={{ backgroundImage: `url(${SideBannerImg})`, height: '100vh', width: '20vw', color: '#fff', fontWeight: 'bold' }}>
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
                                    <Col style={{ width: `${100 / 4}%` }}>
                                        <DataSection>
                                            <div style={{ margin: 'auto' }}>
                                                사진 {idx + 1}
                                            </div>
                                        </DataSection>
                                    </Col>
                                </>
                            ))}
                        </BorderContainer>
                        <DonutContainer>
                            <Doughnut data={donutObj.labels.length > 0 ? donutObj : donut_data} options={donut_options} />

                        </DonutContainer>
                    </Row>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', columnGap: '1rem' }}>
                        <BorderContainer >
                            <Col style={{ margin: 'auto', rowGap: '0.5rem' }}>
                                <div>스크래치: {carData?.scratch}</div>
                                <div>장착불량: {carData?.installation}</div>
                                <div>외관손상: {carData?.exterior}</div>
                                <div>단차: {carData?.gap}</div>
                                <div>총 불량개수: {carData?.totalDefects}</div>
                            </Col>
                        </BorderContainer>
                        <BorderContainer>
                            <div style={{ margin: 'auto' }}>미구현</div>
                        </BorderContainer>
                    </Row>
                </ContentContainer>
            </RowWrappers>
        </>
    )
}
export default Result;