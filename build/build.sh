#!/bin/bash

sudo docker build --tag kluvme/webapp:front ../frontend/.
sudo docker build --tag kluvme/webapp:back ../backend/.

sudo docker-compose down
sudo docker-compose up -d
