#!/bin/bash

docker build --tag kluvme/webapp:front ../front/.
docker build --tag kluvme/webapp:back ../backend/.

docker-compose up -d
