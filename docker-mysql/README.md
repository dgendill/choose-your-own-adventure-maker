#### alpine-mysql

### Instructions

Build the image with `./build.sh`.  Afterwords `docker exec -ti container /bin/sh` and go to the `/database` folder. Manually run `setupd-db.sh` in the database folder.  Then run `secure-db.sh` in the database folder. After running secure-db.sh, press enter when prompted for the password. Securely store the username, database name, and password you entered.

### Version Info

mysql  Ver 15.1 Distrib 10.1.22-MariaDB, for Linux (x86_64) using readline 5.1

-----

A few things to mention...

### /run/mysqld folder must exist

I'm not sure where this option originates, but it appears that the mysql socket is always created at `/run/mysqld/mysqld.sock`. Even if I set the socket in my.cnf, the `mysql` command looks for the socket in `/run/mysqld`. So it's import that `/run/mysqld` is created on startup.

if [ ! -d "/run/mysqld" ]; then
    mkdir -p /run/mysqld
fi

