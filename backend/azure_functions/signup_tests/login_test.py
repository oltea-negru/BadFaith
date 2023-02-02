import unittest
import json
import requests
import os
import azure.functions as func
import azure.cosmos as cosmos
from azure_functions import config as c

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

        #valid login input
        input1 = {
            'email' : "test1@gmail.com",
            "password" : "TestPassword"
        }

        #incorrect email
        input2 = {
                'email' : "wronggavin@gmail.com",
                "password" : "password2"
            }

        #incorrect password
        input3 = {
                'email' : "gavin@gmail.com",
                "password" : "wrongpassword"
            }

        #invalid dictionary format
        input4 = {
                'username' : "gavin@gmail.com",
                "password" : "password2"
            }

        #invalid dictionary format
        input5 = {
                'email' : "gavin@gmail.com"
            }

        input6 = {
            'email' : "padithya2001@gmail.com",
            'password' : "forgotPassword"
        }
        resp = requests.get(
            'http://localhost:7071/api/Login',
# 'https://badfaith2.azurewebsites.net/api/login',
            json=input6
            )
        
        #input1
        #checking for a working login
        # self.assertEqual(resp.json()["avatarInt"], 3)

        #input2 and input3
        #checking for an incorrect email or password/failed login
        # self.assertEqual(resp.json()["msg"], "email or password incorrect")

        #input4
        #checking for an incorrectly formatted json dictionary missing the email field
        # self.assertEqual(resp.json()["msg"], "No email provided")

        #input5
        #checking for an incorrectly formatted json dictionary missing the password field
        # self.assertEqual(resp.json()["msg"], "No password provided")

        #input6
        self.assertEqual(resp.json()["passwordMsg"], "theString")