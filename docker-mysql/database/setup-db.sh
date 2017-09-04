#!/bin/sh

printf "Enter Username: "
read USER
printf "\n"

printf "Enter Database Name:"
read DB
printf "\n"

stty -echo
printf "Enter User Password: "
read PASS
stty echo
printf "\n"

echo "USE mysql;
CREATE DATABASE IF NOT EXISTS \`$DB\` CHARACTER SET utf8 COLLATE utf8_general_ci;
GRANT ALL ON \`$DB\`.* to '$USER'@'%' IDENTIFIED BY '$PASS';
GRANT ALL PRIVILEGES ON \`$DB\`.* to '$USER'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
" > newdb.sql