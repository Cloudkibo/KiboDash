import json
import sshtunnel
import pymysql

def get_local_connector():
    with open('../.env/config.json') as config:
        config = json.load(config)['mysql']['local']
    connection = pymysql.connect(host=config['host'],
                            user=config['user'],
                            password=config['password'],
                            db=config['database'],
                            charset='utf8mb4',
                            cursorclass=pymysql.cursors.DictCursor)
    return connection

def get_remote_connector():
    with open('../.env/config.json') as config:
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
        print(connection)
        cursor = connection.cursor()
        sql = "SELECT * FROM `PageAggregates`"
        cursor.execute(sql)
        result = cursor.fetchall()
        print(result)

    return connection

if __name__ == '__main__':
    #get_local_connector()
    get_remote_connector()