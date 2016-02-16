#Building a manager

Welcome to Xtribe games manager developing framework! Please follow the **Get Started** section steps to install locally a manager for your own Xtribe game. This manager is the starting point for developing your own manager, and the library included provide a set of useful tools to enhance creating experiments experience. Please refer to **Xtribe Manager API** section for details.

#Get started
- Make sure to have a recent version of [node.js](https://nodejs.org/) installed.
- Create a directory to store your manager and copy **index.js** and **package.json** inside it.
- From the directory you just created, run `npm-install` to install required libraries. This will create a 'node_modules' directory, containing Xtribe Manager Library (etsman) and the libraries it depends on.
- Run `node index.js` to run your manager.
- Visit **http://localhost:11345/** to check if it is running.
- Modify **index.js** for customizations.

#I'm one step ahead!
So, you have already developed your manager in node.js? If you want to use our managers API, install it in your project.

In your manager directory run 

`npm install etsman` 

and do not forget to include it in your main js file 

`var etsman = require('etsman');`.


#Xtribe Manager API

startManager(port,manageSystemMessage,manageExperimentMessage,monitorEnabled)
- port: your manager will listen on this port
- system message callback: callback for managing system messages
- experiment message callback: callback for managing your own experiment messages
- debug mode: true or false to run it in debug mode

#Troubleshooting
- *When I run my manager, this error is shown.*
 
   `Error: Cannot find module 'etsman'`

  - You have not installed Xtribe Manager Library. Run `npm install` in the directory where you stored index.js and package.json.
  
- *When I install libraries with `npm install`, my node_modules directory is nearly empty or it is not created.*
  - Check your permissions. If you are on Linux or Mac OS you may need to run npm install as superuser.

- *When I install libraries with `npm install`, my node_modules directory is nearly empty and this error is shown:*

    `npm ERR! Error: shasum check failed`

  - Check your node is updated to the most recent version. Optionally, reset your npm

     `npm set registry http://registry.npmjs.org/` 
     
     `npm cache clean`

