# PROJECT NAME

## Description

_Duration: Weekend Sprint

We created a 'TO DO' application. This type of application is very common to tackle when learning a new language, which makes it extremely valuable to work through and apply new techniques and technical ideas. Chances are good that at some point in our careers we will tackle this again while learning another language.


## Screen Shot



https://user-images.githubusercontent.com/109047343/202033850-d6c75cda-7329-4476-9e31-c88ba5171419.mov



#### Basic Overview

- [ ] Include one or two screenshots of your project here

### Prerequisites

### Technologies
------------
* HTML
* CSS
* JavaScript
* JQuery
* Node
* Express
* SQL
* Postgres

## Installation

1. Create a database named `weekend-to-do-app` with table name `to_do_list`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), you will need to have it installed. 

We recommend using Postico to run those queries as that was used to create the queries.

3. Open up your editor of choice and run an `npm install`
4. Run `npm install express` in your terminal
5. Run `npm install pg` in your terminal
7. Run `npm start` will open the server for localhost:5000

## Usage
How does someone use this application? Tell a user story here.

1. Keep a list of events.
2. Focus important evens or favorite to do items using stars.
3. Sort their to do list by various methods.

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io), who equipped and helped me to make this application a reality. Thanks to all my colleges, friends and family for their technical and social support.

## Support
If you have suggestions or issues, please email me at [dampieranthony2@gmail.com](www.google.com)

**Here are the specific components for the challenge:**

[x] Create a front end experience that allows a user to create a Task.
[x] When the Task is created, it should be stored inside of a database (SQL)
[x] Whenever a Task is created the front end should refresh to show all tasks that need to be completed.
[x] Each Task should have an option to 'Complete' or 'Delete'.
[x] When a Task is complete, its visual representation should change on the front end. For example, the background of the task container could change from gray to green. The complete option should be  'checked off'. Each of these are accomplished in CSS, but will need to hook into logic to know whether or not the task is complete.
[x] Whether or not a Task is complete should also be stored in the database.
[x] Deleting a Task should remove it both from the front end as well as the Database.

### Styling

Use CSS styling to move the aesthetic of the page beyond the vanilla HTML look:
  - background color of the page
  - font family and size
  - text color & or background color of tasks *to show whether or not they have been completed*

### Approach

We would recommend you spend some time thinking about how to approach this problem. Think through all the logic that will be needed prior to writing any code. Take your time, relax, remember that impostor syndrome is real, and that you are capable of knocking this out of the park!

### Create a Database

[x] Be sure to create a new database through Postico. Use the name `weekend-to-do-app`. You will need to use this name in your database connection configuration on your server.

### Database Structure

[x] Please include a `database.sql` text file in your repo that includes all of your `CREATE TABLE` queries. This is so we can re-create your database while testing your app.

## Stretch Goals

For each of your stretch goals, you will be practicing git branching. Please refer to the branching notes for a reminder on commands. Each branch will be merged into main using `--no-ff`. This will allow us to see that you branched your feature when you turn in your code.

- `feature-styling-bootstrap` 

    - [ ]  Add Bootstrap to the front end and style it up!
      - Buttons -- make the creation buttons and completion buttons green and the delete red.
      -  Inputs -- make your text inputs styled in the bootstrap way
      -  Responsive -- make your app responsive to different screen sizes -- check out the [Layout](https://getbootstrap.com/docs/4.1/layout/overview/) section

- `feature-confirm-delete`

    - [x]  In whatever fashion you would like, create an 'are you sure: yes / no' option when deleting a task.
        - Some styled options are [Bootstrap Modal](https://getbootstrap.com/docs/4.0/components/modal/) or [Sweet Alerts](https://sweetalert.js.org/guides/): Use the CDN option.

- `feature-ordering-task-query` 

    - [x]  Research [Query Params](https://expressjs.com/en/api.html#req.query) to have the request reverse the order of the returned todos. 
    
- `feature-time-completed` 

    - [ ]  Add the ability to record when a task was completed. Show the completed date on the frontend in a pretty format.
