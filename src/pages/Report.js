import styled from "styled-components";
import { Col, Row, Text2, Wrappers } from "../components/styled-components";
import SideBannerImg from '../assets/side-banner.svg'
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { excelDownload, returnMoment } from "../utils/utils";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import _ from "lodash";

const RowWrappers = styled.div`
display: flex;
width: 100%;
`
const ContentContainer = styled.div`
display: flex;
flex-direction: column;
padding: 2.5vh 5vw;
width:70vw;
row-gap: 2rem;
`
const Table = styled.table`
border-collapse: collapse;
text-align: center;
`
const THead = styled.thead`

`
const TBody = styled.tbody`

`
const Tr = styled.tr`

`
const Td = styled.td`
border: 1px solid #ccc;
padding:0.25rem;
`
const CarNumber = styled.div`
cursor: pointer;
transition: 0.3s;
&:hover{
    color: #A5CDC3;
}
`
const BoderTextContainer = styled.div`
border:1px solid #ccc;
padding: 0.2rem 0.5rem;
`
const SmallButton = styled.label`
background-color: ${props => props.theme.color.background};
cursor: pointer;
color: #fff;
padding: 0.25rem 0.5rem;
border-radius: 0.25rem;
`
const Report = () => {

    const navigate = useNavigate();

    const rowColumns = [
        {
            label: '인덱스',
            column: 'idx',
            action: (row, idx) => {
                return idx + 1
            }
        },
        {
            label: '차량번호',
            column: 'carNumber',
            action: (row, idx) => {
                return <CarNumber onClick={() => {
                    navigate(`/result/${row.carNumber}`)
                }}>
                    {row.carNumber}
                </CarNumber>
            }
        },
        {
            label: '단차',
            column: 'gap',
            action: (row, idx) => {
                return row.gap
            }
        },
        {
            label: '외관손상',
            column: 'exterior',
            action: (row, idx) => {
                return row.exterior
            }
        },
        {
            label: '스크래치',
            column: 'scratch',
            action: (row, idx) => {
                return row.scratch
            }
        },
        {
            label: '장착불량',
            column: 'installation',
            action: (row, idx) => {
                return row.installation
            }
        },
        {
            label: '총갯수',
            column: 'totalDefects',
            action: (row, idx) => {
                return row.totalDefects
            }
        },
    ]
    const [reports, setReports] = useState([]);
    const [date, setDate] = useState('');
    const [curDate, setCurDate] = useState('');
    useEffect(() => {
        getReportData(returnMoment().substring(0, 10));
    }, [])

    const getReportData = async (dat) => {
        setDate(dat);
        setCurDate(dat);
        try {
            setReports(undefined);
            const { data: response } = await axios.get(`/api/report/${dat}`);

            setReports(response);
        } catch (err) {
            console.log(err)
            toast.error(err?.response?.data + ` (${err?.response?.status})`);
            setReports([]);
        }
    }
    const onDownloadExcel = async () => {
        let result = await excelDownload(reports, rowColumns)
    }
    return (
        <>
            <RowWrappers>
                <Col style={{ backgroundImage: `url(${SideBannerImg})`, height: '100vh', width: '20vw', color: '#fff', fontWeight: 'bold', minWidth: '200px' }}>
                    <Col style={{ margin: 'auto', alignItems: 'center', rowGap: '0.5rem' }}>
                        <Text2>{curDate.split('-')[0]}년</Text2>
                        <Text2>{curDate.split('-')[1]}월 {curDate.split('-')[2]}일</Text2>
                        <Text2>검사 결과</Text2>
                        <Text2>보고서</Text2>
                    </Col>
                </Col>
                <ContentContainer>
                    <Row style={{ columnGap: '0.5rem', alignItems: 'center' }}>
                        {/* <BoderTextContainer>
                            {date.split('-')[0]}년
                        </BoderTextContainer>
                        <BoderTextContainer>
                            {date.split('-')[1]}월
                        </BoderTextContainer>
                        <BoderTextContainer>
                            {date.split('-')[2]}일
                        </BoderTextContainer> */}
                        <TextField
                            type="date"
                            size="small"
                            value={date}
                            onChange={(e) => {
                                getReportData(e.target.value)
                            }}
                        />
                        <SmallButton>
                            날짜선택
                        </SmallButton>
                        <Row>
                            총 검사 개수: {reports?.length}개
                        </Row>
                        <Row>
                            불량 차량 개수: {reports?.filter(item => item?.totalDefects > 0)?.length ?? 0}개
                        </Row>
                        <SmallButton style={{ marginLeft: 'auto' }}
                            onClick={onDownloadExcel}>
                            다운로드
                        </SmallButton>
                    </Row>
                    {reports ?
                        <>
                            <Table>
                                <THead>
                                    <Tr>
                                        {rowColumns.map(row => (
                                            <>
                                                <Td>{row.label}</Td>
                                            </>
                                        ))}
                                    </Tr>
                                </THead>
                                <TBody>
                                    {reports.map(((item, index) => (
                                        <>
                                            <Tr>
                                                {rowColumns.map(row => (
                                                    <>
                                                        <Td>{row.action(item, index)}</Td>
                                                    </>
                                                ))}
                                            </Tr>
                                        </>
                                    )))}
                                </TBody>
                            </Table>
                        </>
                        :
                        <>

                        </>}

                </ContentContainer>
            </RowWrappers>
        </>
    )
}
export default Report;