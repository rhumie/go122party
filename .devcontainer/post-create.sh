#!/usr/bin/env bash
sudo apt-get update;
sudo chown vscode:vscode slidev/node_modules;

# Aliases
echo "alias \"ll=ls -l\"" >> ~/.bash_aliases

# Dependencies
npm install -g npm@latest;
npm install --prefix ./slidev;