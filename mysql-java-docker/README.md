# Startup Commands:

1) Download Docker Desktop
2) Download MySql Workbench to connect a GUI to the SQL database
3) Install it, watch a tutorial on docker from youtube
  - if you haven already, create the bridge network:
    ```bash
    docker network create mange-network
    ```
4) * For MySql container run this command:
docker run --name mysql-mange \
  --network mange-network \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=mange-java \
  -e MYSQL_USER=devs \
  -e MYSQL_PASSWORD=devspassword \
  -p 3306:3306 \
  -d mysql:latest

  * View Logs:  docker logs mysql-mange

  * Container command line: 
    docker exec -it mysql-mange

  * Connect to the container: 
    mysql -h 127.0.0.1 -P 3306 -u root -p
    mysql> USE mange-java;

  * Change priviliges for devs:
  * mysql> GRANT ALL PRIVILEGES ON `mange-java`.* TO 'devs'@'%' WITH GRANT OPTION;
           SET PASSWORD FOR 'devs'@'%' = 'devspassword';
           FLUSH PRIVILEGES;



