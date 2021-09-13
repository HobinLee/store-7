REPOSITORY=/home/ubuntu/store-7/server
cd $REPOSITORY

pm2 start dist/main.js
pm2 save