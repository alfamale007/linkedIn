const Lead = require('../models/Lead');

exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
};

exports.createLead = async (req, res) => {
  const { name, email, company, phone } = req.body;
  try {
    const newLead = new Lead({ name, email, company, phone });
    const savedLead = await newLead.save();
    res.json(savedLead);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create lead' });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lead deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete lead' });
  }
};
