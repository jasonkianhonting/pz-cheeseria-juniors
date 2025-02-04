# pull official base image
FROM node:16.18.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --force
RUN npm install react-scripts@5.0.1 --force

# add app
COPY . ./

# start app
CMD ["npm", "start"]
