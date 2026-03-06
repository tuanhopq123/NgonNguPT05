var express = require('express');
var router = express.Router();

/* GET home page (API Health Check). */
router.get('/', function(req, res, next) {
  res.status(200).json({
    success: true,
    message: "Welcome to the RESTful API",
    version: "1.0.0",
    status: "Running 🚀",
    endpoints: {
      users: "/api/v1/users",
      roles: "/api/v1/roles",
      products: "/api/v1/products",
      categories: "/api/v1/categories"
    }
  });
});

module.exports = router;