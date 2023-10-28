import styled from "styled-components";
import { Col, Row, Text2, Wrappers } from "../components/styled-components";
import SideBannerImg from '../assets/side-banner.svg'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, BarElement, LinearScale, CategoryScale } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

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
const Video = styled.div`
width: 20vw;
height: 20vh;
background-color: blue;
color: #fff;
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
const Result = () => {

    const location = useLocation();

    const donut_data = {
        labels: [],
        labelSuffix: "%",
        datasets: [
            {
                label: '# of Votes',
                data: [12, 14],
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
                formatter: (val, context) => `${val}%`,
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
                    label: (ttItem) => `${ttItem.label}: ${ttItem.parsed}%`
                }
            }
        }
    }
    const bar_options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    }

    const bar_data = {
        labels: ['#1', '#2'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [12, 36],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ]
    };

    const [donutObj, setDonutObj] = useState(donut_data ?? {})
    const [barObj, setBarObj] = useState(bar_data ?? {})
    const [carObj, setCarObj] = useState({})

    useEffect(() => {
        setCarObj({ ...location.state })
    }, [])
    return (
        <>
            <RowWrappers>
                <Col style={{ backgroundImage: `url(${SideBannerImg})`, height: '100vh', width: '20vw', color: '#fff', fontWeight: 'bold' }}>
                    <Col style={{ margin: 'auto', alignItems: 'center', rowGap: '0.5rem' }}>
                        <Text2>{carObj?.carNumber}</Text2>
                        <Text2>검사결과</Text2>
                        <Text2>VIEW</Text2>
                    </Col>

                </Col>
                <ContentContainer>
                    <Row style={{ justifyContent: 'space-between' }}>
                        <Video>비디오</Video>
                        <ChartContainer>
                            <Bar data={barObj.labels.length > 0 ? barObj : bar_data} options={bar_options} />
                        </ChartContainer>
                    </Row>
                    <BottmChartContainer>
                        <DonutContainer>
                        <Doughnut data={donutObj.labels.length > 0 ? donutObj : donut_data} options={donut_options} />

                        </DonutContainer>
                    </BottmChartContainer>
                </ContentContainer>
            </RowWrappers>
        </>
    )
}
export default Result;