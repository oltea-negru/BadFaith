import unittest
import json
import requests
import os
import azure.functions as func
import azure.cosmos as cosmos
from azure_functions import config

db_URI = config.settings['db_URI']
db_id = config.settings['db_id']
db_key = config.settings['db_key']
player_cont =config.settings['player_container']
lobby_cont = config.settings['lobby_container']

# db_URI = os.environ['db_URI']
# db_id = os.environ['db_id']
# db_key = os.environ['db_key']
# player_cont =os.environ['player_container']
# lobby_cont = os.environ['lobby_container']


class TestFunction(unittest.TestCase):

    client = cosmos.cosmos_client.CosmosClient(db_URI, db_key)
    db_client = client.get_database_client(db_id)
    player_container = db_client.get_container_client(player_cont)

    def test_settings(self):

        # Changing nickname and password 
        input1 = {
            'email' : "deep@123.com",
            'nickname' : "MAMAM",
            "password" : "deepdeep9",
            "avatar"    : "salusas/sdfg/sdgsg.sfhw101010"
        }

        # Changing only nickname
        input2 = {
            'email' : "deep@123.com",
            'nickname' : "DEEP_DEEP",
        }

        # Changing only and password 
        input3 = {
            'email' : "deep@123.com",
            "password" : "doopdoop"
    }

        # Incorrect/no email 
        input4 = {
            'email' : " ",
            'nickname' : "DEEEEP",
            "password" : "DOOOOP"
        }

        resp = requests.get(
            #  'http://localhost:7071/api/Settings',
             'https://badfaith2.azurewebsites.net/api/settings',
            
            json = input1
        )

        # "Nickname and password succesfully changed"
        # "Nickname succesfully changed"
        # "Password succesfully changed"
        # "Email incorrect"
        
        # Checking for changing both nickname and password
        print("This is the json", resp.json())
        self.assertEqual(resp.json()["msg"], "Nickname and password succesfully changed")

        # Checking for changing only nickname
        # self.assertEqual(resp.json()["msg"], "Nickname succesfully changed")

        # Checking for changing only password
        # self.assertEqual(resp.json()["msg"], "Password succesfully changed")

        # Checking for incorrect email
        # self.assertEqual(resp.json()["msg"], "Email incorrect")