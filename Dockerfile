FROM gcr.io/google-appengine/nodejs

# Set common env vars
ENV NODE_ENV production
ENV PORT 8080

WORKDIR .

COPY . .

RUN npm ci

# start
CMD ["npm", "start"]