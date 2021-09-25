REPOSITORY=/home/ubuntu/store-7/server
cd $REPOSITORY

pm2 start npm -- start prod
pm2 save