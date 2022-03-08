FROM node:current-alpine

LABEL author: "Lev" \
      title: "broccoli n co" \
      description: "just learning some Docker"

# NEXT come back and see if i can just do any file structure
RUN mkdir -p /usr/src/app

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN yarn

ENTRYPOINT ["yarn", "start"]