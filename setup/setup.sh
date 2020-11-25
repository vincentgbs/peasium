#!/bin/bash
#
if [ "$EUID" -ne 0 ]
  then echo 'Please run as root'
  exit
fi
# cd /vagrant/setup/
# sudo chmod 700 setup.sh
# sudo ./setup.sh

apt update # update apt installer
apt install -y apache2 # install apache2
apt install -y php7.4 libapache2-mod-php php7.4-curl php7.4-sqlite3 # install php
apachectl restart

chmod -R 777 /var/www/private/sqlite3/
