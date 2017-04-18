FROM node:7.9.0-alpine
#RUN mkdir -p /server/www
ADD . /server/www/
WORKDIR /server/www/
RUN npm install
EXPOSE 3001
CMD ["node","bin/www"]