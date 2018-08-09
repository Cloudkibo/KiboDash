# Don't you dare to change this.
# Following pattern (1 0 * * */1) will run the script at 00:00 (12:01 AM) every day of the week

echo "$(echo '1 0 * * */1 '$NODE_PATH $CRON_SCRIPT_PATH ; crontab -l)" | crontab -