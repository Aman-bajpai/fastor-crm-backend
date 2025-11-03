const express = require('express');
const router = express.Router();
const {
  submitEnquiry,
  getPublicEnquiries,
  getMyEnquiries,
  claimEnquiry,
} = require('../controllers/enquiryController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/enquiries/submit
// @desc    Public form API to submit an enquiry
// @access  Public
router.post('/submit', submitEnquiry); // 

// @route   GET /api/enquiries/public
// @desc    Fetch unclaimed (public) leads
// @access  Private
router.get('/public', authMiddleware, getPublicEnquiries); // 

// @route   GET /api/enquiries/my
// @desc    Fetch leads claimed by logged-in user
// @access  Private
router.get('/my', authMiddleware, getMyEnquiries); // 

// @route   PUT /api/enquiries/claim/:id
// @desc    Claim a public lead
// @access  Private
router.put('/claim/:id', authMiddleware, claimEnquiry); // 

module.exports = router;