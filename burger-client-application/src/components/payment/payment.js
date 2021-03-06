/*
	UI Component to show payment web page
*/
import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {
  withRouter,

} from 'react-router-dom'

import axios from 'axios';
import {paymentUrl} from '../../actions/urlConstant';


import * as paymentActions from '../../apis/payment-api';
import { axiosGetAll, axiosCreatePayment} from '../../apis/payment-api'

import '../../index.css';
import '../../stylesheets/payment.css';
// import '../../stylesheets/bootstrap.min.css'

import Header from '../header';

class payment extends Component {
	constructor(props){
		super(props);
		this.state={
			orderId: 10,
			totalAmount: 314,

		}
		this.handleButton = this.handleButton.bind(this);
		this.handleBackButton = this.handleBackButton.bind(this);

	}

	componentDidMount = () => {
		console.log('componentDidMount ---')
		// this.props.PaymentGetAll();

		const user = JSON.parse(localStorage.getItem('user'));
		if (user == null) {
				alert("You are not logged in!");
				this.props.history.push('/login');
		}


		const orderId = localStorage.getItem('orderId');

		// check for null
		if(orderId != null) {
			this.props.PaymentGetOrderDetail(orderId);
		} else {
			console.log('   localStorage orderId is null')
		}
		

		// axios.get(`${paymentUrl}/payments` )
    // .then( res => {
    //   console.log('after axiosGetAll, res:', res);

		// 	// dispatch(getAll(res.data));
		// 	this.props.PaymentGetAll(res.data)
    // }).catch( res => {
    //   console.log('xx  error axiosGetAll, error:', res);
    // })


	}

	handleButton(event) {
		event.preventDefault();
		console.log(`handleButton orderId=${this.state.orderId}, totalAmount=${this.state.totalAmount}`);

		const user = JSON.parse(localStorage.getItem('user'));
		
		var userId = "0";
		if (user != null) {
			userId = user.id
		}

		const data = {
			userId,
			orderId: this.props.orderDetail.orderId,
			totalAmount: this.props.orderDetail.totalAmount,
		}

		console.log('handleButton data=', data);

		this.props.PaymentCreate(data, this.props.history);
	}

	handleBackButton(event) {
		event.preventDefault();
    console.log(`handleButton go back home`);
    
    this.props.history.push('/');
	}

	render() {
		return (
			<div className="menu-home">
				<div className="outerdiv">
					<Header />

						<div className="content payment">
							<div className="card center">
								<h2 id="center">Payment Overview</h2>

								{
									localStorage.getItem('orderId') == null ? (
										<div>
											<div class="payment-alert warning">
												<strong>Hey!</strong> You have no items in the Cart. <br />Please add some to the cart. 🙏
											</div>

											<div className="btn-container">
												{/* <button onClick={this.handleButton}>Pay for your order</button> */}
												<input type="button" className="back_button" value="Go back to Home" onClick={this.handleBackButton} />
											</div>
										</div>
									) : (
										<div>
											<h3>Order Summary</h3>
											<table>
												<tbody>
													<tr>
														<td>Order Id:</td>
														<td>{this.props.orderDetail.orderId}</td>
													</tr>
													<tr>
														<td>Total Amount:</td>
														<td>$ {this.props.orderDetail.totalAmount}</td>
													</tr>
												</tbody>
											</table>
											
											<h3>Enter your address</h3>
											<form>
												<label>Address</label>
												<input className="paymentInputText" type="text" id="address" name="address" />
												<label>City</label>
												<input className="paymentInputText" type="text" id="city" name="city" />
												<label>Zipcode</label>
												<input className="paymentInputText" type="text" id="zipcode" name="zipcode" />
											</form>
											
											<h3>Enter your payment method</h3>
											<form>
												<label>Card Number</label>
												<input className="paymentInputText" type="text" id="cardnumber" name="cardnumber" />
												<label>Name on Card</label>
												<input className="paymentInputText" type="text" id="nameoncard" name="nameoncard" />
												<label>Expiration Date (mmddyyyy) </label>
												<input className="paymentInputText" type="text" id="expiration" name="expiration" />
											</form>

											<div className="btn-container">
												{/* <button onClick={this.handleButton}>Pay for your order</button> */}
												<input type="button" className="payment_button" value="Pay for your order" onClick={this.handleButton} />
											</div>		
										</div>							
									)
								}



							</div>
						</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.payment.data,
		orderDetail: state.payment.orderDetail,

	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		PaymentGetAll: () => { dispatch(paymentActions.axiosGetAll()); },
		PaymentCreate: (data, router) => { dispatch(paymentActions.axiosCreatePayment(data, router));},
		PaymentGetOrderDetail: (orderId) => { dispatch(paymentActions.axiosGetOrder(orderId)); },

	}
}

// function mapDispatchToProps (dispatch) {
// 	return bindActionCreators({
// 		PaymentGetAll: paymentActions.getAll,
// 	}, dispatch)
// }

// function mapDispatchToProps(dispatch) {
// 	return bindActionCreators({
// 			updateMenuList: updateMenuList
// 	}, dispatch)
// }


const connectedPayment = withRouter(connect(mapStateToProps, mapDispatchToProps)(payment));

export default connectedPayment;
