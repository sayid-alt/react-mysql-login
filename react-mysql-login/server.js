const express = require('express');
const mariadb = require('mariadb');

const app = express();
const port = 3001;

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  database: 'blog',
  password : 'admin',
});

app.use(express.json());
app.use(function(req, res, next){
	// Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
	next()
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      `SELECT * FROM users WHERE username = ${username} AND password = ${password}`
    );

    if (rows.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('MariaDB error:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  } finally {
    if (conn) conn.release();
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
