import logging
import json 
import azure.functions as func
import azure.cosmos as cosmos 
import os
from azure.cosmos import CosmosClient
from azure_functions import config
import azure.cosmos.exceptions as exceptions
import re

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
    invalid_email_msg = {"result": False, "msg": "Invalid email provided"}
    invalid_pwd_msg = {"result": False, "msg": "The password is less than 8 characters or more than 30 characters"} 
    signup_ok_msg = {"result" : True, "msg": "OK" }
    email_alreadyExists_msg = {"result": False, "msg": "An user account already exists for the email provided, please try logging in!" } 
   
    #regex for validating email adress field
    emailFormat = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'  


    if "email" in playerToAdd:
        playerToAdd["id"] = playerToAdd["email"]
        del playerToAdd["email"]
        email = playerToAdd["id"] #holds email

        if "password" in playerToAdd:
            password = playerToAdd["password"]
            
            # adding empty fields preparing for the db model
            playerToAdd["username"] = "" # will be populated by their in-game username later
            playerToAdd["imageurl"] = "" # could be pupulated later with user's profile picture
            playerToAdd["friends"] = []
            playerToAdd["events"] = 0
            playerToAdd["wins"] = 0
            playerToAdd["losses"] = 0

            if not (re.fullmatch(emailFormat, email)):
                return func.HttpResponse(json.dumps(invalid_email_msg))
            
            elif len(password) < 8 or len(password) > 30:
                return func.HttpResponse(json.dumps(invalid_pwd_msg))
            try:
                usersContainer.create_item(playerToAdd)
                return func.HttpResponse(json.dumps(signup_ok_msg))
            except exceptions.CosmosHttpResponseError: 
                logging.info("Duplicate user exists!")
                return func.HttpResponse(json.dumps(email_alreadyExists_msg))
            
        else:
            return func.HttpResponse(body = json.dumps({"result": False , "msg": "No password provided"}))
    
    else:
        return func.HttpResponse(body = json.dumps({"result": False , "msg": "No email provided"}))