# Review Questions

## What is Node.js?
    Node.js is chromes V8 browser engine that has been designed to run on the server.

## What is Express?
    a lightweight framework for creating api's

## Mention two parts of Express that you learned about this week.
    this week we learned how to setup middleware and routing. 

## What is Middleware?
    middleware is software that runs and intercepts our api calls and allows us to execute code or handle situations before the request is sent to the server.

## What is a Resource?
    A resource is an end point that is listening for requests.  that endpoint contains the logic to act on the data thats sent to it.

## What can the API return to help clients know if a request was successful?
    status(200)

## How can we partition our application into sub-applications?
    we can use express.Router to create sub-applications. express router allows us to create a set of end points in a separate file,export those end points and import them for use in our server.
    
## What is express.json() and why do we need it?
    express.json is built in middleware that parses incoming requests with json payloads.
