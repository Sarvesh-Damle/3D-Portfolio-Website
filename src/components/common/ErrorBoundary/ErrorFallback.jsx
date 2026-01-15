import React from "react";
import PropTypes from "prop-types";

/**
 * Default fallback UI component displayed when an error is caught by ErrorBoundary
 *
 * @param {Object} props
 * @param {Error} [props.error] - The error object that was caught
 * @returns {JSX.Element}
 */
const ErrorFallback = ({ error }) => {
  return (
    <div className='flex items-center justify-center w-full h-full min-h-[300px] bg-tertiary rounded-lg p-8'>
      <div className='text-center max-w-md'>
        <div className='text-6xl mb-4'>⚠️</div>
        <h3 className='text-white text-xl font-bold mb-2'>Oops! Something went wrong</h3>
        <p className='text-secondary text-sm mb-4'>
          We encountered an error while loading this component. Please try refreshing the page.
        </p>
        {error && process.env.NODE_ENV === "development" && (
          <details className='text-left mt-4'>
            <summary className='text-white cursor-pointer hover:text-secondary mb-2'>
              Error Details (Development Only)
            </summary>
            <pre className='text-xs text-red-400 bg-black bg-opacity-50 p-3 rounded overflow-auto max-h-40'>
              {error.toString()}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

ErrorFallback.propTypes = {
  error: PropTypes.instanceOf(Error),
};

export default ErrorFallback;
