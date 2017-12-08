# Next 5

A React Single Page Application that lists the Next 5 upcoming races, sorted by time. Event details are provided when clicking on each event. The app consumes Ladbrokes API.

## Getting Started

This project is built on [React](https://reactjs.org)

### Prerequisites

You’ll need to have Node >= 6 on your machine. The app uses [React-Router](https://github.com/ReactTraining/react-router)


### Installing

Follow instructions at [Create React App](https://reactjs.org/docs/installation.html#creating-a-new-application) if you want to create a new app from sratch, then copy the content under src folder to same directory under your app for the source code. 

Make sure you enable [ES6 and JSX](https://reactjs.org/docs/installation.html#enabling-es6-and-jsx) and install [React-Router](https://www.kirupa.com/react/creating_single_page_app_react_using_react_router.htm)

## Running the tests

As Ladbrokes server points Access-Control-Allow-Origin header to its own [domain](http://www.ladbrokes.com.au), you might encounter [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) issue with latest browser. Following instruction at this [article](https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome) to disable same origin policy in Chrome to fix that issue.

For Chrome on MacOS
```
open -a Google\ Chrome --args --disable-web-security --user-data-dir
```

## Built With

* [React](https://reactjs.org/)
* [Bootstrap](http://getbootstrap.com/)
* [NodeJS and npm](https://nodejs.org/en/)
* [jQuery](https://jquery.com)

## Notes
Sometimes API returned with [502 Bad Gateway](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502) responses, just need to refresh or click on the link again to recall the API
