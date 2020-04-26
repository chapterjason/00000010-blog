#!/usr/bin/env bash

# @description Get the container status.
# @arg $1 string The docker container service id
getContainerStatus() {
  docker inspect --format "{{.State.Health.Status}}" "$1"
}

# @description Get the service id from a docker-compose service name.
getContainerId() {
  docker-compose ps -q "$1"
}

# @description Waits till the docker service is healthy.
# @arg $1 string the docker-compose service name
waitForHealthy() {
  ID="$(getContainerId "$1")"
  printf "Wait for container %s" "$1"
  while
    STATUS=$(getContainerStatus "$ID")
    [ "$STATUS" != "healthy" ]
  do
    if [ "$STATUS" == "unhealthy" ]; then
      echo "Failed!"
      exit 1
    fi
    printf .
    lf=$'\n'
    sleep 1
  done
  printf "%s" "$lf"
}

# @description Runs a command in the given container.
# @arg $1 string the docker-compose service name
# @arg $@ string the command
execute() {
  ID="$(getContainerId "$1")"
  shift
  docker exec "$ID" "$@"
}

# Install dependencies
yarn install
# Start container
docker-compose up -d
# Wait till the database is online
waitForHealthy "database"
# Run migration
execute backend yarn run typeorm migration:run
