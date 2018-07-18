import json
import sshtunnel
import pymysql
import os.path

config_file = ''
if os.path.isfile('./.envpy/config.json'):
    config_file = './.envpy/config.json'
else:
    config_file = '../.envpy/config.json'


def get_local_connector():
    with open(config_file) as config:
        config = json.load(config)['mysql']['local']
    connection = pymysql.connect(host=config['host'],
                            user=config['user'],
                            password=config['password'],
                            db=config['database'],
                            charset='utf8mb4',
                            cursorclass=pymysql.cursors.DictCursor)
    return connection


def run_remote_query(query):
    with open(config_file) as config:
        config = json.load(config)['mysql']['remote']

    with sshtunnel.SSHTunnelForwarder(
        (config['ssh_host']), 
        ssh_username=config['ssh_user'],
        ssh_password=config['ssh_password'],
        remote_bind_address=(config['remote_bind_host'], config['remote_bind_port'])
    ) as tunnel:
        print('in ssh tunnel')
        connection = pymysql.connect(
            host=config['host'],
            user=config['user'],
            password=config['password'],
            db=config['database'],
            charset='utf8mb4',
            port=tunnel.local_bind_port,
            cursorclass=pymysql.cursors.DictCursor
        )
        cursor = connection.cursor()
        result = query(cursor)
        connection.commit()
        cursor.close()
        connection.close()
        return result
        


if __name__ == '__main__':
    get_local_connector()
    #get_remote_connector()
