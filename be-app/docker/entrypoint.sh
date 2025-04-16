#!/bin/sh

# Run migrations and seeders
php artisan migrate --force
php artisan db:seed --force

# Start PHP-FPM
exec php-fpm