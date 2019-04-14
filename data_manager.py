import connection
from datetime import datetime

##GET##

@connection.connection_handler
def register_user(cursor, datas):
    registration_time = datetime.now()
    cursor.execute('''
    INSERT INTO user_list(registration_time, user_name, password, rank) VALUES  (%s, %s, %s, %s)
    ''', (registration_time, datas['user_name'], datas['password'], datas['rank']))


@connection.connection_handler
def get_user(cursor, user_name):
    cursor.execute('''
    SELECT id, password, rank FROM user_list WHERE user_name=%s
    ''', [user_name])
    users = cursor.fetchone()
    return users


@connection.connection_handler
def get_users(cursor):
    cursor.execute('''
    SELECT id, user_name, registration_time, rank FROM user_list
    ''')
    users = cursor.fetchall()
    return users
