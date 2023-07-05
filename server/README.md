# Server API for Saoul Bonmonsieur

Because each website need to fetch some data from a database I needed to make an API. In fact, I don't really like Frameworks, they are too complex for the simpliest ideas. However I really familiarized with the PERN stack. Postgresql being easy to install, use, and being one of the fastest Database, the choice was rather obvious.

## Launch the server

You first need to install the required modules with npm.
```bash
npm i express pg cors
```

Then we launch the server with nodemon if there is a change. Or simply with node if it's a release build.
```bash
nodemon index
```
```
node index
```