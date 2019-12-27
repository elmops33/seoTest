# seoTest
SEO Test App
Bunny Studios SEO Technical Test Full-Stack Engineering
Author: Daniel Zeledon

Backend Configuration:

- The backend architecture was setup using Node JS, Express
- I am using Mongoose as the DB Driver with a connection to a MongoDB Atlas Database Cluster.
- The main operation code is run from a server.js file with two router files (users.js and tasks.js) for each REST API endpoint.  
- Both endpoints have routes for GET, POST and DELETE functions.  I am using POST requests to both create and update db entries.
- The models directory contains the db entry templates for both endpoints: user.model.js and task.model.js
- Port connections are setup up on port 3000 for client communications and port 5000 for server communication, there is no user authentication.
- The backend configuration resides on the backend folder.

Frontend Configuration:

- Used React JS for the client side configuration, using Axios Library to handle server communication, and bootstrap for minor css configuration on the user interface.
- The UI has a default Navbar header with a Menu link to navigate to the main menu, which displays user entries.

- From the Main Menu you can:
  1. Create New Users
  2. View Existing Users
  3. Access User Tasks
  4. Edit Users
  5. Delete Users
- The Create New User function calls a Webform that can be used to add a customer User ID and User Name, and will submit the information to the server.  Upon submission the system will return to the main menu and display an refreshed list of users.
- The Edit User option will revert to the same webform, with autopopulated data, so you can easily edit or modify the User ID and/or User Name.
- The Delete User option will instantly delete the user without any warning indicators.
- The User Tasks option will route the system to User Tasks view, where the data is filtered to any tasks assigned to the selected user.

- The User Tasks view displays the task ID, Description, State and available actions:
  1. The Create New Task option will load a Create New Task form similar to the Create New User, with options to set a Task ID and    Description.
  2. The Task Complete function will change the state of the Task to Completed, the task state is set to Pending by default when a new task is created.
  3. The Edit option will load the Edit Task form which will allow editing or modifying the Task ID and Task Name.
  4. The Delete Task option will instantly delete the task without any programmed warning indicators
  
  - There are various Back links that will allow the user to return to the previous view for ease of navigation.
