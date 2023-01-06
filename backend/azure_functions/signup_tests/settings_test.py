import unittest
import json
import requests
import os
import azure.functions as func
import azure.cosmos as cosmos
from azure_functions import config as c

db_URI = c.settings['db_URI']
db_id = c.settings['db_id']
db_key = c.settings['db_key']
player_cont = c.settings['player_container']
lobby_cont = c.settings['lobby_container']


class TestFunction(unittest.TestCase):
    client = cosmos.cosmos_client.CosmosClient(db_URI,db_key )

    db_client = client.get_database_client(db_id)

    player_container = db_client.get_container_client(player_cont)

    def test_login_player(self):

        # Changing nickname and password 
        input1 = {
            'email' : "deep@123.com",
            'nickname' : "DEEP123",
            "password" : "deepdeep"
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
             'http://localhost:7071/api/settings',
            #  'https://badfaith2.azurewebsites.net/api/settings',
            
            json = input1
        )

        # "Nickname and password succesfully changed"
        # "Nickname succesfully changed"
        # "Password succesfully changed"
        # "Email incorrect"
        
        # Checking for changing both nickname and password
        self.assertEqual(resp.json()["msg"], "Nickname and password succesfully changed")

        # Checking for changing only nickname
        # self.assertEqual(resp.json()["msg"], "Nickname succesfully changed")

        # Checking for changing only password
        # self.assertEqual(resp.json()["msg"], "Password succesfully changed")

        # Checking for incorrect email
        # self.assertEqual(resp.json()["msg"], "Email incorrect")