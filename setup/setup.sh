#!/bin/bash
#
if [ "$EUID" -ne 0 ]
  then echo 'Please run as root'
  exit
fi
# cd /vagrant/setup/
# sudo chmod 700 setup.sh
# sudo ./setup.sh

apt update
apt install -y apache2
apt install -y php libapache2-mod-php php-curl
apachectl restart
