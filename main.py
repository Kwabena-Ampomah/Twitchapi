import requests

#  Twitch app credentials (keep these safe!)
client_id = 'zzsh4vqpt1cv0hp1ia01kd8d5ts3k9'
client_secret = 'd1g4b82crv41hmkgw0j6yymj1oimvf'

#  Get that access token so Twitch lets us in
auth_url = 'https://id.twitch.tv/oauth2/token'
auth_params = {
    'client_id': client_id,
    'client_secret': client_secret,
    'grant_type': 'client_credentials'
}
auth_response = requests.post(auth_url, params=auth_params)
access_token = auth_response.json()['access_token']

# Set up headers for all future Twitch API calls
headers = {
    'Client-ID': client_id,
    'Authorization': f'Bearer {access_token}'
}

#  Let's see if the GOAT KaiCenat is live right now
stream_url = 'https://api.twitch.tv/helix/streams'
stream_params = {'user_login': 'KaiCenat'}
stream_response = requests.get(stream_url, headers=headers, params=stream_params)
stream_data = stream_response.json()['data']

# If the stream_data isn't empty, that boy LIVE
if stream_data:
    print("🔴 KaiCenat is LIVE!\n")

    # Time to grab the rest of his Twitch info
    user_url = 'https://api.twitch.tv/helix/users'
    user_params = {'login': 'KaiCenat'}
    user_response = requests.get(user_url, headers=headers, params=user_params)
    user_info = user_response.json()['data'][0]

    # Output the juicy details
    print("Twitch User Info:")
    print(f"Display Name: {user_info['display_name']}")
    print(f"ID: {user_info['id']}")
    print(f"Bio: {user_info['description']}")
    print(f"Profile Picture: {user_info['profile_image_url']}")
    print(f"View Count: {user_info['view_count']}")
    print(f"Offline Banner: {user_info.get('offline_image_url', 'N/A')}")
else:
    #  Kai ain’t live rn, nothing else to do
    print("⚫ KaiCenat is currently OFFLINE. Skipping data fetch.")
