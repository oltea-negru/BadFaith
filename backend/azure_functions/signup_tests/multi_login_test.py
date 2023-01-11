import unittest
import requests
import azure.functions as func
import azure.cosmos as cosmos
from azure_functions import config
import os
import azure.cosmos.exceptions as exceptions
import json

db_URI = config.settings['db_URI']
db_id = config.settings['db_id']
db_key = config.settings['db_key']
player_cont =config.settings['player_container']
login_cont = config.settings['login_container']


class TestFunction(unittest.TestCase):

    client = cosmos.cosmos_client.CosmosClient(db_URI, db_key)
    db_client = client.get_database_client(db_id)
    login_container = db_client.get_container_client(login_cont)

    def test_multiple_login(self):

        input = {
            'email' : "naman@email.com",
            'password': "SewySewy"
        }

        resp = requests.get (
            # 'http://localhost:7071/api/LoginStatus',
            'https://badfaith2.azurewebsites.net/api/loginstatus',
            json = input
        )

        self.assertEqual(resp.json()["msg"], "OK")