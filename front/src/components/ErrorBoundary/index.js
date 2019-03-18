import React, { Component } from 'react';
import styles from './ErrorBoundary.module.scss';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
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
