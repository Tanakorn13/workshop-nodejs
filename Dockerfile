FROM node:20-slim

# Install necessary dependencies
RUN apt-get -y update && apt-get install -y openssl

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
