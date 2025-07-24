const Bill = require('../models/Bill');
const Product = require('../models/Product');

const generateBill = async (req, res) => {
  try {
    const { products, customer_phone_number } = req.body;
    
    // Calculate totals and update inventory
    let total_price = 0;
    let total_cost_price = 0;
    
    const contents = [];
    
    for (const item of products) {
      const product = await Product.findOne({ _id: item.product_id, user: req.user._id });
      if (!product) return res.status(404).json({ error: `Product ${item.product_id} not found` });
      if (product.quantityLeftInStock < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for ${product.name}` });
      }
      
      contents.push({
        product_id: product._id,
        quantity: item.quantity
      });
      
      total_price += product.price * item.quantity;
      total_cost_price += product.cost_price * item.quantity;
      
      // Update inventory
      product.quantityLeftInStock -= item.quantity;
      await product.save();
    }
    
    // Generate unique bill ID
    const bill_id = `BILL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const bill = new Bill({
      bill_id,
      contents,
      total_price,
      total_cost_price,
      created_by: req.user.id,
      customer_phone_number
    });
    
    await bill.save();
    
    // Populate product details for response
    const populatedBill = await Bill.findOne({ bill_id })
      .populate('contents.product_id', 'name price cost_price')
      .populate('created_by', 'name email');
      
    // Here you would add code to send email receipt to customer
    // For example, using nodemailer (not implemented here)
    
    res.status(201).json(populatedBill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Bills for User
const getUserBills = async (req, res) => {
  try {
    if (req.user.id !== req.params.user_id && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const bills = await Bill.find({ created_by: req.params.user_id })
      .populate('contents.product_id', 'name price cost_price')
      .populate('created_by', 'name email');
    res.json(bills);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Single Bill
const getSingleBill = async (req, res) => {
  try {
    const bill = await Bill.findOne({ bill_id: req.params.bill_id })
      .populate('contents.product_id', 'name price cost_price')
      .populate('created_by', 'name email');
      
    if (!bill) return res.status(404).json({ error: 'Bill not found' });
    
    if (bill.created_by._id.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    res.json(bill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  generateBill,
  getUserBills,
  getSingleBill
};