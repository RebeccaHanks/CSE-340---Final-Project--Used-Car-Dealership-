import bcrypt from 'bcrypt';
import { createAccount, getAccountByEmail } from '../models/account.js';

export function buildLogin(req, res) {
  res.render('account/login', {
    title: 'Login'
  });
}

export function buildRegister(req, res) {
  res.render('account/register', {
    title: 'Register'
  });
}

export async function registerAccount(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingAccount = await getAccountByEmail(email);

    if (existingAccount) {
      return res.send('An account with that email already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await createAccount(
      firstName,
      lastName,
      email,
      hashedPassword
    );

    res.redirect('/account/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering account');
  }
}

export async function loginAccount(req, res) {
  try {
    const { email, password } = req.body;

    const account = await getAccountByEmail(email);

    if (!account) {
      return res.send('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(password, account.password);

    if (!passwordMatch) {
      return res.send('Invalid email or password');
    }

    req.session.account = {
      account_id: account.account_id,
      first_name: account.first_name,
      last_name: account.last_name,
      email: account.email,
      role: account.role
    };

    res.redirect('/account/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in');
  }
}

export function buildDashboard(req, res) {
  res.render('account/dashboard', {
    title: 'Dashboard',
    account: req.session.account
  });
}

export function logoutAccount(req, res) {
  req.session.destroy(() => {
    res.redirect('/');
  });
}