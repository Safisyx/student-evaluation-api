# student-evaluation-api
Backend for https://github.com/Safisyx/evaluation-client ((Node, TypeScript, TypeORM))
This was the final individual evaluation at [codaisseur](https://codaisseur.com). The goal is to create an app to allow 
teachers to daily evaluate students by assigning a color green (on track), yellow(rather good) or red(need attention). 

## To run it
First you need [Node.js](https://nodejs.org/en/), and configure the database link (I am using [postgreSQL](https://www.postgresql.org/)).  
Run ```npm install``` to install the dependencies, you may want to use [yarn](https://yarnpkg.com/en/) as it is a ultra fast dependency manager :smile:  
Run ```npm run compile``` to compile the project to get the javascript files.  
Run ```node .``` to start the api  
Run ```npm run seed``` to seed the teachers table with a user (email: <super@example.com>, password: SuperUser)  
Now you are ready to play with the frontend :smiley:  
### Safidy Ratsimbazafy
