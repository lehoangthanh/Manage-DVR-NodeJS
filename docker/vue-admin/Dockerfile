FROM node:lts-alpine
# install simple http server for serving static content
#RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app
CMD [ "cd", "/app/vue-admin" ]
# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./
RUN ls
# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
#RUN npm run

EXPOSE 8001

RUN npm run serve
#CMD [ "http-server", "dist" ]