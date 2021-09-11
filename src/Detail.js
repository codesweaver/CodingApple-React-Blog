import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import { stocksContext } from './App.js';
import { Nav } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';

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
    let [ tabs, tabsChange ] = useState(0);
    let [ animationSwitch, animationSwitchChange ] = useState(false);

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
            
            <Nav className="mt-5" defaultActiveKey="link-0" variant="tabs">
                <Nav.Item as="li">
                    <Nav.Link eventKey="link-0" onClick={()=>{ tabsChange(0); animationSwitchChange(false); }}>Tabs1</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link eventKey="link-1" onClick={()=>{ tabsChange(1); animationSwitchChange(false); }}>Tabs2</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link eventKey="link-2" onClick={()=>{ tabsChange(2); animationSwitchChange(false); }}>Tabs3</Nav.Link>
                </Nav.Item>
            </Nav>
            <CSSTransition classNames="wow" in={animationSwitch} timeout={500} animationSwitchChange={animationSwitchChange}>
                <TabContents tabs={tabs} />
            </CSSTransition>
        </div>  
    );
}

function TabContents(props) {

    useEffect(()=>{
        props.animationSwitchChange(true);
    });

    switch(props.tabs) {
        case 0: return(<div>Tabs1</div>); break;
        case 1: return(<div>Tabs2</div>); break;
        case 2: return(<div>Tabs3</div>); break;
    }
}

function Stock(props) {

    let test = useContext(stocksContext);

    return(
        <p>재고 : {props.stocks[props.id]}</p>
    );
}

export default Detail;