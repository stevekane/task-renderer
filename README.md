#Overview
This project is a demonstration of how the eplayer and authoring tool
should format and process data to accomodate branching, dynamic content,
and User Interaction.

#Setup
Follow these steps (as needed) to setup your machine to run this demo

1. install node.js from nodejs.org
2. clone the repository ```git clone git@git.emmisolutions.com:skane/eplayer-v1-demo.git```
3. enter the project root directory and run ```npm install```
4. install browserify using ```npm install -g browserify```
5. To rebuild the project after making changes, run ```browserify -o public/index.js --debug -t babelify --preset [es2015, react] input.js```
6. use any webserver of your choice to view the index.html file available
in the public directory.  I recommend using http-server which you can 
install using this command ```npm install -g http-server```.  Run the
server using ```http-server -p 8080``` from the root of the project.
