import csrf from 'csurf';

const csrfProtection = csrf({ cookie: true });

const setCsrfToken = (req, res, next) => {
  csrfProtection(req, res, () => {
    // Set the CSRF token in an HTTP-only cookie and as a JSON response
    res.cookie('X-CSRF-TOKEN', req.csrfToken(), {
      httpOnly: false,   // Client can access it via JavaScript
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Strict' // Prevent CSRF attacks from cross-site requests
    });
    res.json({ csrfToken: req.csrfToken() });
  });
}

const csrfMiddleware = (req, res, next) => {
  csrfProtection(req, res, next);  // Simply applying CSRF protection to routes
}

export default { setCsrfToken, csrfMiddleware };
