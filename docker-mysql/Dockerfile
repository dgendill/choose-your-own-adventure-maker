FROM nimmis/alpine-micro:3.5

RUN apk update && apk upgrade
RUN apk add mysql mysql-client
RUN rm -rf /var/cache/apk/*

COPY root/. /
RUN chmod +x /etc/run_always/mysql-start.sh

WORKDIR /database

EXPOSE 3306