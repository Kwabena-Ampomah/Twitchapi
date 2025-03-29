import requests

#test file to see if the api works it does btw
client_id = 'zzsh4vqpt1cv0hp1ia01kd8d5ts3k9'
client_secret = 'd1g4b82crv41hmkgw0j6yymj1oimvf'

#  OAuth token
auth_url = 'https://id.twitch.tv/oauth2/token'
auth_params = {
    'client_id': client_id,
    'client_secret': client_secret,
    'grant_type': 'client_credentials'
}

auth_response = requests.post(auth_url, params=auth_params)
access_token = auth_response.json()['access_token']

# Step 2: Call an endpoint (e.g., get streams)
headers = {
    'Client-ID': client_id,
    'Authorization': f'Bearer {access_token}'
}
streams_url = 'https://api.twitch.tv/helix/streams'

response = requests.get(streams_url, headers=headers)
print(response.json())
