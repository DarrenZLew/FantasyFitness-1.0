# Fantasy Fitness

## Development

For development run the client and server on two different applications.

To run the client application in development, cd into the client folder and `npm start`. 

To run the server application in development, cd into the server folder and `npm start:dev`. The server will track file changes are restart the app. If no PORT environment variable is specified, then it will serve on port 5001.  For DB connections, the database used is the DATABASE_URL environment variable. If not defined, it will use the URI specified in `./config/index.json` under property `dbUri`.

Do not install any node modules in the root directory.

## Production

For production, a single application will be used using build files from the client that are served on the backend. On Heroku for deploying, only the [NodeJS buildpack](https://devcenter.heroku.com/articles/nodejs-support) will be needed. Post-build scripts will build the client files prior to deployment