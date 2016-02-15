My first Xtribe manager

Please follow the 'Getting Started' section steps to install locally a manager for your own Xtribe game. This manager is the starting point for developing your own manager, providing useful tools to enhance creating experiments experience. Please refer to 'Xtribe Manager API' for details.

Get started
- Make sure to have a recent version of node.js (https://nodejs.org/en/) installed on your computer.
- Create a directory to store your manager and clone this repository inside it.
- Run 'npm-install'
- Run 'node index.js'
- Visit 'http://localhost:11345/' to check your manager is running
- Modify 'index.js' to customize your manager

Xtribe Manager API

startManager(port,manageSystemMessage,manageExperimentMessage,monitorEnabled)
    port: your manager will listen on this port
    system message callback: callback for managing system messages
    experiment message callback: callback for managing your own experiment messages
    debug mode: true or false to run it in debug mode




