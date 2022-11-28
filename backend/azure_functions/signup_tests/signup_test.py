import unittest
import requests
import azure.functions as func
import azure.cosmos as cosmos
from azure_functions import config
import os
import azure.cosmos.exceptions as exceptions
import json

class TestFunction(unittest.TestCase):

    client = cosmos.cosmos_client.CosmosClient(config.settings['db_URI'], config.settings['db_key'])
    db_client = client.get_database_client(config.settings['db_id'])
    player_container = db_client.get_container_client(config.settings['player_container'])

    def test_register_player(self):

        # Json for testing username
        
        checkValidUname = {"username": "MrDEEP" , "password" : "spec4356#?"}

        
        resp = requests.get (
               #'https://comp3207cw1-ap2g20.azurewebsites.net/api/registerplayer' ,
               'http://localhost:7071/api/SignUp'   ,                   
                                                                        
                json = checkValidUname
         )

        all_users = list(self.player_container.read_all_items())
     # Checking for a short username
    #    self.assertEqual(resp.json()["msg"], "Username less than 4 characters or more than 16 characters")
    #    self.assertEqual(len(all_users), 0)

        # Checking for long username
    #    self.assertEqual(resp.json()["msg"], "Username less than 4 characters or more than 16 characters")
    #    self.assertEqual(len(all_users), 0)

    #    Checking for a valid username
        # self.assertEqual(resp.json()["msg"], "OK")
        # self.assertEqual(len(all_users),2)

        # Checking for a short password
    #    self.assertEqual(resp.json()["msg"], "Password less than 8 characters or more than 24 characters")
    #    self.assertEqual(len(all_users), 1)

        # Checking for a long password
    #    self.assertEqual(resp.json()["msg"], "Password less than 8 characters or more than 24 characters")
    #    self.assertEqual(len(all_users), 1)

        # Checking for a valid password
    #    self.assertEqual(resp.json()["msg"], "OK")
    #    self.assertEqual(len(all_users), 3)

        #Checking for duplicate players
        self.assertEqual(resp.json()["msg"], "Username already exists")
        self.assertEqual(len(all_users), 2)