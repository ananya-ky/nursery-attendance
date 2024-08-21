# NURSERY ATTENDANCE MANAGEMENT

This project is a Nursery Attendance Management System, built using React and Tailwind CSS. The system allows users to view, check in, and check out children attending the nursery.

Note: Before starting , set the env variable `REACT_APP_API_KEY` with the API keys to access Famly APIs.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### Project Structure

The project is organized as follows:

src/components: Contains the UI components like Display(main component), ChildrenList(displays the children data table), and Pagination.
src/hooks: Custom hooks such as useChildrenData to manage state and logic.

#### Features

1. Display Children
The application displays a list of children attending the nursery. Each child is shown with their name, profile picture, and current status (checked in or checked out).The data is organized and displayed using a Tailwind CSS-styled table.

2. Pagination
The list of children is paginated, with each page displaying 10 records. Users can navigate through pages using the pagination controls at the bottom of the list, making it easy to navigate through large amounts of data, offering good experience.

3. Check-In
Users can check in a child by selecting a pick-up time (default is 4:00 PM) and clicking the "Check In" button. 

4. Check-Out
Once a child has been checked in, the "Check Out" button becomes active, allowing users to check out the child. If a child has not been checked in , the "Check Out" button remains disabled.


#### Styling

The project uses Tailwind CSS for styling. Tailwind's utility-first approach allows rapid UI development with minimal custom CSS.
