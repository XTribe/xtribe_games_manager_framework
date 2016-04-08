#Building a manager in node.js

Welcome to Xtribe Games Manager Framework! Please follow [Quick Start](#quickstart) section steps to install a manager for your own Xtribe game. This is the starting point for developing your own manager, and the library included provide a set of useful tools to enhance creating experiments experience. Please refer to [Xtribe Games Manager API](https://github.com/XTribe/xtribe_manager_api) for details.
<a name="quickstart"><a/>
#Quick Start
- Make sure to have a recent version of [node.js](https://nodejs.org/) installed.
- Download the [Xtribe Games Manager Framework](https://github.com/XTribe/xtribe_games_manager_framework/archive/master.zip) from our [Github project](https://github.com/XTribe/xtribe_games_manager_framework).
- Unzip the file.
- Open a command-line terminal and change directory to the 'master' directory you just unzipped or copy files in a directory of your choice and change to it.
- Run `npm-install` to install required libraries. This will create a 'node_modules' directory, containing Xtribe Manager Library (etsman) and the libraries it depends on.
- Run `node index.js` to run your manager.
- Visit **http://localhost:11345/** on your browser to check if it is running. This is the manager URI to provide to Xtribe while publishing the game.
- Modify **index.js** for customizations.
<a name="includeapi"><a/>
#Include Manager API in your project
If you already have developed a manager in node.js and you want to use our Xtribe Manager API, install it is very easy.

In your manager directory run 

`npm install etsman` 

and do not forget to include it in your main js file 

`var etsman = require('etsman');`.
Please refer to [Xtribe Games Manager API](https://github.com/XTribe/xtribe_manager_api) for details about utilities available.
<a name="references"><a/>
#References
[Join the Experimental Tribe!](http://xtribe.eu/)

[Xtribe Documentation](http://xtribe.eu/en/page/xtribe-devdoc)

[Xtribe Games Manager Framework](https://github.com/XTribe/xtribe_games_manager_framework)

[Xtribe Games Manager API](https://github.com/XTribe/xtribe_manager_api)

[Contact us](mailto:xtribe.eu@gmail.com)
<a name="troubleshooting"><a/>
#Troubleshooting
- *When I run my manager, this error is shown.*
 
   `Error: Cannot find module 'etsman'`

  - You have not installed Xtribe Manager API. Run `npm install` in the directory where you stored downloaded files.
  
- *When I install libraries with `npm install`, my node_modules directory is nearly empty or it is not created.*
  - Check your permissions. If you are on Linux or Mac OS you may need to run npm install as superuser.

- *When I install libraries with `npm install`, my node_modules directory is nearly empty and this error is shown:*

    `npm ERR! Error: shasum check failed`

  - Check your node is updated to the most recent version. Optionally, reset your npm

     `npm set registry http://registry.npmjs.org/` 
     
     `npm cache clean`