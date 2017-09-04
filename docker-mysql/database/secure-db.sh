#!/bin/sh
mysql -uroot -p < newdb.sql
rm newdb.sql
mysql_secure_installation