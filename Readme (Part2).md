Frontend Third Party Descriptions
Axios
Axios was used to handle API requests. It is used extensively throughout the app. 
Login screen – post credentials, receive back token
Upload screen – post .csv with token, receive back break schedule
Floater screen – GET existing break progress, POST whenever a break is completed
Manager view screen – POST date, get back break schedule for that date
Moment
Moment was used to format times (hh:mm) in the fixed element at the bottom of the screen in the floater view.
Ordinal
Ordinal was used to add the suffix of each break’s break number in the break title (e.g. Jim’s 1st 30, Jim’s 2nd 15).
Pretty-ms
Pretty-ms was used in the break component to format the elapsed time (stored in milliseconds) to a more readable timer format (mm:ss). 
React-router-dom
React-router-dom was used to make the app a single page application. App.js consists of Route components, which redirect the user to login or the appropriate page given how they have been authenticated/authorised. The package allows the user to navigate through the views without refreshing the page or sending a request to the server. 
Styled-components
Styled-components was used to style our components. The package enables us to construct styled elements within the same file as a component. Further to this, these elements can be called just like regular React components, which allows for a lot of modularity. 

Cypress was utilised for the front end testing and extensive front-end tests were carried out to ensure an optimal user experience. End-to-End testing was used. 

Backend Third Party Descriptions

-	Celebrate was used to validate email and password for the login, it is used to ensure correct user details have been entered. 
	papa parse was used to parse csv file into JSON format
         Multer is used for uploading files
          passport is used for both local and jwt strategies to handle user authentication. User testing - production
Layout is very intuitive
Match lingo used at work, i.e. “Zach’s 1st 15”
Difficult to trust the app, hard to confirm that all the breaks are present on the screen (as it’s really bad if someone misses a break entirely; they have to be paid overtime in this case)
User testing – development
Need to convert floater view from relying on state to instead storing start/end times in database
Timer ticked over by an extra second once finish was checked