import React from "react";
import PropTypes from "prop-types";
import ErrorFallback from "./ErrorFallback";

/**
 * Error Boundary component to catch JavaScript errors in child components
 *
 * This is a class component because error boundaries must be class components in React.
 * It catches errors during rendering, in lifecycle methods, and in constructors
 * of the whole tree below them.
 *
 * @example
 * <ErrorBoundary>
 *   <ComputersCanvas />
 * </ErrorBoundary>
 *
 * @example
 * <ErrorBoundary fallback={(error) => <div>Custom error: {error.message}</div>}>
 *   <EarthCanvas />
 * </ErrorBoundary>
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error("ErrorBoundary caught an error:", error);
    console.error("Error info:", errorInfo);

    this.setState({
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback(this.state.error);
      }

      // Otherwise, use the default ErrorFallback component
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.func,
};

export default ErrorBoundary;
