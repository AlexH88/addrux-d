import React, { Component } from 'react';

import SettingsEditAccount from './settings_edit_account';
import SettingsSocialAccounts from './settings_social_accounts';
import SettingsSubscription from './settings_subscription';

import InfoModal from '../info_modal_window';

class Settings extends Component {
	render() {
		console.log('[RENDER] Settings - ./settings/settings.js');
		
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-12">
						<h2 className="main-title">Settings</h2>
					</div>
				</div>

				<div className="settings row">

					<SettingsSocialAccounts />
					<SettingsSubscription />
				</div>
			</div>
		);
	}
}

export default Settings;

// <SettingsEditAccount />