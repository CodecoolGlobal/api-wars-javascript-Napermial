import connection
from datetime import datetime

##GET##

@connection.connection_handler
def register_user(cursor, datas):
    cursor.execute('''
    INSERT INTO user_list(user_name, password) VALUES  (%s, %s)
    ''', (datas['user_name'], datas['password']))


@connection.connection_handler
def get_user(cursor, user_name):
    cursor.execute('''
    SELECT id, password FROM user_list WHERE user_name=%s
    ''', [user_name])
    users = cursor.fetchone()
    return users


@connection.connection_handler
def get_users(cursor):
    cursor.execute('''
    SELECT id, user_name FROM user_list
    ''')
    users = cursor.fetchall()
    return users


