# Set the base image.
FROM node:9.6.1

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable --only-upgrade google-chrome-stable

# Create and define the node_modules's cache directory.
RUN mkdir /usr/src/cache
WORKDIR /usr/src/cache

# Install the application's dependencies into the node_modules's cache directory.
COPY package.json ./
COPY package-lock.json ./
RUN npm install &&\
    npm install -g @angular/cli &&\
    npm i typings -g &&\
    npm install bootstrap font-awesome jquery  &&\
    typings install lodash


# Create and define the application's working directory.
RUN mkdir /usr/src/app
WORKDIR /usr/src/app


# CMD ["cp", "-r",  "/usr/src/cache/node_modules", "."]
# CMD ["ng",  "serve",  "--host", "0.0.0.0"]
# CMD  rm -rf /usr/src/app/node_modules

CMD  cp -R  /usr/src/cache/node_modules/ /usr/src/app/  ; ng  serve  --host 0.0.0.0
# ; ng  serve  --host 0.0.0.0
#RUN  cp -R  /usr/src/cache/node_modules/ . ; ng  serve  --host 0.0.0.0
# CMD  ng  serve  --host 0.0.0.0
# ENTRYPOINT ["sh", "/usr/src/app/entrypoint.sh"]
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# CMD ng  serve  --host 0.0.0.0
