import logging
import json
import azure.cosmos as cosmos
from azure.cosmos import exceptions
import azure.functions as func
import random

import config
db_URI = config.settings['db_URI']
db_id = config.settings['db_id']
db_key = config.settings['db_key']
event_cont = config.settings['event_container']
player_cont = config.settings['player_container']
lobby_cont = config.settings['lobby_container']


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    client = cosmos.cosmos_client.CosmosClient(db_URI,db_key)
    db_client = client.get_database_client(db_id)
    lobby_container = db_client.get_container_client(lobby_cont)
    req_body = req.get_json()
    if req_body['lobby_id'] == None:
         return func.HttpResponse(body=json.dumps({"result": False, "msg": "No lobby ID"}))
    try:
        lobby = lobby_container.read_item(req_body['lobby_id'],partition_key=req_body['lobby_id'])
    except exceptions.CosmosHttpResponseError:
        return func.HttpResponse(body=json.dumps({"result": False, "msg": "Invalid lobby ID"}))
    if lobby['current_event'] != None:
        lobby['event_history'].append(lobby['current_event'])
    if len(lobby['events']) == 0:
        return func.HttpResponse(body=json.dumps({"result": False, "msg": "Final event reached"}))
    lobby['current_event'] = lobby['events'].pop(0)
    player = random.choice(lobby['remaining_players'])
    lobby['current_event']['player'] = player
    lobby['remaining_players'].remove(player)
    lobby_container.replace_item(lobby['id'], body=lobby)
    return func.HttpResponse(body=json.dumps({"result": True, "lobby": lobby}))
    #store current event as history
    #try to pop next event from list
    #upadte lobby in db
    #return updated lobby data