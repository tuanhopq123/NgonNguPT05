var express = require('express');
var router = express.Router();
// Import model Role từ file models/index.js
const { Role } = require('../models'); 

// [GET] Lấy tất cả Role
router.get('/', async function (req, res, next) {
  try {
    const roles = await Role.find({ isDeleted: false });
    res.status(200).json({ total: roles.length, data: roles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// [GET] Lấy Role theo ID
router.get('/:id', async function (req, res, next) {
  try {
    const role = await Role.findOne({ _id: req.params.id, isDeleted: false });
    if (!role) return res.status(404).json({ message: "Không tìm thấy Role" });
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// [POST] Tạo Role mới
router.post('/', async function (req, res, next) {
  try {
    const newRole = await Role.create(req.body);
    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// [PUT] Cập nhật Role
router.put('/:id', async function (req, res, next) {
  try {
    const updatedRole = await Role.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      req.body,
      { new: true }
    );
    if (!updatedRole) return res.status(404).json({ message: "Không tìm thấy Role" });
    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// [DELETE] Xoá mềm Role
router.delete('/:id', async function (req, res, next) {
  try {
    const deletedRole = await Role.findByIdAndUpdate(
      req.params.id, 
      { isDeleted: true }, 
      { new: true }
    );
    if (!deletedRole) return res.status(404).json({ message: "Không tìm thấy Role" });
    res.status(200).json({ message: "Đã xoá mềm Role thành công", data: deletedRole });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;