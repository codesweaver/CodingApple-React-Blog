import React from "react";
import { Table } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from "react-redux";



function Cart() {

    let state = useSelector((state)=>state);
    let dispatch = useDispatch();

    return(
        <div>
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경</th>
                </tr>
            </thead>
            <tbody>
            {
                state.reducer.map((shoes, i)=>{
                    return (
                        <tr key={i}>
                            <td>{shoes.productId}</td>
                            <td>{shoes.productName}</td>
                            <td>{shoes.productQuantity}</td>
                            <td>
                                <button onClick={()=>{ dispatch({type:"plus", id:shoes.productId}) }}>+</button>
                                <button onClick={()=>{ dispatch({type:"minus", id:shoes.productId}) }}>-</button>
                            </td>
                        </tr>
                    );
                })
            }
            </tbody>
            </Table>

            {            
                state.alertReducer === true
                ? <div className="my-alert-yellow">
                    <p>지금 구매하시면 신규할인 20%</p>
                    <button onClick={()=>{ dispatch({type:"close"}) }}>닫기</button>
                </div>
                : null
            }
        
        </div>
    );
}

// function stateToProps(state) { // state: index.js 있는 store의 값을 가져와서 props로 만들어줍니다.
//     return {
//         state: state.reducer,
//         alertState: state.alertReducer
//     }
// }

// export default connect(stateToProps)(Cart);

export default Cart;