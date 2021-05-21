<h1 align='center'>
  <img src='.logo/rentx_logo.png'>
</h1>

<div align="center">
  <a href="https://opensource.org/licenses/MIT"><img alt="License MIT" src="https://img.shields.io/badge/license-MIT-brightgreen"></a>
</div>

<p align="center">
  <a href="#interrobang-what-is-rentx">About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-technologies">Technologies used</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#construction_worker-how-to-use-developing">How to use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#books-documentation">Docs</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#confetti_ball-how-to-contribute">How to contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#key-license">License</a>
</p>

--- 

## So, what is RentX?

RentX is a high-quality and well-rated car rental service. <br>
Analyze vehicle specifications, choose the one that best suits you. Save and travel safely! <br>

This API was developed in the NodeJS - Ignite Bootcamp, from Rocketseat. 🔥🚀 


## :rocket: Technologies:

This back-end project was developed using the following technologies:

- [Typescript][typescript]
- [Node.js][nodejs]
- [Express][express]
- [PostgreSQL][postgresql]
- [Multer][multer]
- [Swagger UI][swagger]
- [Amazon AWS][aws]
- [Handlebars][handlebars]
- [Ethereal Mail][ethereal]
- [Jest][jest]
- [TypeOrm][typeorm]
- [Redis][redis]
- [RateLimiter DDoS][ratelimiter]
- [Sentry][sentry]

## :construction_worker: How to use: (developing)

To clone and run this API you will need the following software installed on your computer:

- [Git][git]
- [Node][nodejs]
- [Docker][docker]

### :electric_plug: Install dependencies and run the application:
```bash
# Clone this repository:
$ git clone https://github.com/jagimenes/rentx

# Enter the repository:
$ cd rentx

# Install the dependencies:
$ yarn

# Start the database server:
$ docker-compose up

#Start the app server
$ yarn dev

# The server is running at port 3333 (http://localhost:3333/)

#To use AWS, you can configure the TAGS on .env

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET=
AWS_BUCKET_REGION=
AWS_REGION=
AWS_BUCKET_URL=
LOCAL_URL=

disk=s3
mail=ses

REDIS_HOST=
REDIS_PORT=

SENTRY_URL=

#Or you can use local only (example in .env.example)

#Configure ormconfig.json (example in ormconfig.example.json)

#Enjoy 🍾
```


## :books: Documentation:
All API endpoints have been documented using Swagger. To view just access the URL below or click on this [link](http://localhost:3333/api-docs). <br>
*Remember to start the server first*

*http://localhost:3333/api-docs* 


## :confetti_ball: How to contribute:

-  Make a fork;
-  Create a branch with your functionality: `git checkout -b <your_feature_name>`;
-  Submit the changes made: `git commit -am 'type(scope): <description>'`;
-  Push your branch: `git push origin <your_branch_name>`.

After your request is accepted and added to the project, you can delete your branch.


## :key: License:

This project in under MIT license, for more details check in [LICENSE][license]. <br>
Feel free to bring new features or fix problems, it will be a pleasure! 💜

---

<div align='center'>
  Made with 💜💜💜  by <strong>Jairo Gimenes</strong> 🚀
  <a href='https://www.linkedin.com/in/jairogimenes/'>Get in touch!</a>
</div>


[typescript]: https://www.typescriptlang.org/
[nodejs]: https://nodejs.org/en/
[express]: https://expressjs.com/pt-br/
[postgresql]: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
[multer]: https://github.com/expressjs/multer
[swagger]: https://swagger.io/
[git]: https://git-scm.com
[docker]: https://www.docker.com/
[aws]: https://aws.amazon.com/
[handlebars]: https://handlebarsjs.com/
[ethereal]: https://ethereal.email/
[jest]: https://jestjs.io/
[typeorm]: https://typeorm.io/
[redis]: https://redis.io/
[ratelimiter]: https://github.com/animir/node-rate-limiter-flexible
[sentry]: https://sentry.io/

[license]: https://github.com/jagimenes/rentx-api/blob/master/LICENSE
[linkedin]: https://www.linkedin.com/in/jairogimenes/