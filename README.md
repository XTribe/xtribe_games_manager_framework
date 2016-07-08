#Building a manager in node.js

Welcome to Xtribe Games Manager Framework! Please follow [Quick Start](#quickstart) section steps to install a manager for your own Xtribe game. This is the starting point for developing your own manager, and the library included provide a set of useful tools to enhance creating experiments experience. Please refer to [Xtribe Games Manager API](https://github.com/XTribe/xtribe_manager_api) for details.
Check out 'examples' directory for a lot of useful examples about building your own manager.
<a name="quickstart"><a/>
#Quick Start
- Make sure to have a recent version of [node.js](https://nodejs.org/) installed.
- Download the [Xtribe Games Manager Framework](https://github.com/XTribe/xtribe_games_manager_framework/archive/master.zip) from our [Github project](https://github.com/XTribe/xtribe_games_manager_framework).
- Unzip the file.
- Open a command-line terminal and change directory to the 'master' directory you just unzipped or copy files in a directory of your choice and change to it.
- Run `npm-install` to install required libraries. This will create a 'node_modules' directory, containing Xtribe Manager Library (etsman) and the libraries it depends on.
- Run `nodejs index.js` to run your manager.
- Visit ** http://localhost:11345/ ** on your browser to check if it is running. Please notice that Xtribe needs to reach your manager so start it on a server that is someway reachable, that is having an url address or a fixed ip (e.g.:http://yourServerAddressOrIp:11345/). This is the Manager URI to provide to Xtribe while publishing the game.
- Modify **index.js** for customizations.
- Check out **examples** directory and take a look to code examples to get started about building your own manager.
<a name="includeapi"><a/>
#Include Manager API in your project
If you already have developed a manager in node.js and you want to use our Xtribe Manager API, install it is very easy.

In your manager directory run 

`npm install etsman` 

and do not forget to include it in your main js file 

`var etsman = require('etsman');`.
Please refer to [Xtribe Games Manager API](https://github.com/XTribe/xtribe_manager_api) for details about utilities available.

<a name="managerapi"><a/>
#How to use examples with my game interface on Xtribe?
Did you already create your game and user interface on Xtribe, didn't you? Check out our [tutorial](http://xtribe.eu/node/64#XTribe_tutorial:_your_first_game) to create your first game on our platform. Follow ['Publishing the game'](http://xtribe.eu/node/64#Publishing_the_game) and ['User Interface'](http://xtribe.eu/node/64#User_interface) paragraphs instructions. It's easy and quick.

The example managers provided, run as standalone application as you start them:

`nodejs example_name.js`

Every example starts on port 9000+example number (e.g.: 9001 for example 1, 9002 for example 2), so, if you start one of them on your server, it will be running on an url like:

`http://yourServerAddressOrIp:9001`

Copy this url and paste it in 'Manager URI' field in the settings of your game. Now, play your game to see the manager in action. 

Please notice that Xtribe needs to reach your manager so start it on a server that is someway reachable, that is having an url address or a fixed ip (e.g.:http://yourServerAddressOrIp:yourPort/). 

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