export function requireLogin(req, res, next) {
  if (!req.session.account) {
    return res.redirect('/account/login');
  }

  next();
}