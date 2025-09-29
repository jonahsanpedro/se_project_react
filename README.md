# Project 14 - summary

Full-Stack Frontend Integration for WTWR

Integrated frontend React application with the previously built Express/MongoDB backend, enabling seamless communication via protected API calls.

Implemented user registration and authentication on the frontend with RegisterModal and LoginModal components, sending requests to /signup and /signin endpoints; stored JWT tokens in localStorage for session persistence.

Created a CurrentUserContext to manage and share logged-in user state across the application, ensuring dynamic rendering of UI elements based on authorization status.

Updated Header, ItemModal, and ClothesSection components to conditionally display UI elements such as user avatars, edit/delete buttons, and clothing items based on ownership and login state.

Enabled profile editing with EditProfileModal, sending updates to the backend via authenticated requests and reflecting changes in real-time through React state.

Implemented like/dislike functionality for clothing items, ensuring only authorized users could interact and maintaining consistent state updates without manual DOM manipulation.

Added sign-out functionality, clearing JWT tokens from localStorage and updating application state to log out users securely.

Ensured route protection on the frontend by redirecting unauthorized users from protected pages to the main landing page.

Technologies: React, JSX, Context API, JWT, localStorage, Axios/fetch, React Hooks, Express, MongoDB

# Project 11 - What To Wear Today

This project focuses on our What to Wear Today application. We expanded on our knowledge of React Router and included new features to our application as well as created mock API interactions through a JSON server.

New features included in this application are a toggle switch for temperature units allowing the user to change the units from fahrenheit to celcius, we can now navigate to a separate profile page through the use of routes learned in this sprint, the ability to add and delete new or old clothing items through use of POST and DELETE requests and also to fetch and save data to our website from a local mock server though a GET request.

[GitHub Repository](https://github.com/jonahsanpedro/se_project_react)

# Project 14 - Fullstack What To Wear Today

This project is the first full stack implementation of the What To Wear Today application. It is the first time that I am connecting my React project to my Express project to provide user registration, a log in function, authentication, profile management, clothing item interactions including "liking" and "unliking" clothing item cards and finally a log out function.

Tackling this project introduced new featues to my WTWR app. I implemented a user registration and login. In these modals I also included a function to switch between registration modals and login modals just in case users accidentally clicked register by accident but needed to login and vice versa. I also created authentication with use of tokens. Other features implemented in this project are the use of an edit profile function in case you wanted to edit your name as well as avatar. This project also included the like/dislike and add/delete functionality of clothing items but only accessible if a user is logged in. Finally I created a log out function for users.

Frontend
[GitHub Repository](https://github.com/jonahsanpedro/se_project_react)
Backend
[GitHub Repository](https://github.com/jonahsanpedro/se_project_express)

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
