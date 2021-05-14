#!/bin/bash

sudo docker build --tag kluvme/webapp:front ../front/.
sudo docker build --tag kluvme/webapp:back ../backend/.

sudo docker-compose down
sudo docker-compose up -d
