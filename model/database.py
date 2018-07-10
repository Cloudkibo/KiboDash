import json
import mysql.connector
import sshtunnel

def get_local_connector():
    with open('../.env/config.json') as config:
        config = json.load(config)['mysql']['local']
    cnx = mysql.connector.connect(user=config['user'], password=config['password'],
                                  host=config['host'],
                                  database=config['database'])
    return cnx

#IN PROGRESS
def get_remote_connector():
    with open('../.env/config.json') as config:
        config = json.load(config)['mysql']['remote']
        print(config)

    with sshtunnel.SSHTunnelForwarder(
        (config['ssh_host']), ssh_username=config['ssh_user'],
        ssh_password=config['ssh_password'],
        remote_bind_address=('127.0.0.1', 3306)) as tunnel:
        
        print('in tunnel')
        print(tunnel)
        cnx = mysql.connector.connect(user=config['user'], password=config['password'],
                                    host=tunnel.local_bind_host, port=tunnel.local_bind_port,
                                    database=config['database'])
        print('DONE')
        
        return cnx

if __name__ == '__main__':
    #get_local_connector()
    get_remote_connector()