import logging
import json


import azure.functions as func
import azure.cosmos as cosmos
import azure.cosmos.exceptions as exceptions
# from azure_functions import config
import os

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

#local testing
# db_URI = config.settings['db_URI']
# db_id = config.settings['db_id']
# db_key = config.settings['db_key']
# player_cont =config.settings['player_container']
# lobby_cont = config.settings['lobby_container']

# online testing
db_URI = os.environ['db_URI']
db_id = os.environ['db_id']
db_key = os.environ['db_key']
player_cont =os.environ['player_container']
lobby_cont = os.environ['lobby_container']

##USER STRUCTURE

    # user = {    
    #             "id":"",
    #             "player" : {
    #                 "nickname" : "",
    #                 "password" : "",
    #                 "friends" : [],
    #                 "history" : []
    #             },
    #             "lobby" : {
    #                 "players" : [],
    #                 "invited" : [],
    #                 "code" : "",
    #                 "events" : [],
    #                 "current_event" : "event"
    #             },
    #             "event" : {
    #                 "extra_targets" : [],
    #                 "executions" : [],
    #                 "blind_info" : "",
    #                 "details" : ""
    #             }
    #         }


print(db_URI)


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    #return func.HttpResponse(body=json.dumps({"result": True , "msg" : "OK"}))

    client = cosmos.cosmos_client.CosmosClient(db_URI, db_key)
    db_client = client.get_database_client(db_id)
    player_container = db_client.get_container_client(player_cont)

    player = req.get_json()

    if "email" in player:

        player['id'] = player["email"].lower()

        if "password" in player:
            user = []
            logging.info("empty user list")

            for item in player_container.query_items(query='SELECT * FROM player p WHERE p.id=\'{}\''.format(player['id']), enable_cross_partition_query=True):
                user.append(json.dumps(item))
                logging.info("user dumped and appended")

            logging.info("entering if")
            if len(user) > 0:
                logging.info("user exists")
                onlyUser = json.loads(user[0])
                logging.info(onlyUser)
                if onlyUser["player"]["password"] == player['password']:
                    logging.info("password matches")
                    return func.HttpResponse(body=json.dumps({"result": True , "msg" : "OK", "avatarInt": onlyUser["player"]["avatar"]}))
                else:
                    logging.info("password is incorrect")
                    return func.HttpResponse(body=json.dumps({"result": False , "msg": "email or password incorrect"}))
            else:
                logging.info("email not there")
                return func.HttpResponse(body=json.dumps({"result": False , "msg": "email or password incorrect"}))
        else:
            return func.HttpResponse(body = json.dumps({"result": False , "msg": "No password provided"}))
    
    else:
        return func.HttpResponse(body = json.dumps({"result": False , "msg": "No email provided"}))