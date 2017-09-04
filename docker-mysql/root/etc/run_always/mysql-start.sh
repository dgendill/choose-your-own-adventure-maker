#!/bin/sh

#env | sed -r "s/'/\\\'/gm" | sed -r "s/^([^=]+=)(.*)\$/\1'\2'/gm" \ > /etc/safe-environment
#source /etc/safe-environment
# source /etc/envvars
# cat /etc/envvars

if [ -d "/database/mysql" ]; then
  echo "[i] MySQL directory /database/mysql already present, skipping creation"
else
  if [ ! -d "/run/mysqld" ]; then
	  mkdir -p /run/mysqld
  fi
  mysql_install_db --user=root
fi

/usr/bin/mysqld_safe