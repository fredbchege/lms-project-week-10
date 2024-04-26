// POST route to handle course selection
app.post('/courses/select', (req, res) => {
    const userId = req.session.userId; // Assuming userId is stored in session
    const selectedCourses = req.body.courses; // Array of selected course IDs

    // Store selected courses in the database
    // Example SQL query: INSERT INTO user_courses (user_id, course_id) VALUES (?, ?)
    // Execute the query for each selected course

    res.status(200).json({ msg: 'Courses selected successfully' });
});

// GET route to retrieve selected courses for a user
app.get('/courses/selected', (req, res) => {
    const userId = req.session.userId; // Assuming userId is stored in session

    // Retrieve selected courses for the user from the database
    // Example SQL query: SELECT * FROM user_courses WHERE user_id = ?
    // Execute the query and send the selected courses as a response
});

// Example database operations using mysql library
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'learning_management'
});

// Function to store selected courses in the database
function storeSelectedCourses(userId, selectedCourses) {
    selectedCourses.forEach(courseId => {
        const sql = 'INSERT INTO user_courses (user_id, course_id) VALUES (?, ?)';
        connection.query(sql, [userId, courseId], (err, result) => {
            if (err) {
                console.error('Error storing selected courses:', err);
                return;
            }
            console.log('Selected courses stored successfully');
        });
    });
}

