#Building a manager

Welcome to Xtribe games manager developing framework! Please follow the **Get Started** section steps to install locally a manager for your own Xtribe game. This manager is the starting point for developing your own manager, providing useful tools to enhance creating experiments experience. Please refer to **Xtribe Manager API** section for details.

#Get started
- Make sure to have a recent version of [node.js](https://nodejs.org/) installed.
- Create a directory to store your manager and copy **index.js** and **package.json** inside it.
- Run `npm-install` to install required dependencies
- Run `node index.js` to run your manager
- Visit **http://localhost:11345/** to check it is running
- Modify **index.js** for customizations

#I'm one step ahead!
So, you have already developed your manager in node.js? If you want to use our managers API, install it in your project.
In your manager directory run `npm install etsman`.


#Xtribe Manager API

startManager(port,manageSystemMessage,manageExperimentMessage,monitorEnabled)
- port: your manager will listen on this port
- system message callback: callback for managing system messages
- experiment message callback: callback for managing your own experiment messages
- debug mode: true or false to run it in debug mode




