## About Peasium

[Peasium](https://vincentgbs.github.io/peasium/src/html/index.html) is an easy-to-use web framework. We believe development should be a fun, flexible, and creative experience. Peasium uses a simple bare-bones approach, so that developers can focus on building new things instead of spending hours just learning the framework itself. Peasium was designed so that beginner developers could explore the codebase and understand how web applications function in general.

## Development Environment

Peasium is easiest when used with Vagrant and VirtualBox. VirtualBox allows users to run guest operating systems on a host computer. Vagrant is a helper program for VirtualBox that makes the "it works on my machine" excuse a relic of the past. Vagrant simplifies sharing directories across the guest and host machines.

* Install VirtualBox (https://www.virtualbox.org/)
* Install Vagrant (https://www.vagrantup.com/)
* In terminal, navigate (cd) to the directory and type `vagrant up` to start the virtual machine (VM)
* After the VM has started, type `vagrant ssh` to tunnel into (log into) the VM
* From inside the VM, cd to the git repository directory and run the `./setup.sh` script

## Dependencies

Peasium uses as few dependencies as possible, allowing developers the freedom to augment their projects where needed. Peasium is developed using Ubuntu, Apache, and Php.

## Terminal
On Mac the command line instructions to get the application running:
```
git clone https://github.com/vincentgbs/peasium.git
vagrant up
vagrant ssh
cd /vagrant/setup
chmod 700 ./setup.sh
sudo ./setup.sh
```
