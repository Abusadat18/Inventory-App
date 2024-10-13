const { Pool } = require("pg");

require('dotenv').config()

module.exports = new Pool({
  connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:6543/${process.env.DB_NAME}`,
  ssl: {
    rejectUnauthorized: false
  }
});



