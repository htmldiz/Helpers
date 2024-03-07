## Import file into database
mysql -u <username> -p <databasename> < <filename.sql>

## remove_all_transients.sql file removing all transients in the database

## .htaccess file for bedrock application if website root folder can not be changed
```sh
# BEGIN WordPress Bedrock
# The directives (lines) between "BEGIN WordPress Bedrock" and "END WordPress Bedrock" are
# dynamically generated, and should only be modified via WordPress filters.
# Any changes to the directives between these markers will be overwritten.
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule \/composer.json$ - [R=404]
RewriteRule \/composer.local$ - [R=404]
RewriteRule \/phpcs.xml$ - [R=404]
RewriteRule ^wp/(.*) /web/wp/$1 [L]
RewriteRule ^app/(.*) /web/app/$1 [L]
RewriteRule . /index.php [L]
</IfModule>
<FilesMatch "\.(htaccess|htpasswd|ini|log|sh|inc|bak|env|example|md|yml|gitignore)$">
Order Allow,Deny
Deny from all
</FilesMatch>
<files "/config">
  order allow,deny
  deny from all
</files>
<files "/vendor">
  order allow,deny
  deny from all
</files>
<files "/.git">
  order allow,deny
  deny from all
</files>
# END WordPress Bedrock
```

## define website URL
```php

define( 'WP_HOME', 'https://example.com' );
define( 'WP_SITEURL', 'https://example.com' );

```

