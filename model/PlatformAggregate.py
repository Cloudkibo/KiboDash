import pymysql
from random import randint
import database
import json

database_name = 'PlatformAggregates'

def drop_table(cursor):
    drop_table = ("DROP TABLE {}".format(database_name))
    try:
        cursor.execute(drop_table)
        print('Dropping table {}: '.format(database_name), end='')
    except Exception as err:
        print(err)
    else:
        print("OK")

def create_table(cursor):
    create_table = (
        "CREATE TABLE `{}` ("
        "  `id` int(11) NOT NULL AUTO_INCREMENT,"
        "  `totalConnectedPages` int(11),"
        "  `totalPages` int(11),"
        "  `totalSubscribers` int(11),"
        "  `totalBroadcasts` int(11),"
        "  `totalPolls` int(11),"
        "  `totalSurveys` int(11),"
        "  PRIMARY KEY (`id`)"
        ") ENGINE=InnoDB".format(database_name))
    try:
        print("Creating table {}: ".format(database_name), end='')
        cursor.execute(create_table)
    except Exception as err:
        print(err)
    else:
        print("OK")

def add_random_records(cursor, num_of_records=1):
    add_platform_aggregate = ("INSERT INTO {} "
            "(totalConnectedPages, totalPages, totalSubscribers, totalBroadcasts, totalPolls, totalSurveys) "
            "VALUES (%s, %s, %s, %s, %s, %s)".format(database_name))
    for i in range(num_of_records):
        min = 10
        max = 1000
        data_platform_aggregate = (randint(min, max), randint(min, max), randint(min, max), randint(min, max), randint(min, max), randint(min, max))
        cursor.execute(add_platform_aggregate, data_platform_aggregate)

def seed_platform_aggregate_local():
    cnx = database.get_local_connector()
    cursor = cnx.cursor()
    drop_table(cursor)
    create_table(cursor)
    add_random_records(cursor)
    cnx.commit()
    cursor.close()
    cnx.close()

def seed_platform_aggregate_remote_helper(cursor):
    drop_table(cursor)
    create_table(cursor)
    add_random_records(cursor)

def seed_platform_aggregate_remote():
    database.run_remote_query(seed_platform_aggregate_remote_helper)

def get_data_local():
    cnx = database.get_local_connector()
    cursor = cnx.cursor()
    select_all = ("SELECT * FROM {}".format(database_name))
    cursor.execute(select_all)
    rows = cursor.fetchall()
    return {
        'columns': ['id', 'totalConnectedPages', 'totalPages', 'totalSubscribers', 'totalBroadcasts', 'totalPolls', 'totalSurveys'],
        'rows': rows
    }

def select_all_query(cursor):
    select_all = ("SELECT * FROM {}".format(database_name))
    cursor.execute(select_all)
    rows = cursor.fetchall()
    return rows

def get_data_remote():
    print('get remote platform data')
    rows = database.run_remote_query(select_all_query)
    return {
        'columns': ['id', 'totalConnectedPages', 'totalPages', 'totalSubscribers', 'totalBroadcasts', 'totalPolls', 'totalSurveys'],
        'rows': rows
    }


if __name__ == '__main__':
    # seed_platform_aggregate_local()
    # get_data()
    seed_platform_aggregate_remote()