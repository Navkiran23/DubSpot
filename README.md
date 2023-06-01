# DubSpot
Schedule builder application that enables students to discover courses and develop their own schedules quickly and easily. 

# What is DubSpot?
DubSpot is a revolutionary schedule builder application that enables students to discover courses and develop their schedules quickly and easily. Through DubSpot, students will be able to contribute to course rankings to give insightful information for students looking to design their schedules. Likewise, the primary purpose for DubSpot is to create seamless schedules. Students can sync their course requirements and gather a recommended course load. Furthermore, students can also choose specific courses they want to enroll in and then have filtered results for other courses that will not conflict with current time slots. All in all, DupSpot aims to solve the issue of stressful registration periods by providing a streamline course schedule and backup plans if their first choices are not fulfilled.

Our idea is different due to the fact that it will allow students to build their schedule and plan their courses easily. Although Myplan has a built-in schedule planner, it does not allow students to clearly lay out their course plans. This application will allow students to see what options they have to fill in the gaps that their current schedule has. Accompanied with the added features of course rankings, reviews, and feedback. It will allow students to get recommendations for their schedule catered to them. Along with making the advisor's job easier.

# Main Goals
### Website
Which will be the main platform where students will go to access the entire project. It will basically be the host in which everyone will go to interact with the project and every feature we have added.
### Course Rankings
An additional feature which will allow students ease in deciding which courses they will want to take based on prior student reviews. A key part of this project is a way for students to differentiate between the options presented for their schedules. This is one of the main ways to do this so implementing this is important.
### Comment sections
Students who have taken the course can come and leave reviews for other students to see. Like the course rankings, this is another main goal whose purpose is to serve as a deciding factor between which courses to take. Student voices as reviews for a course are more trusting to a student (speaking from our personal experiences). So this is an important thing to implement.
### Calendar
A visual layout for the student to see how their course fits with the rest of their schedule. This is the bulk of the schedule. It is how students will see what their daily life for the quarter will look like. They need to visually see it and lay it out in order to decide properly. This calendar is probably the most important aspect.
### Accounts
Main way to access the website. You would need a login and privacy settings to use this project. So this is an important aspect to implement.
### Filters
To allow students to select their preferences for classes. We will try to do this better than myPlan as a key disadvantage of myPlan is how hard it can be to filter out courses according to what you want. It will be the main attraction and is thus very important to implement.

# Stretch Goals
### Incorporate data from ratemyprofessor.com and UW course evaluations
This is a stretch goal because it would mean loading in data from other resources. This is an additional feature which can be added to the project once finished. We aim to get this information added into the website as it would be beneficial to students, but again it is not an integral part of the project.
### Friending other users and sharing class schedules
This is a stretch goal because it ties into a privacy aspect. Finding out when a certain person you have friended has a class can be dangerous in some situations. We need to devise a plan to implement this correctly and doing so might take time. As the other stretch goal, this is not an integral part of the project but a bonus we can implement if we have time.

# Project Structure
The folder for the backend contains the SQL data that will be imported into the website.
It also contains the Sheets page which will have the data layout

The folder for the frontend contains the HTML and CSS components we will be using to create the webpage

The weekly reports folder contains the weekly reports by our group

The testing features contains any testing files

# How to build and test
Building and testing will usually be done once the repository is cloned, below are the instructions you can follow once you clone the repository into your code editor.

We have automated tests set up on github so in order to test the code, all you have to do is make a push to the repo and the tests will automatically run. Our system uses a SQL server hosted on Microsoft Azure and as of right now it will be online 24/7 so there is no need to set or start anything up for that. To launch the website you can follow the steps below:

1. node needs to be installed.

2. If you get an error then you might not have node installed so then you should run npm install

3. After that you then have to type in "node ." in the terminal. 

4. The website will then be accessible at "http://localhost:3000/" on your local machine.

5. after the / you can enter the exact link for the webpage you wish to access for course finder it would be: Type in localhost:3000/coursefinder

6. At the log in you can sign up/ login with whichever credentials you like!

7. Then you should be able to use the navbar to navigate

testing the system:
1. Run npm test in the terminal but the server has to be running in another terminal
2. So you open up two terminals run the build steps from above
3. then in your second terminal run npm test and test the webpage

# Use cases
Signup/login: The login and sign up is now fully functional! The user can sign up with our form which will then have their information securely inputted in our database. The password is not visible to us due to it being hashed.

Searching for classes: Our search bar is fully functional to find a specific class and information about the class. You can type in the course number to search the class. Upon clicking on a class you will see information show up on the sidebar telling you all you need to know about the course.

Adding event to a Calendar: Once you click the add course to calendar button the course should be displayed on DubSpot's calendar.

Leaving a review: Once logged in you will be able to leave a review under a course you have taken to help better guide students on their course selection journeys.

