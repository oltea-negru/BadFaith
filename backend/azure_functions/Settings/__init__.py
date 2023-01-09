import logging
import json
import azure.functions as func
import azure.cosmos as cosmos
import azure.cosmos.exceptions as exceptions
import os
# from azure_functions import config as config

# #local testing
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

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    client = cosmos.cosmos_client.CosmosClient(db_URI, db_key)
    db_client = client.get_database_client(db_id)
    player_container = db_client.get_container_client(player_cont)

    # Getting the email, nickname and password from the request 
    playerToEdit = req.get_json()

    if "email" in playerToEdit:
        playerToEdit['id'] = playerToEdit["email"]

        if "password" in playerToEdit and "nickname" in playerToEdit:
            user = []
            logging.info("empty user list")

            for item in player_container.query_items(query='SELECT * FROM player p WHERE p.id=\'{}\''.format(playerToEdit['id']), enable_cross_partition_query=True):
                user.append(json.dumps(item))
                logging.info("user dumped and appended")

            if len(user) > 0:
                logging.info("user exists")
                onlyUser = json.loads(user[0])
                logging.info(onlyUser)

                if len(playerToEdit["password"]) < 8 or len(playerToEdit["password"]) > 16:
                    onlyUser['player']['nickname'] = playerToEdit['nickname']
                    onlyUser['player']['password'] = playerToEdit['password']
                    onlyUser['player']['avatar'] = playerToEdit['avatar']
                    logging.info('Nickname for the user: ' + playerToEdit['id'] + ' has been changed to: ' + playerToEdit['nickname'])
                    logging.info('Password for the user: ' + playerToEdit['id'] + ' has been changed to: ' + playerToEdit['password'])
                    logging.info('Avatar for the user: ' + playerToEdit['id'] + ' has been changed to: ' + playerToEdit['avatar'])
                    player_container.upsert_item(onlyUser)
                    
                    return func.HttpResponse(body=json.dumps({"result": True , "msg" : "Nickname and password succesfully changed"}))
                else:
                    logging.info("Invalid password")
                    return func.HttpResponse(body=json.dumps({"result": False , "msg": "Password less than 8 characters or greater than 16 characters"}))
           
            else:
                logging.info("Invalid email")
                return func.HttpResponse(body=json.dumps({"result": False , "msg": "Email incorrect"}))
        
        elif "nickname" in playerToEdit:
            
            user = []
            for item in player_container.query_items(query='SELECT * FROM player p WHERE p.id=\'{}\''.format(playerToEdit['id']), enable_cross_partition_query=True):
                user.append(json.dumps(item))
                logging.info("user dumped and appended")
            
            if len(user) > 0:
                logging.info("user exists")
                onlyUser = json.loads(user[0])
                logging.info(onlyUser)

                if len(playerToEdit["password"]) < 8 or len(playerToEdit["password"]) > 16:
                    onlyUser['player']['nickname'] = playerToEdit['nickname']
                    onlyUser['player']['avatar'] = playerToEdit['avatar']
                    logging.info('Nickname for the user: ' + playerToEdit['id'] + ' has been changed to: ' + playerToEdit['nickname'])
                    logging.info('Avatar for the user: ' + playerToEdit['id'] + ' has been changed to: ' + playerToEdit['avatar'])
                    player_container.upsert_item(onlyUser)
                    
                    return func.HttpResponse(body=json.dumps({"result": True , "msg" : "Nickname succesfully changed"}))
                else:
                    logging.info("Invalid password")
                    return func.HttpResponse(body=json.dumps({"result": False , "msg": "Password less than 8 characters or greater than 16 characters"}))
            
            else:
                logging.info("Invalid email")
                return func.HttpResponse(body=json.dumps({"result": False , "msg": "Email incorrect"}))
        
        elif "password" in playerToEdit:
            user = []
            for item in player_container.query_items(query='SELECT * FROM player p WHERE p.id=\'{}\''.format(playerToEdit['id']), enable_cross_partition_query=True):
                user.append(json.dumps(item))
                logging.info("user dumped and appended")
            
            if len(user) > 0:
                logging.info("user exists")
                onlyUser = json.loads(user[0])
                logging.info(onlyUser)

                if len(playerToEdit["password"]) < 8 or len(playerToEdit["password"]) > 16:
                    onlyUser['player']['nickname'] = playerToEdit['nickname']
                    onlyUser['player']['avatar'] = playerToEdit['avatar']
                    logging.info('Password for the user: ' + playerToEdit['id'] + ' has been changed to: ' + playerToEdit['password'])
                    logging.info('Avatar for the user: ' + playerToEdit['id'] + ' has been changed to: ' + playerToEdit['avatar'])
                    player_container.upsert_item(onlyUser)
                    
                    return func.HttpResponse(body=json.dumps({"result": True , "msg" : "Password succesfully changed"}))
            else:
                logging.info("Invalid email")
                return func.HttpResponse(body=json.dumps({"result": False , "msg": "Email incorrect"}))
    else:
        return func.HttpResponse(body = json.dumps({"result": False , "msg": "No email provided"}))
