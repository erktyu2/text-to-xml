# <div align="center"> XML - converter</div>
<div align="center">

<img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Xml_logo.svg" height="100" alt="bowling">

This is a piped-text to xml converter app.


</div>

***
# Description
This is an electronjs app that is created with electron-forge boilerplate.

***
# Installing dependencies
>npm i

# Creating an executable version of this app
Install dependencies and run the following command

>npm run make

## Known issue on some mac computers
there is a known issue that sometimes when executable is downloaded, macOS 
doesn't allow user to run that executable app.

it says as the following
>"your-app.app" is damaged and can’t be opened. You should move it to the Bin.

if it is the issue then run the following command in the terminal
>xattr -d com.apple.quarantine path/to/your/app/your-app.app

# Development
To run your code in development mode, install dependencies and run the following command
>npm start

## To activate debugging tools
Add the following code into your window, by doing that you start chrome-dev-tools at that window.
And then you can debug your code by putting a breakpoint in dev-tools or by adding "debugger;" into your code. 

>yourWindow.webContents.openDevTools();

## Refresh edited code
There is no hot reload, but you can type "rs" and press enter on your app-running console to refresh the code and to quick start.