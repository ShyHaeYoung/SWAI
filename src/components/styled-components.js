import styled from "styled-components";

export const Wrappers = styled.div`
display: flex;
flex-direction: column;
width: 100%;
`
export const Row = styled.div`
display: flex;
`
export const Col = styled.div`
display: flex;
flex-direction: column;
`
export const LongButton = styled.label`
cursor: pointer;
background-color: ${props => props.theme.color.background};
width: 80%;
text-align: center;
padding: 0.5rem 0;
border-radius: 0.1rem;
color: #fff;
max-width: 500px;
cursor: pointer;
`
export const SmallButton = styled.div`
background-color: ${props => props.theme.color.background};
cursor: pointer;
color: #fff;
padding: 0.25rem 0.5rem;
border-radius: 0.25rem;
`
export const OpacityButton = styled.div`
border:1px solid #000;
border-radius: 1rem;
padding: 0.25rem 0.5rem;
`
export const Input = styled.input`

`
export const Text1 = styled.div`
font-size: 64px;
`

export const Text2 = styled.div`

`

export const Text3 = styled.div`

`
export const Text4 = styled.div`
font-size: 12px;
`
