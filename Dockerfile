FROM node
ADD ./app /server/www
WORKDIR /server/www
RUN npm install
EXPOSE 3001
CMD ["node","/server/www/bin/www"]