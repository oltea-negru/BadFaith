import logging
import json


import azure.functions as func
import azure.cosmos as cosmos
import azure.cosmos.exceptions as exceptions
from azure_functions import config

# import importlib
# config = importlib.import_module("azure_functions.config")

# settings = {
#     'local_URI': 'http://localhost:7071/api/' ,
#     'cloud_URI' : 'https://badfaith.documents.azure.com:443/' ,
#     'db_URI' : 'https://badfaith.documents.azure.com:443/',
#     'db_key' : 'VpY5MH0wK8qAdVupj8eD12gkq7vVFhGIWgOmSWR7kfFbQsxYJBBjDFRZQcHnoiZSLiLPLcXM2iU9ACDbu2HF2Q==',
#     #'_master' : 'FPWpXRW0797c1V6vPd3faMAbpusPp_SRLsRBB0cyTi5WAzFuVU8ApA==',
#     'db_id' : 'badfaith' ,
#     'player_container' : 'player',
#     'lobby_container': 'lobby',
#     'event_container' : 'event'
# }

db_URI = config.settings['db_URI']
db_id = config.settings['db_id']
db_key = config.settings['db_key']
player_cont =config.settings['player_container']
lobby_cont = config.settings['lobby_container']

print(db_URI)


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    #return func.HttpResponse(body=json.dumps({"result": True , "msg" : "OK"}))

    client = cosmos.cosmos_client.CosmosClient(db_URI, db_key)
    db_client = client.get_database_client(db_id)
    player_container = db_client.get_container_client(player_cont)

    player = req.get_json()
    player['id'] = player["username"]

    user = []
    logging.info("empty user list")

    for item in player_container.query_items(query='SELECT * FROM player p WHERE p.id=\'{}\''.format(player['id']), enable_cross_partition_query=True):
        user.append(json.dumps(item))
        logging.info("user dumped and appended")

    logging.info("entering if")
    if len(user) > 0:
        logging.info("user exists")
        onlyUser = json.loads(user[0])
        if onlyUser['password'] == player['password']:
            logging.info("password matches")
            return func.HttpResponse(body=json.dumps({"result": True , "msg" : "OK"}))
        else:
            logging.info("password is incorrect")
            return func.HttpResponse(body=json.dumps({"result": False , "msg": "Username or password incorrect"}))
    else:
        logging.info("username not there")
        return func.HttpResponse(body=json.dumps({"result": False , "msg": "Username or password incorrect"}))