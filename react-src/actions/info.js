import { AUTH_ERROR,
	AUTH_INFO,
	ACCOUNTS_ERROR,
	ACCOUNTS_INFO,
	FOLLOWING_ERROR,
	FOLLOWING_INFO,
	MESSAGES_ERROR,
	MESSAGES_INFO,
	COMMENTS_ERROR,
	COMMENTS_INFO,
	POSTS_ERROR,
	POSTS_INFO,
	ANALYTICS_ERROR,
	ANALYTICS_INFO,
	PLANS_ERROR,
	PLANS_INFO,
	TIMEZONES_ERROR,
  TIMEZONES_INFO } from './types';
  

export function clearField(field) {
  switch (field) {
    case 'auth_error':
      return {
        type: AUTH_ERROR,
        payload: null
      }
    case 'auth_info':
      return {
        type: AUTH_INFO,
        payload: null
      }

    case 'accounts_error':
      return {
        type: ACCOUNTS_ERROR,
        payload: null
      }
    case 'accounts_info':
      return {
        type: ACCOUNTS_INFO,
        payload: null
      }

    case 'following_error':
      return {
        type: FOLLOWING_ERROR,
        payload: null
      }
    case 'following_info':
      return {
        type: FOLLOWING_INFO,
        payload: null
      }

    case 'messages_error':
      return {
        type: MESSAGES_ERROR,
        payload: null
      }
    case 'messages_info':
      return {
        type: MESSAGES_INFO,
        payload: null
      }

    case 'comments_error':
      return {
        type: COMMENTS_ERROR,
        payload: null
      }
    case 'comments_info':
      return {
        type: COMMENTS_INFO,
        payload: null
      }

    case 'posts_error':
      return {
        type: POSTS_ERROR,
        payload: null
      }
    case 'posts_info':
      return {
        type: POSTS_INFO,
        payload: null
      }

    case 'analytics_error':
      return {
        type: ANALYTICS_ERROR,
        payload: null
      }
    case 'analytics_info':
      return {
        type: ANALYTICS_INFO,
        payload: null
      }

    case 'plans_error':
      return {
        type: PLANS_ERROR,
        payload: null
      }
    case 'plans_info':
      return {
        type: PLANS_INFO,
        payload: null
      }

    case 'timezones_error':
      return {
        type: TIMEZONES_ERROR,
        payload: null
      }
    case 'timezones_info':
      return {
        type: TIMEZONES_INFO,
        payload: null
      }
  }
}

export function authInfo(info) {
  if(info.type === 'error') {
    return  {
			type: AUTH_ERROR,
			payload: info
    }
	} 
	
  if(info.type === 'info') {
    return {
			type: AUTH_INFO,
			payload: info
    }
  }
}

export function accountsInfo(info) {
  if(info.type === 'error') {
    return {
			type: ACCOUNTS_ERROR,
			payload: info
    }
	} 
	
  if(info.type === 'info') {
    return {
			type: ACCOUNTS_INFO,
			payload: info
    }
  }
}

export function followingInfo(info) {
  if(info.type === 'error') {
    return {
			type: FOLLOWING_ERROR,
			payload: info
    }
	} 
	
  if(info.type === 'info') {
    return {
			type: FOLLOWING_INFO,
			payload: info
    }
  }
}

export function messagesInfo(info) {
  if(info.type === 'error') {
    return {
			type: MESSAGES_ERROR,
			payload: info
    }
	} 
	
  if(info.type === 'info') {
    return {
			type: MESSAGES_INFO,
			payload: info
    }
  }
}

export function commentsInfo(info) {
  if(info.type === 'error') {
    return {
			type: COMMENTS_ERROR,
			payload: info
    }
	} 
	
  if(info.type === 'info') {
    return {
			type: COMMENTS_INFO,
			payload: info
    }
  }
}

export function postsInfo(info) {
  if(info.type === 'error') {
    return {
			type: POSTS_ERROR,
			payload: info
    }
	} 
	
  if(info.type === 'info') {
    return {
			type: POSTS_INFO,
			payload: info
    }
  }
}

export function analyticsInfo(info) {
  if(info.type === 'error') {
    return {
			type: ANALYTICS_ERROR,
			payload: info
    }
	} 
	
  if(info.type === 'info') {
    return {
			type: ANALYTICS_INFO,
			payload: info
    }
  }
}

export function plansInfo(info) {
  if(info.type === 'error') {
    return {
			type: PLANS_ERROR,
			payload: info
    }
	} 
	
  if(info.type === 'info') {
    return {
			type: PLANS_INFO,
			payload: info
    }
  }
}

export function timezonesInfo(info) {
  if(info.type === 'error') {
    return {
			type: TIMEZONES_ERROR,
			payload: info
    }
	} 
	
  if(info.type === 'info') {
    return {
			type: TIMEZONES_INFO,
			payload: info
    }
  }
}