#!/bin/bash

# Set initial environment variables used in the MySQL setup process
MYSQL_HOST="127.0.0.1"
MYSQL_PORT="3306"
MYSQL_USER="root"
MYSQL_PASSWORD="rootpassword"
MYSQL_DATABASE="mange-java"
DEVS_PASSWORD="devspassword"

# Wait for MySQL to fully start up (adjust sleep time as necessary)
echo "Waiting for MySQL to initialize..."
sleep 30

# Execute SQL commands
echo "Granting privileges, setting new password, and flushing privileges..."
docker exec mysql-mange mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" -D "$MYSQL_DATABASE" <<-EOSQL
    GRANT ALL PRIVILEGES ON $MYSQL_DATABASE.* TO 'devs'@'%' WITH GRANT OPTION;
    SET PASSWORD FOR 'devs'@'%' = '$DEVS_PASSWORD';
    FLUSH PRIVILEGES;
EOSQL

