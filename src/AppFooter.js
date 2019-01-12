import React, {Component} from 'react';

export class AppFooter extends Component {

	render() {
		return <div className="layout-footer">
			<div className="p-grid">
				<div className="p-col-6">
					<a href="/" className="logo-container">
						<img src="assets/layout/images/logo-black.png" alt="babylon-layout"/>
					</a>
				</div>
				<div className="p-col-6 footer-icons">
					<a>
						<i className="pi pi-home"/>
					</a>
					<a>
						<i className="pi pi-globe"/>
					</a>
					<a>
						<i className="pi pi-envelope"/>
					</a>
				</div>
			</div>
		</div>
	}
}