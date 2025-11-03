const Enquiry = require('../models/Enquiry');

exports.submitEnquiry = async (req, res) => {
  const { name, email, courseInterest } = req.body;

  try {
    // Basic validation
    if (!name || !email || !courseInterest) {
      return res.status(400).json({ msg: 'Please fill all fields' });
    }

    const newEnquiry = new Enquiry({
      name,
      email,
      courseInterest,
      
    });

    await newEnquiry.save();

    res.status(201).json({ msg: 'Enquiry submitted successfully', enquiry: newEnquiry });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getPublicEnquiries = async (req, res) => {
  try {

    const enquiries = await Enquiry.find({ status: 'public' });
    res.json(enquiries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getMyEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ claimedBy: req.user.id });
    res.json(enquiries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.claimEnquiry = async (req, res) => {
  try {
    const enquiryId = req.params.id;
    const userId = req.user.id;

    let enquiry = await Enquiry.findById(enquiryId);

    if (!enquiry) {
      return res.status(404).json({ msg: 'Enquiry not found' });
    }

    if (enquiry.status === 'claimed') {
      return res.status(400).json({ msg: 'This enquiry has already been claimed' });
    }

    
    enquiry.status = 'claimed';
    enquiry.claimedBy = userId;

    await enquiry.save();

    res.json({ msg: 'Enquiry claimed successfully', enquiry });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};