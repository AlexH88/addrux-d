import React, { Component } from 'react';
import { connect } from 'react-redux';


export default function(ComposedComponent) {
  class RequireAccount extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (localStorage.getItem('accounts') == 0) {
        this.context.router.push('/get-started');
      }
    }

    componentWillUpdate(nextProps) {
      if (localStorage.getItem('accounts') == 0) {
        this.context.router.push('/get-started');
      }
    }

    render() {
      console.log('Require accounts is called: ./wrapper/require_accounts.js');
      
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return {
      accounts: state.socialAccounts.list
    };
  }

  return connect(mapStateToProps)(RequireAccount);
}