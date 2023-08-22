
# Story Point Democracy

## About

- This is a simple web-based game which allows agile scrum teams to vote on the story point value of PBI's

### Web Client

- Navigate to `./src/WebClient`
- Run `npm install`
- Run `npm start`

#### Dockerize

- Navigate to `./src/WebClient`
- Build Image `sudo docker build . -t <tag>`
- Run Container `sudo docker run --restart always -p 1234:1234 -itd --name spd-client <tag>`


### Web Server

- Navigate to `./src/WebServer`
- Run `npm install express ws`
- Run `node src/server.js`

#### Dockerize

- Navigate to `./src/WebServer`
- Build Image `sudo docker build . -t <tag>`
- Run Container `sudo docker run --restart always -p 3000:3000 -itd --name spd-server <tag>`
