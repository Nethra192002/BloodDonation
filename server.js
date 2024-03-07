const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));


app.use(cors());


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '-',
  database: 'bloodbank'
});


connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;
  connection.query('SELECT name, email FROM user_login WHERE email = ? AND password = ?', [email, password], (error, results) => {
    if (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: "Error during login" });
    } else if (results.length > 0) {
      // Assuming the query returns only one result, you can directly send the first item.
      res.json({
        message: "Login successful",
        user: results[0] // Send back the user details
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});


app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    connection.query('INSERT INTO user_login (name, email, password) VALUES (?, ?, ?)', [name, email, password], (error, results) => {
      if (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: "Registration failed" });
      } else {
        console.log('Registration successful', results);
        res.json({ message: "Registration successful" });
      }
    });
  });


// Existing endpoint for fetching all blood bank information
app.get('/blood-bank-info', (req, res) => {
  connection.query('SELECT * FROM blood_bank', (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Error retrieving blood bank information", error });
    }
    res.json(results);
  });
});

// New endpoint for fetching blood bank information by pincode
app.get('/blood-bank-info/:pincode', (req, res) => {
  const { pincode } = req.params;
  connection.query('SELECT * FROM blood_bank WHERE pincode = ?', [pincode], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Error retrieving filtered blood bank information", error });
    }
    res.json(results);
  });
});

// Endpoint for admin login
// Add to server.js

// Endpoint for admin login
app.post('/admin-login', (req, res) => {
  // Replace with your actual database logic
  // This is just a pseudocode example
  const { email, password } = req.body;
  connection.query('SELECT * FROM admin_login WHERE email = ? AND password = ?', [email, password], (error, results) => {
    if (error) {
      return res.status(500).send('Error on the server.');
    }
    if (results.length > 0) {
      // Assuming the admin info is in the first index of results
      const adminInfo = {
        name: results[0].name, // Assuming there's a 'name' field in your admin table
        email: results[0].email
      };
  
      res.json({
        message: "Admin login successful",
        admin: adminInfo // Send back the admin details
      });
    } else {
      return res.status(401).send('Invalid credentials.');
    }
  });
});

// Add to server.js

// Endpoint to get all donors
app.get('/donors', (req, res) => {
  connection.query('SELECT donor_id, name, age, gender, bloodgroup, email, bbank_id, pincode FROM donor', (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Error retrieving donors", error });
    }
    res.json(results);
  });
});

// Endpoint to get donors by blood group
app.get('/donors/:bloodGroup', (req, res) => {
  const { bloodGroup } = req.params;
  connection.query('SELECT donor_id, name, age, gender, bloodgroup, email, bbank_id, pincode FROM donor WHERE bloodgroup = ?', [bloodGroup], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Error retrieving donors by blood group", error });
    }
    res.json(results);
  });
});

// server.js

// ... other code ...

app.post('/register-donor', (req, res) => {
  // Extract data from the request body
  const { name, age, gender, bloodgroup, email, password, pincode } = req.body;

  // First, find the bbank_id based on the pincode
  connection.query('SELECT bbank_id FROM blood_bank WHERE pincode = ?', [pincode], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error retrieving bank id", error: err });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "No blood bank found for this pincode" });
    }

    const bbank_id = results[0].bbank_id;

    // Now insert the new donor with the bbank_id
    const insertQuery = 'INSERT INTO donor (name, age, gender, bloodgroup, email, password, bbank_id, pincode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(insertQuery, [name, age, gender, bloodgroup, email, password, bbank_id, pincode], (insertErr, insertResults) => {
      if (insertErr) {
        return res.status(500).json({ message: "Error registering donor", error: insertErr });
      }
      res.json({ message: "Donor registered successfully", insertResults });
    });
  });
});

// server.js

// ... Existing code

app.get('/blood-donation-criteria', (req, res) => {
  const query = 'SELECT * FROM BloodDonationCriteria';
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).send('Error on the server.');
    }
    res.json(results);
  });
});

app.get('/blood-donations', (req, res) => {
  const query = 'SELECT * FROM BLOOD';
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Error retrieving blood donations", error });
    }
    res.json(results);
  });
});




// server.js

// ... (other code for setting up Express and database connection)

app.get('/patients', (req, res) => {
  const query = 'SELECT * FROM PATIENT';
  // Perform the database query
  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).send('Error on the server.');
    } else {
      res.json(results);
    }
  });
});

app.post('/add-blood-bank', (req, res) => {
  const { bbank_id, bbank_name, address, state, pincode } = req.body;
  const query = 'INSERT INTO blood_bank (bbank_id, bbank_name, address, state, pincode) VALUES (?, ?, ?, ?, ?)';
  
  connection.query(query, [bbank_id, bbank_name, address, state, pincode], (error, results) => {
    if (error) {
      console.error('Failed to insert into blood_bank:', error);
      return res.status(500).json({ message: 'An error occurred while adding the blood bank', error: error });
    }
    res.status(200).json({ message: 'Blood bank added successfully' });
  });
});


app.post('/add-patient', (req, res) => {
  const { p_id, pname, blood_group, age, contact } = req.body;

  const query = 'INSERT INTO PATIENT (p_id, pname, blood_group, age, contact) VALUES (?, ?, ?, ?, ?)';
  
  connection.query(query, [p_id, pname, blood_group, age, contact], (error, results) => {
    if (error) {
      console.error('Failed to insert into patient:', error);
      return res.status(500).json({ message: 'An error occurred while adding the blood bank', error: error });
    }
    res.status(200).json({ message: 'Blood bank added successfully' });
  });
});

app.post('/add-blood-donation', (req, res) => {
  const { blood_id, donor_id,name,bbank_id,bloodgroup,amt_blood,date_donated } = req.body;

  const query = 'INSERT INTO BLOOD (blood_id, donor_id,name,bbank_id,bloodgroup,amt_blood,date_donated) VALUES (?, ?, ?, ?, ?, ?,?)';
  
  connection.query(query, [blood_id, donor_id,name,bbank_id,bloodgroup,amt_blood,date_donated], (error, results) => {
    if (error) {
      console.error('Failed to insert into blood:', error);
      return res.status(500).json({ message: 'An error occurred while adding the blood bank', error: error });
    }
    res.status(200).json({ message: 'Blood bank added successfully' });
  });
});

// Express.js backend route
// Node.js/Express backend

// Endpoint to get existing criteria
app.get('/blood-donation-criteria1', (req, res) => {
  const query = 'SELECT * FROM BloodDonationCriteria';
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).send('Error on the server.');
    }
    res.json(results);
  });
});

// Endpoint to add new criteria
app.post('/add-blood-donation-criteria', (req, res) => {
  const { condition, eligibility } = req.body;
  const query = 'INSERT INTO BloodDonationCriteria (Conditions, Eligibility) VALUES (?, ?)';
  connection.query(query, [condition, eligibility], (error, results) => {
    if (error) {
      return res.status(500).send('Error on the server.');
    }
    res.json({ message: 'Criteria added successfully!', data: results });
  });
});

app.delete('/blood-banks/:bbank_id', (req, res) => {
  const { bbank_id } = req.params;
  const query = 'DELETE FROM blood_bank WHERE bbank_id = ?';
  connection.query(query, [bbank_id], (error, results) => {
    if (error) {
      return res.status(500).send('Error on the server.');
    }
    res.json({ message: 'Blood bank deleted successfully' });
  });
});

app.delete('/patients/:p_id', (req, res) => {
  const { p_id } = req.params;
  const query = 'DELETE FROM PATIENT WHERE p_id = ?';
  connection.query(query, [p_id], (error, results) => {
    if (error) {
      return res.status(500).send('Error on the server.');
    }
    res.json({ message: 'Patient deleted successfully' });
  });
});

app.delete('/donors/:donorId', (req, res) => {
  const { donorId } = req.params;
  // Your logic to delete the donor from the database
  const deleteQuery = 'DELETE FROM donor WHERE donor_id = ?';
  connection.query(deleteQuery, [donorId], (err, result) => {
    if (err) {
      // handle error
      return res.status(500).send('Error deleting donor');
    }
    res.json({ message: 'Donor deleted successfully' });
  });
});

app.delete('/donations/:blood_id', (req, res) => {
  const { blood_id } = req.params;
  // Your logic to delete the donation from the database
  const deleteQuery = 'DELETE FROM blood WHERE blood_id = ?';
  connection.query(deleteQuery, [blood_id], (err, result) => {
    if (err) {
      // handle error
      return res.status(500).send('Error deleting donation');
    } 
    res.json({ message: 'Donation deleted successfully' });
  });
});

app.get('/blood-banks/count', (req, res) => {
  connection.query('SELECT COUNT(*) AS count FROM blood_bank', (error, results) => {
    if (error) {
      return res.status(500).send('Error on the server.');
    }
    res.json(results[0].count);
  });
});

// server.js
app.get('/donors-count', (req, res) => {
  const query = 'SELECT COUNT(*) AS donorCount FROM donor';
  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).send('Error fetching donor count');
    } else {
      res.json(results[0]); // results[0] contains the count
    }
  });
});



app.get('/patients/count', (req, res) => {
  connection.query('SELECT COUNT(*) AS count FROM patient', (error, results) => {
    if (error) {
      return res.status(500).send('Error on the server.');
    }
    res.json(results[0].count);
  });
});

app.get('/blood-donated/total', (req, res) => {
  connection.query('SELECT SUM(amt_blood) AS count FROM BLOOD', (error, results) => {
    if (error) {
      return res.status(500).send('Error on the server.');
    }
    res.json(results[0].count);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
