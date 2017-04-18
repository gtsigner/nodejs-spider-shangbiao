FROM node:4-onbuild
ADD . /server/www/
WORKDIR /server/www/
RUN npm install
EXPOSE 8888
CMD ["node","/server/www/bin/www"]