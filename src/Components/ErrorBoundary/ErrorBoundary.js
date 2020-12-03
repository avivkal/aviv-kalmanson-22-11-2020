import React, { Component } from 'react'

class ErrorBoundary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error: error,
    });
  }




  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. {this.state.error.toString()}</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;