const Account = require('../models/Account');

exports.getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch accounts' });
  }
};

exports.createAccount = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newAccount = new Account({ username, email, password });
    const savedAccount = await newAccount.save();
    res.json(savedAccount);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create account' });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    await Account.findByIdAndDelete(req.params.id);
    res.json({ message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete account' });
  }
};
