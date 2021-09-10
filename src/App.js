import React, { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import Data from './data.js';
import './App.css';
import Detail from './Detail.js';
import axios from 'axios';

import { Link, Route, Switch } from 'react-router-dom';

function Jumbotron() {
  return (
    <div className="Jumbotron">
      <h1>20% Season Off</h1>
      <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information</p>
      <Button variant="primary">Learn more</Button>
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.shoes['id']+1) + '.jpg'} alt="" />
      <h4>{props.shoes['title']}</h4>
      <p>{props.shoes['content']} & {props.shoes['price']}</p>
    </div>
  );
}

function App() {

  let [ shoes, shoesChange ] = useState(Data);
  let [ stocks, stocksChange ] = useState([10, 5, 13]);


  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <Jumbotron></Jumbotron>
          <div className="container">
            <div className="row">
              {
                shoes.map((s, i)=>{
                  return <Card shoes={s} i={i} key={i} />
                })
              }
            </div>
            <button className="btn btn-primary" onClick={()=>{

              // show loading 

              axios.get("https://codingapple1.github.io/shop/data2.json")
                .then((result)=>{
                  shoesChange([...shoes, ...result.data]);
                  // delete loading ui
                 });              
            }}>더보기</button>
          </div>
        </Route>

        <Route path="/detail/:id">
          <Detail shoes={shoes} stocks={stocks} stocksChange={stocksChange} />
        </Route>

        <Route path="/:id">
          <div>아무거나 여기 보여주셈</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
