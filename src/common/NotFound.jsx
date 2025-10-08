import React from 'react'

const NotFound = () => {
    return (
        <div className="vh-100 d-flex flex-column justify-content-center align-items-center text-center bg-light">
            <h1 className="display-4 fw-bold text-danger mb-3">404</h1>
            <p className="fs-4 mb-2">Oops! Page Not Found</p>
            <p className="mb-4 text-muted">
                The page you’re looking for doesn’t exist or was moved.
            </p>
            <a href="/" className="btn btn-primary px-4 py-2">
                Go Back Home
            </a>
        </div>
    )
}

export default NotFound