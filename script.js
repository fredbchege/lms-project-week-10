document.addEventListener('DOMContentLoaded', () => {
    const courseSelectionForm = document.getElementById('courseSelectionForm');
    const selectedCoursesList = document.getElementById('selectedCoursesList');

    // Event listener for course selection form submission
    courseSelectionForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(courseSelectionForm);
        const selectedCourses = formData.getAll('course');

        try {
            const response = await fetch('/courses/select', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ courses: selectedCourses })
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.msg); // Display success message
            } else {
                alert('Course selection failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Function to fetch and display selected courses for the user
    async function displaySelectedCourses() {
        try {
            const response = await fetch('/courses/selected');
            if (response.ok) {
                const selectedCourses = await response.json();
                selectedCoursesList.innerHTML = ''; // Clear previous courses
                selectedCourses.forEach(course => {
                    const listItem = document.createElement('li');
                    listItem.textContent = course.name; // Assuming course object has a 'name' property
                    selectedCoursesList.appendChild(listItem);
                });
            } else {
                console.error('Failed to retrieve selected courses');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Call the function to display selected courses when the page loads
    displaySelectedCourses();
});
