Description: This is a Youtube clone project built with Node.js, Express, Mongodb with mongoose and Joi for input validation. It supports fetching authentication, adding, fetching videos and adding comments.

Make sure that node.js and mongo is installed in local system
Setup:
    Clone the repository:  https://github.com/Syimlieh/youtube-clone-be.git
    Go to the cloned directory and run " npm install "
    Start the application by running: " npm run dev "


API Base URL: http://localhost:4000


Available Endpoints
    Auth
    POST /signup - Signup new user and add to db

    POST /login  - Login new user and generate token on successfull login

    POST /me  - Will get the user detail based on token

    