FROM node:4-onbuild
#RUN mkdir -p /server/www
ADD . /server/www/
WORKDIR /server/www/
RUN npm install
EXPOSE 3001
CMD ["node","bin/www"]