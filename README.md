# webpack AngularJS Starter

A basic starter package for a new AngularJS project. Code is grouped in module folders as opposed to controller/service/directive folders. Mocha tests for the module should be placed in the corresponding `test/modules/[name].test.js` file.

# Install and Usage

For mac and linux users: Build docker mysql container.

```
cd docker-mysql
./build.sh
```

Go back to project root, install project dependencies, start mysql, and start the frontend and backend servers.

```
npm install
npm run mysql
npm run dev
```

Visit http://localhost:8080/ afterwords.

# Tests

You can run the karma+mocha+chi tests by running `npm run test`. See auth.test.js for an example of
"midway tests" - not true unit tests, but not end-to-end tests either.  They are a sort of middle ground
constructed like unit tests, but allow live api calls instead of requiring mock API data.