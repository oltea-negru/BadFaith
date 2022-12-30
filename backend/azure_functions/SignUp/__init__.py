import logging
import json 
import azure.functions as func
import azure.cosmos as cosmos 
import os
from azure.cosmos import CosmosClient
from azure_functions import config
import azure.cosmos.exceptions as exceptions


# For testing locally
db_URI = config.settings['db_URI']
db_key = config.settings['db_key']
db_id = config.settings['db_id']
player_container = config.settings['player_container']
client = cosmos.cosmos_client.CosmosClient(db_URI, credential=db_key)
database = client.get_database_client(db_id)
usersContainer = database.get_container_client(player_container)

#When deploying:
# Db_URI = os.environ['Db_URI']
# db_key = os.environ['db_key']
# db_id = os.environ['db_id']
# users_container = os.environ['users_container']
# client = CosmosClient(Db_URI, db_key)
# database = client.get_database_client(db_id)
# usersContainer = database.get_container_client(users_container)

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    # Getting the user's credentials from the http request
    playerToAdd = req.get_json()

    # Checking is the username and password match the criteria to be added to the database of valid users
    invalid_uname_msg = {"result": False, "msg": "The username is less than 4 characters or more than 10 characters"}
    invalid_pwd_msg = {"result": False, "msg": "The password is less than 8 characters or more than 30 characters"} 
    uname_ok_msg = {"result" : True, "msg": "OK" }
    uname_alreadyExists_msg = {"result": False, "msg": "The username already exists!" } 
   
    if "username" in playerToAdd:
        playerToAdd["id"] = playerToAdd["username"]
        del playerToAdd["username"]
        username = playerToAdd["id"]

        if "password" in playerToAdd:
            password = playerToAdd["password"]
            
            if len(username) < 4 or len(username) > 10:
                return func.HttpResponse(json.dumps(invalid_uname_msg))
            
            elif len(password) < 8 or len(password) > 30:
                return func.HttpResponse(json.dumps(invalid_pwd_msg))
            try:
                usersContainer.create_item(playerToAdd)
                return func.HttpResponse(json.dumps(uname_ok_msg))
            except exceptions.CosmosHttpResponseError: 
                logging.info("Duplicate user exists!")
                return func.HttpResponse(json.dumps(uname_alreadyExists_msg))
            
        else:
            return func.HttpResponse(body = json.dumps({"result": False , "msg": "No password provided"}))
    
    else:
        return func.HttpResponse(body = json.dumps({"result": False , "msg": "No username provided"}))