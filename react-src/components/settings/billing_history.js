import React, { Component } from 'react';
import { connect } from 'react-redux';
import Preloader from '../preloader';

import * as billingActions from '../../actions/billing';
import BillingItem from './billing_item';


class BillingHistory extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pageCounter: 0
		}
	}

	componentWillMount() {
		this.props.fetchBillingHistory();		
	}

	loadMoreHandle() {
		if(this.props.history.length > (9 + (9 * this.state.pageCounter))) {
			this.setState({ pageCounter: this.state.pageCounter + 1 });
		}
	}

	renderLoadMoreButton() {
		if(this.props.history !== null && this.props.history.length > 9) {
			return (
				<button 
					onClick={() => this.loadMoreHandle()}
					className="billing-history__button mh40">
					LOAD MORE
				</button>
			);
		}
	}

	renderBillingItems() {
		if(this.props.history !== null) {
			return this.props.history
				.slice(0, (9 * this.state.pageCounter) + 9)
				.map(item => {
				return <BillingItem
									account={this.props.account.login}
									key={`${item.id}_billing`}
									item={item} />;
			});
		}
	}

	render() {
		console.log('[RENDER] BillingHistory - ./settings/billing_history.js', this.props.history);		
		
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-12">
						<h2 className="main-title">Billing Information</h2>
					</div>
				</div>

				<div className="billing-history__container white-box col-md-12 col-lg-6">
					{ (this.props.history !== null) ? (
						<div className="table-responsive">
							<table className="billing-table table table-hover">
								<thead>
									<tr>
										{/* <th className='col-lg-3'>Account</th> */}
										<th className='col-lg-7'>Description</th>
										<th className='col-lg-3'>Date</th>
										<th className='col-lg-2'>Amount</th>
									</tr>
								</thead>

								<tbody>
									{ this.renderBillingItems() }
								</tbody>
							</table>
						</div>
					) : (
						<Preloader />
					)}
						{ this.renderLoadMoreButton() }
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		history: state.billing.history,
		account: state.socialAccounts.currentAccount
	}
}

export default connect(mapStateToProps, billingActions)(BillingHistory);