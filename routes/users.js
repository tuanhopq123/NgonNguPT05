var express = require('express');
var router = express.Router();
const { User } = require('../models');

// [GET] Lấy tất cả User
router.get('/', async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false }).populate('role');
    res.status(200).json({ total: users.length, data: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// [POST] Tạo User
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// [POST] Enable User
router.post('/enable', async (req, res) => {
  const { email, username } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email, username, isDeleted: false }, 
      { status: true }, 
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "Thông tin email hoặc username không đúng" });
    res.status(200).json({ message: "Đã kích hoạt thành công", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// [POST] Disable User
router.post('/disable', async (req, res) => {
  const { email, username } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email, username, isDeleted: false }, 
      { status: false }, 
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "Thông tin email hoặc username không đúng" });
    res.status(200).json({ message: "Đã vô hiệu hoá thành công", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// [GET] Lấy User theo ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id, isDeleted: false }).populate('role');
    if (!user) return res.status(404).json({ message: "Không tìm thấy User" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// [PUT] Cập nhật User
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      req.body,
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: "Không tìm thấy User" });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// [DELETE] Xoá mềm User
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndUpdate(
      req.params.id, 
      { isDeleted: true }, 
      { new: true }
    );
    if (!deletedUser) return res.status(404).json({ message: "Không tìm thấy User" });
    res.status(200).json({ message: "Đã xoá mềm User thành công", data: deletedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;