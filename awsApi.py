-- aws api code

import json
import boto3
from botocore.vendored import requests

url = 'https://uixa7mlrag.execute-api.us-east-1.amazonaws.com/prod'

def lambda_handler(event, context):
	client = boto3.resource('dynamodb')
	table = client.Table('maiduo3.maiduo_shop')
	idRes = requests.get(url)
	print(idRes.text)
	idObj = json.loads(idRes.text)
	print(idObj)
	response = table.put_item(
         Item={
			'_id':idObj['id'],
			'name':'asdfadsf'
		}
	)
	return response

