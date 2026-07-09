export function requireLogin(req, res, next) {
  if (!req.session.account) {
    return res.redirect('/account/login');
  }

  next();
}

export function requireEmployee(req, res, next) {
  if (!req.session.account) {
    return res.redirect('/account/login');
  }

  if (
    req.session.account.role !== 'employee' &&
    req.session.account.role !== 'owner'
  ) {
    return res.status(403).send('Access denied');
  }

  next();
}

export function requireOwner(req, res, next) {
  if (!req.session.account) {
    return res.redirect('/account/login');
  }

  if (req.session.account.role !== 'owner') {
    return res.status(403).send('Access denied');
  }

  next();
}