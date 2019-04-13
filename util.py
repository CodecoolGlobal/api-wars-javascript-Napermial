import bcrypt, requests


def hash_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(plain_text_password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)


# def visit_dict(d, path=[]):
#     for k, v in d.items():
#         if not isinstance(v, dict):
#             yield path + [k], v
#         else:
#             yield from visit_dict(v, path + [k])
#
link = 'https://swapi.co/api/planets/?page=1'


def data_downloader(link):
    response = requests.get(link).json()
    response_results = response['results']
    print(response_results)
    new_list = list()
    for elem in response_results:
        k = elem.keys()
        v = elem.values()
        for part in elem.keys():
            if part == 'name':
                new_list.append(part, elem)
            if k == 'diameter':
                new_list.append((k, v))
            if k == 'climate':
                new_list.append((k, v))
            if k == 'terrain':
                new_list.append((k, v))
            if k == 'surface_water':
                new_list.append((k, v))
            if k == 'surface_water':
                new_list.append((k, v))


    print(new_list)


