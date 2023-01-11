import logging
import json

import azure.functions as func
import azure.cosmos as cosmos
import azure.cosmos.exceptions as exceptions
# from azure_functions import config
import os

#local testing
# db_URI = config.settings['db_URI']
# db_id = config.settings['db_id']
# db_key = config.settings['db_key']
# player_cont =config.settings['player_container']
# login_cont = config.settings['login_container']

# online testing
db_URI = os.environ['db_URI']
db_id = os.environ['db_id']
db_key = os.environ['db_key']
player_cont =os.environ['player_container']
login_cont = os.environ['login_container']

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    client = cosmos.cosmos_client.CosmosClient(db_URI, db_key)
    db_client = client.get_database_client(db_id)
    login_container = db_client.get_container_client(login_cont)

    player = req.get_json()
    player['id'] = player["email"]

    user = []
    logging.info("Empty user list")

    # for item in login_container.query_items(query='SELECT * FROM login p WHERE p.id=\'{}\''.format(player['id']), enable_cross_partition_query=True):
    #     user.append(json.dumps(item))
    #     logging.info("user dumped and appended")
    
    try:
        login_container.create_item(player)
        logging.info("user logged in")
        return func.HttpResponse(body=json.dumps({"result": True , "msg" : "OK"}))
    except exceptions.CosmosHttpResponseError: 
        logging.info("user already logged in")
        return func.HttpResponse(body=json.dumps({"result": False , "msg" : "user-logged-in"}))