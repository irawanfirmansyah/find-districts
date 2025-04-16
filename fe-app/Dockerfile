FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Copy project files
COPY . .


# Install dependencies
RUN yarn install

# Build app
RUN yarn build

# Environment variables
ENV PORT=3000
EXPOSE 3000

CMD ["yarn", "preview"]