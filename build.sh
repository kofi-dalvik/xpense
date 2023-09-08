#!/bin/bash

# git pull origin main
git checkout main
git pull origin main

# install composer dependencies
composer install
composer dump-autoload

# Run laravel commands
php artisan config:cache
php artisan migrate

# install npm dependencies
npm install

# build frontend
npm run build