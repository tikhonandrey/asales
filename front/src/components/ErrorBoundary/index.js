import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ErrorBoundary.module.scss';

class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node,
  };
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.error !== this.props.error) {
      this.setState({
        error: nextProps.error,
      });
    }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div className={styles.error}>
          Something went wrong. {error && error.toString()}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
