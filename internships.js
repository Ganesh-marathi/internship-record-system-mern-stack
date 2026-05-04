const express = require('express');
const router = express.Router();
const Internship = require('../models/Internship');

// Get all internships
router.get('/', async (req, res) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 });
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create internship
router.post('/', async (req, res) => {
  const internship = new Internship(req.body);
  try {
    const newInternship = await internship.save();
    res.status(201).json(newInternship);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update internship
router.put('/:id', async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ message: 'Internship not found' });
    
    Object.assign(internship, req.body);
    const updatedInternship = await internship.save();
    res.json(updatedInternship);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete internship
router.delete('/:id', async (req, res) => {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id);
    if (!internship) return res.status(404).json({ message: 'Internship not found' });
    res.json({ message: 'Internship deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;