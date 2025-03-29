import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';

const clientId = 'zzsh4vqpt1cv0hp1ia01kd8d5ts3k9';
const clientSecret = 'd1g4b82crv41hmkgw0j6yymj1oimvf';

export default function KaiStatus() {
  const [kaiInfo, setKaiInfo] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTwitchData = async () => {
      try {
        // Step 1: Get access token
        const tokenRes = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`, {
          method: 'POST'
        });
        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token;

        // Step 2: Check if Kai is live
        const streamRes = await fetch(`https://api.twitch.tv/helix/streams?user_login=KaiCenat`, {
          headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${accessToken}`
          }
        });
        const streamData = await streamRes.json();

        if (streamData.data && streamData.data.length > 0) {
          setIsLive(true);

          // Step 3: Get Kai’s profile info
          const userRes = await fetch(`https://api.twitch.tv/helix/users?login=KaiCenat`, {
            headers: {
              'Client-ID': clientId,
              'Authorization': `Bearer ${accessToken}`
            }
          });
          const userData = await userRes.json();
          setKaiInfo(userData.data[0]);
        } else {
          setIsLive(false);
        }
      } catch (err) {
        console.error("Error fetching Twitch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTwitchData();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#9146FF" />;

  return (
    <View style={styles.container}>
      {isLive ? (
        kaiInfo && (
          <>
            <Text style={styles.live}>🔴 KaiCenat is LIVE!</Text>
            <Image source={{ uri: kaiInfo.profile_image_url }} style={styles.avatar} />
            <Text style={styles.name}>{kaiInfo.display_name}</Text>
            <Text style={styles.bio}>{kaiInfo.description}</Text>
            <Text>View Count: {kaiInfo.view_count}</Text>
          </>
        )
      ) : (
        <Text style={styles.offline}>⚫ KaiCenat is currently OFFLINE</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  live: { fontSize: 20, color: 'red', marginBottom: 10 },
  offline: { fontSize: 20, color: 'gray' },
  name: { fontSize: 24, fontWeight: 'bold' },
  bio: { fontSize: 14, textAlign: 'center', marginVertical: 10 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 }
});
