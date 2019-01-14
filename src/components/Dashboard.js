import React, {Component} from 'react';
import {CarService} from '../service/CarService';
import {Checkbox} from 'primereact/components/checkbox/Checkbox';
import {Button} from 'primereact/components/button/Button';
import {InputText} from 'primereact/components/inputtext/InputText';
import {InputTextarea} from 'primereact/components/inputtextarea/InputTextarea';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
import {Chart} from 'primereact/chart';
import {Menu} from 'primereact/menu';
import {FullCalendar} from 'primereact/fullcalendar';

export class Dashboard extends Component {

	constructor() {
		super();
		this.state = {
			tasks: [],
			city: null,
			selectedCar: null
		};
		this.onTaskChange = this.onTaskChange.bind(this);
		this.carservice = new CarService();
	}

	onTaskChange(e) {
		let selectedTasks = [...this.state.tasks];
		if (e.checked)
			selectedTasks.push(e.value);
		else
			selectedTasks.splice(selectedTasks.indexOf(e.value), 1);

		this.setState({tasks: selectedTasks});
	}

	componentDidMount() {
		this.carservice.getCarsMedium().then(data => this.setState({cars: data}));
	}

	actionTemplate(){
		return <div className="p-grid">
			<div className="p-col-6">
				<Button type="button" icon="pi pi-search" className="p-button-info" style={{marginRight: '.5em'}}></Button>
			</div>
			<div className="p-col-6">
				<Button type="button" icon="pi pi-times" className="p-button-danger"></Button>
			</div>
		</div>;
	}

	logoTemplate(rowData, column){
		var src = "assets/demo/images/car/" + rowData.brand + ".png";
		return <img src={src} alt={rowData.brand} width="50px" />;
	}

	render() {
		let fullcalendarOptions = {
			defaultDate: '2017-02-01',
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			}
		};

		let events = [
			{
				"id": 1,
				"title": "All Day Event",
				"start": "2017-02-01"
			},
			{
				"id": 2,
				"title": "Long Event",
				"start": "2017-02-07",
				"end": "2017-02-10"
			},
			{
				"id": 3,
				"title": "Repeating Event",
				"start": "2017-02-09T16:00:00"
			},
			{
				"id": 4,
				"title": "Repeating Event",
				"start": "2017-02-16T16:00:00"
			},
			{
				"id": 5,
				"title": "Conference",
				"start": "2017-02-11",
				"end": "2017-02-13"
			},
			{
				"id": 6,
				"title": "Meeting",
				"start": "2017-02-12T10:30:00",
				"end": "2017-02-12T12:30:00"
			},
			{
				"id": 7,
				"title": "Lunch",
				"start": "2017-02-12T12:00:00"
			},
			{
				"id": 8,
				"title": "Meeting",
				"start": "2017-02-12T14:30:00"
			},
			{
				"id": 9,
				"title": "Happy Hour",
				"start": "2017-02-12T17:30:00"
			},
			{
				"id": 10,
				"title": "Dinner",
				"start": "2017-02-12T20:00:00"
			},
			{
				"id": 11,
				"title": "Birthday Party",
				"start": "2017-02-13T07:00:00"
			},
			{
				"id": 12,
				"title": "Click for Google",
				"url": "http://google.com/",
				"start": "2017-02-28"
			}
		];

		let chartData = {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [{
				label: 'Sales',
				data: [12, 19, 3, 5, 2, 3, 9],
				borderColor: [
					'#7E57C2',
				],
				borderWidth: 3,
				borderDash: [5, 5],
				fill: false,
				pointRadius: 3
			}, {
				label: 'Income',
				data: [1, 2, 5, 3, 12, 7, 15],
				backgroundColor: [
					'rgba(187,222,251,0.2)',
				],
				borderColor: [
					'#42A5F5',
				],
				borderWidth: 3,
				fill: true
			},
				{
					label: 'Expenses',
					data: [7, 12, 15, 5, 3, 13, 21],
					borderColor: [
						'#FFB300',
					],
					borderWidth: 3,
					fill: false,
					pointRadius: [4, 6, 4, 12, 8, 0, 4]
				},
				{
					label: 'New Users',
					data: [3, 7, 2, 17, 15, 13, 19],
					borderColor: [
						'#66BB6A',
					],
					borderWidth: 3,
					fill: false
				}]
		};

		let chartOptions = {
			responsive: true,
			hover: {
				mode: 'index'
			},
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Month'
					}
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Value'
					}
				}]
			}
		};

		let menuItems = [
			{
				label: 'Save', icon: 'fa fa-fw fa-check'
			},
			{
				label: 'Update', icon: 'fa fa-fw fa-refresh'
			},
			{
				label: 'Delete', icon: 'fa fa-fw fa-trash'
			}
		];

		return <div className="layout-dashboard">
			<div className="p-grid">
				<div className="p-col-12 p-lg-6 p-xl-3">
					<div className="overview-box sales">
						<i className="overview-icon pi pi-dollar"/>
						<span className="overview-title">Sales</span>
						<i className="overview-arrow pi pi-chevron-circle-up"/>
						<div className="overview-numbers">
							$ 92,440
						</div>
						<div className="overview-subinfo">
							21% more than yesterday
						</div>
					</div>
				</div>
				<div className="p-col-12 p-lg-6 p-xl-3">
					<div className="overview-box views">
						<i className="overview-icon pi pi-search"/>
						<span className="overview-title">Views</span>
						<i className="overview-arrow pi pi-chevron-circle-up"/>
						<div className="overview-numbers">
							7029
						</div>
						<div className="overview-subinfo">
							2% more than yesterday
						</div>
					</div>
				</div>
				<div className="p-col-12 p-lg-6 p-xl-3">
					<div className="overview-box users">
						<i className="overview-icon pi pi-users"/>
						<span className="overview-title">Users</span>
						<i className="overview-arrow pi pi-chevron-circle-up"/>
						<div className="overview-numbers">
							9522
						</div>
						<div className="overview-subinfo">
							7% more than yesterday
						</div>
					</div>
				</div>
				<div className="p-col-12 p-lg-6 p-xl-3">
					<div className="overview-box checkin">
						<i className="overview-icon pi pi-map-marker"/>
						<span className="overview-title">Check-Ins</span>
						<i className="overview-arrow pi pi-chevron-circle-up"/>
						<div className="overview-numbers">
							4211
						</div>
						<div className="overview-subinfo">
							18% more than yesterday
						</div>
					</div>
				</div>

				<div className="p-col-12 p-lg-8">
					<div className="card card-w-title statistics">
						<h1>Statistics</h1>
						<Chart type="line" data={chartData} options={chartOptions}/>
					</div>
				</div>

				<div className="p-col-12 p-lg-4">
					<div className="user-card card">
						<div className="user-card-header">
							<img src="assets/layout/images/dashboard/bg-header.png" alt="babylon-layout" className="profile-image"/>
						</div>
						<div className="user-card-content">
							<img src="assets/layout/images/avatar.png" alt="babylon-layout" />
							<Menu model={menuItems} popup={true} ref={el => this.menu = el} appendTo={document.body}/>
							<Button icon="pi pi-bars" onClick={(event) => this.menu.toggle(event)}/>

							<div className="user-card-name">
								<span>Arlene Welch</span>
							</div>

							<div className="user-detail">
								<ul>
									<li className="clearfix">
										<i className="pi pi-list"/>
										<span className="project-title">Tasks</span>
										<span className="project-detail">3 open</span>
										<div className="project-progressbar">
											<div className="project-progressbar-value" style={{width: '50%'}}></div>
										</div>
									</li>
									<li className="clearfix">
										<i className="pi pi-dollar"/>
										<span className="project-title">Revenue</span>
										<span className="project-detail">+20%</span>
										<div className="project-progressbar">
											<div className="project-progressbar-value" style={{width: '20%'}}></div>
										</div>
									</li>
									<li className="clearfix">
										<i className="pi pi-money-bill"/>
										<span className="project-title">Payments</span>
										<span className="project-detail">24 new</span>
										<div className="project-progressbar">
											<div className="project-progressbar-value" style={{width: '65%'}}></div>
										</div>
									</li>
									<li className="clearfix">
										<i className="pi pi-users"/>
										<span className="project-title">Clients</span>
										<span className="project-detail">+80%</span>
										<div className="project-progressbar">
											<div className="project-progressbar-value" style={{width: '80%'}}></div>
										</div>
									</li>
									<li className="clearfix">
										<i className="pi pi-money-bill"/>
										<span className="project-title">Sales</span>
										<span className="project-detail">+45</span>
										<div className="project-progressbar">
											<div className="project-progressbar-value" style={{width: '45%'}}></div>
										</div>
									</li>
									<li className="clearfix">
										<i className="pi pi-chart-bar"/>
										<span className="project-title">Performance</span>
										<span className="project-detail">+75</span>
										<div className="project-progressbar">
											<div className="project-progressbar-value" style={{width: '75%'}}></div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div className="p-col-12 p-md-6 p-lg-4 task-list">
					<div className="card card-w-title tasks">
						<h1>Tasks</h1>
						<ul>
							<li>
								<Checkbox value="task1" onChange={this.onTaskChange} checked={this.state.tasks.indexOf('task1') > -1}/>
								<span>Sales Reports</span>
								<span className="task-badge red"/>
							</li>
							<li>
								<Checkbox value="task2" onChange={this.onTaskChange} checked={this.state.tasks.indexOf('task2') > -1}/>
								<span>Pay Invoices</span>
								<span className="task-badge orange"/>
							</li>
							<li>
								<Checkbox value="task3" onChange={this.onTaskChange} checked={this.state.tasks.indexOf('task3') > -1}/>
								<span>Kate's Birthday</span>
								<span className="task-badge orange"/>
							</li>
							<li>
								<Checkbox value="task4" onChange={this.onTaskChange} checked={this.state.tasks.indexOf('task4') > -1}/>
								<span>Client Meeting</span>
								<span className="task-badge green"/>
							</li>
							<li>
								<Checkbox value="task5" onChange={this.onTaskChange} checked={this.state.tasks.indexOf('task5') > -1}/>
								<span>New Themes</span>
								<span className="task-badge green"/>
							</li>
						</ul>
					</div>
				</div>

				<div className="p-col-12 p-md-12 p-lg-4">
					<div className="card card-w-title resolution-center p-fluid">
						<h1>Support Request</h1>
							<label htmlFor="resolution-username">Username</label>
							<InputText id="resolution-username" type="text" placeholder="Username"/>

							<label htmlFor="resolution-message">Message</label>
							<InputTextarea id="resolution-message" type="text" placeholder="Message"/>

							<div className="resolution-button-bar">
								<Button type="button" label="Save Draft" className="p-button-secondary" icon="pi pi-plus"/>
								<Button type="button" label="Send" icon="pi pi-check"/>
							</div>
					</div>
				</div>

				<div className="p-col-12 p-md-12 p-lg-4">
					<div className="card card-w-title team">
						<h1>Team</h1>
						<ul>
							<li>
								<img src="assets/layout/images/avatar.png" alt="babylon-layout"/>
								<div className="team-box">
									<span className="team-member">Arlene Welch</span>
									<span className="team-member-role">Design</span>
								</div>
								<button className="p-link">
									<i className="pi pi-comment"/>
								</button>
								<button className="p-link">
									<i className="pi pi-share-alt"/>
								</button>
							</li>
							<li>
								<img src="assets/layout/images/avatar-john.png" alt="babylon-layout"/>
								<div className="team-box">
									<span className="team-member">John Swisher</span>
									<span className="team-member-role">Development</span>
								</div>
								<button className="p-link">
									<i className="pi pi-comment"/>
								</button>
								<button className="p-link">
									<i className="pi pi-share-alt"/>
								</button>
							</li>
							<li>
								<img src="assets/layout/images/avatar-julia.png" alt="babylon-layout"/>
								<div className="team-box">
									<span className="team-member">Warren Shaw</span>
									<span className="team-member-role">Sales</span>
								</div>
								<button className="p-link">
									<i className="pi pi-comment"/>
								</button>
								<button className="p-link">
									<i className="pi pi-share-alt"/>
								</button>
							</li>
							<li>
								<img src="assets/layout/images/avatar-kevin.png" alt="babylon-layout"/>
								<div className="team-box">
									<span className="team-member">Kevin Lane</span>
									<span className="team-member-role">Marketing</span>
								</div>
								<button className="p-link">
									<i className="pi pi-comment"/>
								</button>
								<button className="p-link">
									<i className="pi pi-share-alt"/>
								</button>
							</li>
						</ul>
					</div>
				</div>

				<div className="p-col-12 p-xl-6">
					<div className="card card-w-title timeline">
						<h1>Timeline</h1>
						<ul>
							<li>
								<div className="activity-link"></div>
								<div className="timeline-icon">
									<i className="pi pi-globe"/>
								</div>
								<div className="timeline-content">
									<h3>Notes Added</h3>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean blandit tortor a
										ipsum vehicula,
										in semper sapien auctor.</p>
									<div className="timeline-footer">
										<i className="pi pi-clock"/>
										<span>3 Sep 2018 at 10:41</span>
									</div>
								</div>
							</li>
							<li>
								<div className="activity-link"></div>
								<div className="timeline-icon">
									<i className="pi pi-calendar"/>
								</div>
								<div className="timeline-content">
									<h3>Reminder Scheduled</h3>
									<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
										doloremque laudantium,
										totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
										architecto beatae vitae dicta sunt explicabo.</p>
									<div className="timeline-footer">
										<i className="pi pi-clock"/>
										<span>4 Sep 2018 at 11:30</span>
									</div>
								</div>
							</li>
							<li>
								<div className="activity-link"></div>
								<div className="timeline-icon">
									<i className="pi pi-image"/>
								</div>
								<div className="timeline-content">
									<div className="child">
										<div>
											<span>3 Photos Added to</span>
											<span className="colorful">Album-23</span>
										</div>
										<img src="assets/layout/images/dashboard/image-1.png" alt="babylon-layout"/>
										<img src="assets/layout/images/dashboard/image-2.png" alt="babylon-layout"/>
										<img src="assets/layout/images/dashboard/image-3.png" alt="babylon-layout"/>
										<div className="timeline-footer">
											<i className="pi pi-clock"/>
											<span>9 Sep 2018 at 00:44</span>
										</div>
									</div>
								</div>
							</li>
							<li>
								<div className="activity-link"></div>
								<div className="timeline-icon">
									<i className="pi pi-image"/>
								</div>
								<div className="timeline-content">
									<div className="child">
										<h3>Location Update</h3>
										<img src="assets/layout/images/dashboard/antalya.png" alt="babylon-layout"
											 style={{width:'100%'}}/>
										<div className="timeline-footer">
											<i className="pi pi-clock"/>
											<span>16 Sep 2018 at 20:02</span>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>

				<div className="p-col-12 p-xl-6">
					<div className="card card-w-title global-sales p-fluid">
						<h1>Global Sales</h1>
						<DataTable value={this.state.cars} style={{marginBottom: '20px'}} responsive={true} selectionMode="single" selection={this.state.selectedCar}
								   onSelectionChange={(e) => this.setState({selectedCar: e.data})} rows={5} paginator={true}>
							<Column body={this.logoTemplate} header="Logo" style={{textAlign:'center'}}/>
							<Column field="vin" header="Vin" sortable={true}/>
							<Column field="year" header="Year" sortable={true}/>
							<Column field="brand" header="Brand" sortable={true}/>
							<Column field="color" header="Color" sortable={true}/>
							<Column body={this.actionTemplate} header="View" style={{textAlign:'center'}}/>
						</DataTable>
					</div>
					<div className="card card-w-title live-support">
						<h1>Live Support</h1>
						<ul>
							<li>
								<div className="p-grid">
									<div className="p-col-fixed">
										<img src="assets/layout/images/avatar-john.png" alt="babylon-layout"/>
									</div>
									<div className="p-col">
										<div className="chat-message">Lorem ipsum dolor sit amet, consectetur adipiscing
											elit.
											Nam ac euismod justo, eget blandit purus.
										</div>
									</div>
								</div>
							</li>
							<li>
								<div className="p-grid">
									<div className="p-col">
										<div className="chat-message">Mauris malesuada quis risus ut consequat.
											Maecenas ornare nunc risus, pulvinar euismod mi pellentesque eget.
										</div>
									</div>
									<div className="p-col-fixed">
										<img src="assets/layout/images/avatar-julia.png" alt="babylon-layout"/>
									</div>
								</div>
							</li>
							<li>
								<div className="p-grid">
									<div className="p-col-fixed">
										<img src="assets/layout/images/avatar-john.png" alt="babylon-layout"/>
									</div>
									<div className="p-col">
										<div className="chat-message">Lorem ipsum dolor sit amet, consectetur adipiscing
											elit.
											Nam ac euismod justo, eget blandit purus.
										</div>
									</div>
								</div>
							</li>
						</ul>
						<div className="new-message">
							<div className="p-grid p-nogutter">
								<div className="p-col">
									<InputText type="text" placeholder="Write a message.."/>
								</div>
								<div className="p-col-fixed">
									<Button label="Send"></Button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="p-col-12 p-md-12 p-lg-12">
					<div className="card card-w-title">
						<h1>Schedule</h1>
						<FullCalendar events={events} options={fullcalendarOptions}></FullCalendar>
					</div>
				</div>
			</div>
		</div>
	}
}