const Loan = require('../models/Loan');
const Bid = require('../models/Bid');
const LoanBid = require('../models/LoanBid');

const generateLoan = async (req, res) => {
  try {
    const { loan_name, description, amount, years, my_given_interest_rate } = req.body;

    if (!loan_name || !amount || !years || !my_given_interest_rate) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    const loan = new Loan({
      organization_id: req.user._id,
      created_by: req.user._id,
      created_at: new Date(),
      loan_name,
      description,
      amount,
      years,
      my_given_interest_rate
    });

    await loan.save();

    res.status(201).json({ message: 'Loan created successfully', loan });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserLoans = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const loans = await Loan.find({ created_by: user_id });

    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSingleLoan = async (req, res) => {
  try {
    const { loan_id } = req.params;

    const loan = await Loan.findById(loan_id);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    const loanBids = await LoanBid.find({ loan_id }).populate({
      path: 'bid_id',
      populate: { path: 'raised_by', select: 'name email' }
    });

    res.status(200).json({
      loan,
      bids: loanBids.map(entry => entry.bid_id)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  generateLoan,
  getUserLoans,
  getSingleLoan
};
