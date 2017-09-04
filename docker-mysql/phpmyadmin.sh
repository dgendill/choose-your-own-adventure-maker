docker run --name dgendillmysql-admin \
           --env-file sqlcredentials.list \
           -p 8081:80 \
           -d phpmyadmin/phpmyadmin
