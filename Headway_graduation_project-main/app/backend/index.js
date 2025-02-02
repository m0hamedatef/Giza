const express = require('express');
const cors = require('cors');
const { Client } = require('pg');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

const port = 3000;

// Configuration for the PostgreSQL database
const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432 // Default PostgreSQL port
});

// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');

    // Create users table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    return client.query(createTableQuery);
  })
  .then(() => {
    console.log('Users table created successfully');

    // Insert a test user (optional)
    const insertTestUserQuery = `
      INSERT INTO users (name, email, password)
      VALUES ('admin', 'admin@gmail.com', 'admin123')
      ON CONFLICT (email) DO NOTHING;
    `;
    return client.query(insertTestUserQuery);
  })
  .then(() => {
    console.log('admin user inserted successfully');
  })
  .catch(err => {
    console.error('Error executing query', err.stack);
  });

// Function to get all users
const getAllUsers = () => {
  const getUsersQuery = 'SELECT * FROM users;';
  return client.query(getUsersQuery)
    .then(res => res.rows)
    .catch(err => {
      console.error('Error fetching users', err.stack);
      throw err;
    });
};

// Endpoint to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Endpoint to create a new user
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Insert the new user into the database
    const insertUserQuery = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [name, email, password];
    const result = await client.query(insertUserQuery, values);

    // Return the newly created user
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating user', err.stack);
    if (err.code === '23505') { // Unique constraint violation (duplicate email)
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Failed to create user' });
    }
  }
});

// Endpoint to handle user login
app.post('/login', async (req, res) => {
  try {


    const { email, password } = req.body;

    // Check if the user exists in the database
    const getUserQuery = 'SELECT * FROM users WHERE email = $1;';
    const result = await client.query(getUserQuery, [email]);

    if (result.rows.length === 0) {
      // User not found
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];

    // Verify the password
    if (password === user.password) {
      // Password is correct, return the user object
      res.json(user);
    } else {
      // Password is incorrect
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Error handling login request', err);
    res.status(500).json({ error: 'An unexpected error occurred while handling the login request. Please try again later.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

