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
        # Checking for a short username
        input1 = {
            'username' : "George16",
            "password" : "george12345",
            "email" : "george@gmail.com",
            "nickname" : "kingGeorge"
        }

        # Checking for a long username
        input2 = {
                'username' : "MrDEEPPPPPPP",
                "password" : "spec4356#?"
            }

        # Checking for a short password
        input3 = {
                'username' : "MrDEEP",
                "password" : "6#?"
            }

        # Checking for a long password
        input4 = {
                'username' : "MrDEEP",
                "password" : "PasswordSoLongThatItIsOverThe30CharLimit"
            }

        #Checking for a valid signup input and duplicate password
        input5 = {
                'username' : "MrDEEP2",
                "password" : "password2"
            }

        #invalid dictionary format
        input6 = {
                "password" : "spec4356#?"
            }

        #invalid dictionary format
        input7 = {
                'username' : "Mr DEEP"
            }

        
        resp = requests.get (
               #'https://comp3207cw1-ap2g20.azurewebsites.net/api/registerplayer' ,
               'http://localhost:7071/api/SignUp'   ,                   
                                                                        
                json = input1
         )



        #input1
        # Checking for a short username
        #self.assertEqual(resp.json()["msg"], "The username is less than 4 characters or more than 10 characters")

        #input2
        # Checking for long username
        # self.assertEqual(resp.json()["msg"], "The username is less than 4 characters or more than 10 characters")

        #input3
        # Checking for a short password
        # self.assertEqual(resp.json()["msg"], "The password is less than 8 characters or more than 30 characters")
  
        #input4
        # Checking for a long password
        # self.assertEqual(resp.json()["msg"], "The password is less than 8 characters or more than 30 characters")

        #input5
        #Checking for a valid password
        self.assertEqual(resp.json()["msg"], "OK")

        #input5 again
        #Checking for duplicate players
        # self.assertEqual(resp.json()["msg"], "The username already exists!")

        #input6 
        #Checking for missing username field in incorrectly formatted json dictionary
        # self.assertEqual(resp.json()["msg"], "No username provided")

        #input7 again
        #Checking for missing password field in incorrectly formatted json dictionary
        # self.assertEqual(resp.json()["msg"], "No password provided")