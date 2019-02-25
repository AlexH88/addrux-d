import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class NotRequireAuth extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (this.props.isAuth) {
        this.context.router.push('/')
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.isAuth) {
        this.context.router.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return {
      isAuth: state.app.isAuth,
    };
  }

  return connect(mapStateToProps)(NotRequireAuth);
}