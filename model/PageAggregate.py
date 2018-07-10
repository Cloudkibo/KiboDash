import mysql.connector
from random import randint
import database
import json

database_name = 'PageAggregates'

def drop_table(cursor):
    drop_table = ("DROP TABLE {}".format(database_name))
    try:
        cursor.execute(drop_table)
        print('Dropping table {}: '.format(database_name), end='')
    except mysql.connector.Error as err:
        print(err.msg)
    else:
        print("OK")

def create_table(cursor):
    create_table = (
        "CREATE TABLE `{}` ("
        "  `id` int(11) NOT NULL AUTO_INCREMENT,"
        "  `pageName` varchar(16),"
        "  `totalSubscribers` int(11),"
        "  `totalBroadcasts` int(11),"
        "  `totalPolls` int(11),"
        "  `totalSurveys` int(11),"
        "  PRIMARY KEY (`id`)"
        ") ENGINE=InnoDB".format(database_name))
    try:
        print("Creating table {}: ".format(database_name), end='')
        cursor.execute(create_table)
    except mysql.connector.Error as err:
        if err.errno == mysql.connector.errorcode.ER_TABLE_EXISTS_ERROR:
            print("already exists.")
        else:
            print(err.msg)
    else:
        print("OK")

def add_random_records(cursor, num_of_records=10):
    add_page_aggregate = ("INSERT INTO {} "
            "(pageName, totalSubscribers, totalBroadcasts, totalPolls, totalSurveys) "
            "VALUES (%s, %s, %s, %s, %s)".format(database_name))
    for i in range(num_of_records):
        min = 10
        max = 1000
        data_page_aggregate = ('Test', randint(min, max), randint(min, max), randint(min, max), randint(min, max))
        cursor.execute(add_page_aggregate, data_page_aggregate)
        page_id = cursor.lastrowid
        update_page = ("UPDATE {} "
                "SET pageName=%s"
                "WHERE id=%s".format(database_name))
        page_name = 'Test' + str(page_id)
        print(page_name + ' added')
        cursor.execute(update_page, (page_name, page_id))

def seed_page_aggregate():
    cnx = database.get_local_connector()
    cursor = cnx.cursor()
    drop_table(cursor)
    create_table(cursor)
    add_random_records(cursor)
    cnx.commit()
    cursor.close()
    cnx.close()

def get_data():
    cnx = database.get_local_connector()
    cursor = cnx.cursor()
    select_all = ("SELECT * FROM {}".format(database_name))
    cursor.execute(select_all)
    page_aggregate_data = []
    for (id, pageName, totalSubscribers, totalBroadcasts, totalPolls, totalSurveys) in cursor:
        page_data = {
            'id': id,
            'pageName': pageName,
            'totalSubscribers': totalSubscribers,
            'totalBroadcasts': totalBroadcasts,
            'totalPolls': totalPolls,
            'totalSurveys': totalSurveys
        }
        page_aggregate_data.append(page_data)
    
    print(page_aggregate_data)
    return page_aggregate_data


if __name__ == '__main__':
    seed_page_aggregate()
    get_data()