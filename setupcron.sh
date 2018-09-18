# Don't you dare to change this.
# Following pattern (1 0 * * */1) will run the script at 00:00 (12:01 AM) every day of the week

echo "$(echo '* * * * *' DEBUG=$DEBUG URL=$URL NODE_ENV=$NODE_ENV DOMAIN=$DOMAIN $NODE_PATH --trace-warnings $CRON_SCRIPT_PATH >> /root/logfile.txt 2>&1 ; crontab -l)" | crontab -