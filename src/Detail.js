import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';


let Box = styled.div`
    padding: 20px;
`;

let Title = styled.h4`
    font-size: 25px;
`;

function Alert() {
    return (
        <div className="my-alert-yellow">
            <p>재고가 얼마 남지 않았습니다</p>
        </div>
    );
}
function Detail(props) {

    let { id } = useParams();
    let history = useHistory();
    let [ alert, alertChange ] = useState(true);
    let [ inputValue, inputValueChange ] = useState('');

    useEffect(()=>{
        let timer = setTimeout(()=>{ alertChange(false); }, 2000);
        return ()=>{
            clearTimeout(timer);
        }
    }, [alert]);

    return (
        <div className="container">
            <Box>
                <Title className="red">Detail</Title>
            </Box>

            <h4>{ inputValue }</h4>
            <input onChange={(e)=>{ inputValueChange(e.target.value) }} />

            {
                alert === true
                ? <Alert />
                : null
            }
            
            <div className="row">
                <div className="col-md-6">
                    <img src={'https://codingapple1.github.io/shop/shoes' + (id*1+1) +'.jpg'} alt="" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{ props.shoes[id]['title'] }</h4>
                    <p>{ props.shoes[id]['content'] }</p>
                    <p>{ props.shoes[id]['price'] }</p>

                    <Stock stocks={props.stocks} id={id} />

                    <button className="btn btn-danger" onClick={()=>{
                        let tmpArr = [...props.stocks];
                        tmpArr[id]--;
                        props.stocksChange(tmpArr);
                    }}>주문하기</button>                     
                    <button className="btn btn-secondary" onClick={()=>{ history.goBack() }}>뒤로가기</button> 
                </div>
            </div>
        </div>  
    );
}

function Stock(props) {
    return(
        <p>재고 : {props.stocks[props.id]}</p>
    );
}

export default Detail;