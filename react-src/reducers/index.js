import { combineReducers } from 'redux';
import appReducer from './app_reducer';
import socialAccountsReducer from './social_accounts_reducer';
import menuReducer from './menu_reducer';
import followingReducer from './following_reducer';
import messagesReducer from './messages_reducer';
import commentsReducer from './comments_reducer';
import libraryReducer from './library_reducer';
import analyticsReducer from './analytics_reducer';
import notificationReducer from './notification_reducer';
import billingReducer from './billing_reducer';
import timezoneReducer from './timezone_reducer';
import infoReducer from './info_reducer';

const rootReducer = combineReducers({
	// Fields
	// isAuth
	app: appReducer,

	// Fields
	// - error
	// - success
	// - list
	// - newAccount (promise)
	// - currentAccount
	// - newAccountFollowing (promise)
	// - currentAccountFollowing (promise)
	socialAccounts: socialAccountsReducer,

	// Fields
	// - error
	// - success
	// - comments
	// - hashtags
	// - accounts
	// - geo
	// - isFollow
	// - isSaveFollowing
	// - isLikes
	// - isLikeFollowers
	// - likesPerAccount
	// - enableCommens
	// - accountID
	// - createSuccessful
	// - refreshSuccessful
	following: followingReducer,

	// Fields
	// - activeLink
	menu: menuReducer,

	// Fields
	// - error
	// - success
	// - threads
	// - list
	// - currentContact
	// - hasMessages
	messages: messagesReducer,

	// Fields
	// - error
	// - success
	// - list
	// - currentPost
	// - hasComments
	// - posts
	comments: commentsReducer,

	// Fields
	// - error
	// - success
	// - posts
	// 	- title
	//	- start
	//	- text
	//	- mediaUrl
	// - currentPost
	// - success
	library: libraryReducer,

	// Fileds
	// - error
	// - success
	// - followers
	// - likes
	// - comments
	// - following
	// - ER
	analytics: analyticsReducer,

	// Fields
	// - error
	// - success
	// - list
	notifications: notificationReducer,

	// Fields
	// - error
	// - success
	// - plans
	// - history
	// - currPlan
	// - planExpiredDay
	billing: billingReducer,

	// Fields
	// - error
	// - success
	// - currentTimezone
	// - list
	timezones: timezoneReducer,

	info: infoReducer
});

export default rootReducer;
