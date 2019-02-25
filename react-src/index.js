import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import promise from 'redux-promise';

import App from './components/app';
import reducers from './reducers/index';
import RequireData from './components/require_data';

import AuthMain from './components/auth/auth_main';
import SignIn from './components/auth/auth_signin';
import SignUp from './components/auth/auth_signup';
import ForgotPassword from './components/auth/auth_forgot';
import RequireAuth from './components/auth/auth_require';
import NotRequireAuth from './components/auth/auth_not_require';

import GetFollowers from './components/followers/followers_get';
import Followers from './components/followers/followers';
import GetStarted from './components/get_started';

import DirectMessages from './components/messages/direct_messages';
import Comments from './components/comments/comments';

import Publishing from './components/publishing/publishing';

import Settings from './components/settings/settings';
import SettingsAllSocialAccounts from './components/settings/settings_all_social_accounts';
import SettingsPricing from './components/settings/settings_pricing';

import Billing from './components/settings/billing';
import BillingHistory from './components/settings/billing_history';

import SettingsNotifications from './components/settings/settings_notification';

import Analytics from './components/analytics/analytics';

import { AUTH_USER } from './actions/types';
import { fetchSocialAccountInfo } from './actions/social_accounts';


const createStoreWithMiddleware = applyMiddleware(reduxThunk, promise)(createStore);
export const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER });
}


ReactDOM.render(
<Provider store={store}>
  	<Router history={browserHistory}>
      <Route path='/' component={RequireData(App)}>
        <IndexRoute component={Followers}></IndexRoute>
        <Route path='/get-followers' component={GetFollowers} />
        <Route path='/get-started' component={GetStarted} />
        <Route path='/messages' component={DirectMessages} />
        <Route path='/comments' component={Comments} />
        <Route path='/publishing' component={Publishing} />
        <Route path='/settings' component={Settings} />
        <Route path='/analytics' component={Analytics} />
        <Route path='/social-accounts' component={SettingsAllSocialAccounts} />
        <Route path='/pricing' component={SettingsPricing} />
        <Route path='/payment' component={Billing} />
        <Route path='/billing' component={BillingHistory} />
        <Route path='/notifications' component={SettingsNotifications} />
      </Route>
      {/* <Route path='/' component={App}>
        <IndexRoute component={Followers}></IndexRoute>
        <Route path='/get-followers' component={GetFollowers} />
        <Route path='/get-started' component={GetStarted} />
        <Route path='/messages' component={DirectMessages} />
        <Route path='/comments' component={Comments} />
        <Route path='/publishing' component={Publishing} />
        <Route path='/settings' component={Settings} />
        <Route path='/analytics' component={Analytics} />
        <Route path='/social-accounts' component={SettingsAllSocialAccounts} />
        <Route path='/pricing' component={SettingsPricing} />
        <Route path='/payment' component={Billing} />
        <Route path='/billing' component={BillingHistory} />
        <Route path='/notifications' component={SettingsNotifications} />
      </Route> */}
			<Route path='/signup' component={NotRequireAuth(AuthMain)}>
				<IndexRoute component={SignUp}></IndexRoute>
				<Route path='/signin' component={SignIn}></Route>
				<Route path='/forgot' component={ForgotPassword}></Route>
			</Route>
  	</Router>
  </Provider>
  , document.querySelector('#ReactApp'));