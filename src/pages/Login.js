import React, {Component} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from "primereact/button";

export default class Login extends Component {

	render() {
		return <div className="login-body">

			<div className="login-panel"></div>

			<div className="login-content">
				<img src="assets/layout/images/logo-black.png" alt="babylon-layout"/>

				<h1><span>SIGN IN</span> TO BABYLON</h1>
				<p>Welcome, please use the form to sign-in.</p>

				<div className="login-input-wrapper">
					<InputText placeholder="Username"/>
				</div>

				<div className="login-input-wrapper">
					<InputText placeholder="Password"/>
				</div>

				<Button label="Sign In" onClick={() => {window.location = "/#"}} />
			</div>
		</div>
	}
}