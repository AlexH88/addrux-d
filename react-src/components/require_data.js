import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as menuActions from '../actions/menu';
import * as billingActions from '../actions/billing';
import * as socialActions from '../actions/social_accounts';
import * as followingActions from '../actions/following';
import * as libraryActions from '../actions/library';
const actions = Object.assign({}, menuActions, 
                              billingActions, socialActions,
                              followingActions, libraryActions);
import { COMMUNICATION, PROMOTE } from '../actions/types';


let flag = true;
// const preloader = document.getElementById('prelaoder');
// const removedPrelaoder = document.body.removeChild(preloader);

export default function(ComposedComponent) {
  class RequireData extends Component {    
    static contextTypes = {
      router: React.PropTypes.object
    }

    checkRoute(route, permissions) {
      console.log(`Route: ${route} || Permission: ${permissions}`);

      if(route === '/settings' || route === '/billing' || 
         route === '/social-accounts' || route === '/pricing' || 
         route === '/notifications' || route === '/payment') {
        return true;
      }

      switch (permissions) {
        case PROMOTE:
          if(route === '/') {
            return true;
          } else if(route === '/followers') {
            return true;
          } else if(route === '/analytics') {
            return true;
          } else {
            return false;
          }
          break;

        case COMMUNICATION:
          if(route === '/publishing') {
            return true;
          } else if(route === '/messages') {
            return true;
          } else if(route === '/comments') {
            return true;
          } else if(route === '/analytics') {
            return true;
          } else {
            return false;
          }
          break;
      }
    }

    checkData(props, prevProps) {
      if(!props.isAuth) {
        console.log('############# STAGE 1 #############');
        this.context.router.push('/signin');
      }

      if(props.currentPlan !== null) {
        if(props.currentPlan.length === 0) {
          console.log('############# STAGE 2 #############');

          if(props.children.props.location.pathname === '/payment') {
            return;
          }
          if(props.children.props.location.pathname !== '/pricing') {
            this.props.setActiveLink('/pricing');
            this.context.router.push('/payment');
          }

        } else {
          this.props.definePermissions(props.currentPlan[0]);

          if(props.accounts !== null) {
            console.log('############# STAGE 3 #############');

            if(props.permissions === 'Trial' || props.permissions === 'Promote & Communication') {
              console.log('Right premissions!');
            } 
            else if(props.permissions === PROMOTE) {
              if(this.checkRoute(props.children.props.location.pathname, PROMOTE)) {
                console.log('Right permissions.');                
              } else {
                this.props.setActiveLink('/pricing');
                this.context.router.push('/pricing');
              }
            }
            else if(props.permissions === COMMUNICATION) {
              if((prevProps.children.props.location.pathname === '/settings' || 
                  prevProps.children.props.location.pathname === '/billing' || 
                  prevProps.children.props.location.pathname === '/social-accounts' || 
                  prevProps.children.props.location.pathname === '/pricing' || 
                  prevProps.children.props.location.pathname === '/notifications') && 
                  props.children.props.location.pathname === '/') {
                this.props.setActiveLink('/messages');
                this.context.router.push('/messages');
              } else {
                if(this.checkRoute(props.children.props.location.pathname, COMMUNICATION)) {
                  console.log('Right permissions.');
                } else {
                  this.props.setActiveLink('/pricing');
                  this.context.router.push('/pricing');
                }
              }
              
            }

            if(props.accounts.length === 0) {
              console.log('############# STAGE 4 #############');            
              
              localStorage.removeItem('currAcc');
              
              if(props.children.props.location.pathname === '/' && props.permissions !== COMMUNICATION) {
                this.props.setActiveLink('/');
                this.context.router.push('/get-followers');
              }
            } else {
              console.log('############# STAGE 5 #############');            
              
              this.props.collectFilesIDs();
              this.props.fetchFollwoingSettings();        
              
              if(props.followingID === 'none') {
                if(props.children.props.location.pathname === '/' && props.permissions !== COMMUNICATION) {
                  
                  this.props.setActiveLink('/');
                  this.context.router.push('/get-followers');
                }
              }
              if(props.followingID !== 'none' && props.followingID !== null) {
                if(props.children.props.location.pathname === '/get-followers' && props.permissions !== COMMUNICATION) {
                  
                  this.props.setActiveLink('/');
                  this.context.router.push('/');
                }
              }
            }
          }
        }
      } 
    }
    
    componentWillMount() {
      if(this.props.isAuth) {
        this.props.fetchCurrentPlan();
        this.props.fetchFollwoingSettings();        
        this.props.setTrialPlan();
        this.props.fetchSocialAccounts();
      }
      this.checkData(this.props);
    }
    
    componentWillUpdate(nextProps) {
      this.checkData(nextProps, this.props);
    }

    shouldRender() {
      // если план и аккаунты не равны 0
      // если план и аккаунты пусты, 
      if(this.props.currentPlan !== null &&  this.props.accounts !== null) {
        return true;
      }
    }
    
    render() {
      console.log('Require data is called: ./require_data.js');
      
      console.log(`Data (isAuth): `, this.props.isAuth);
      console.log(`Data (Plan): `,this.props.currentPlan);
      console.log(`Data (Accounts): `, this.props.accounts);
      console.log('Data (FollowingID): ', this.props.followingID);
      console.log('Data (Permissions): ', this.props.permissions);
      
      if(this.props.isAuth === null) {
        return <div style={{display: 'none'}}></div>
      } else {
        if(this.props.currentPlan !== null && this.props.accounts !== null && this.props.followingID !== null) {
          return <ComposedComponent {...this.props} />;
        } else {
          return <div style={{display: 'none'}}></div>;     
        }
      }

    }
  }

  function mapStateToProps(state) {
    return {
      isAuth: state.app.isAuth,
      currentPlan: state.billing.currPlan,
      permissions: state.billing.permissions,
      accounts: state.socialAccounts.list,
      followingID: state.following.followingID
    };
  }

  return connect(mapStateToProps, actions)(RequireData);
}