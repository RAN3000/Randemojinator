FROM nginx

RUN mkdir /etc/nginx/logs && touch /etc/nginx/logs/static.log

ADD ./nginx.conf /etc/nginx/conf.d/default.conf
ADD ./.htpasswd /etc/nginx/.htpasswd
ADD /dist /www
