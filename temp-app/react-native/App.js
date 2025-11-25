import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import LoRaService from './src/LoRaService';

export default function App() {
  const [wsUrl, setWsUrl] = useState('ws://192.168.0.100:8080');
  const [toPrefix, setToPrefix] = useState('');
  const [status, setStatus] = useState('idle');
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const msgId = useRef(1);

  useEffect(() => {
    LoRaService.onStatus = (s) => setStatus(s);
    LoRaService.onMessage = handleIncoming;
    return () => {
      LoRaService.disconnect();
    };
  }, []);

  function handleIncoming(msg) {
    // store incoming event as a message
    setMessages(m => [{id: Date.now().toString(), text: JSON.stringify(msg), meta: 'in'} , ...m]);
  }

  async function connect() {
    setStatus('connecting');
    try {
      await LoRaService.connect(wsUrl);
      setStatus('connected');
    } catch (e) {
      setStatus('error');
      console.warn('connect error', e);
    }
  }

  function disconnect() {
    LoRaService.disconnect();
    setStatus('idle');
  }

  function sendText() {
    if (!messageText) return;
    const id = String(msgId.current++);
    const payload = {
      id,
      action: 'sendText',
      params: { toPrefix: toPrefix || null, text: messageText }
    };
    LoRaService.send(JSON.stringify(payload));
    setMessages(m => [{id, text: messageText, meta: 'out'}, ...m]);
    setMessageText('');
  }

  function sendRaw() {
    if (!messageText) return;
    try {
      const parsed = JSON.parse(messageText);
      LoRaService.send(JSON.stringify(parsed));
      setMessages(m => [{id: String(msgId.current++), text: JSON.stringify(parsed), meta: 'out-raw'}, ...m]);
      setMessageText('');
    } catch (e) {
      alert('Invalid JSON');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>HikeSafe — React Native Client</Text>
      <View style={styles.card}>
        <Text>Gateway WebSocket URL</Text>
        <TextInput value={wsUrl} onChangeText={setWsUrl} style={styles.input} />
        <Text>Device prefix (to send to; blank = broadcast)</Text>
        <TextInput value={toPrefix} onChangeText={setToPrefix} style={styles.input} />
        <View style={styles.row}>
          <Button title="Connect" onPress={connect} />
          <Button title="Disconnect" onPress={disconnect} />
        </View>
        <Text style={styles.meta}>Status: {status}</Text>
      </View>

      <View style={[styles.card, {flex:1}]}>
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          inverted
          renderItem={({item}) => (
            <View style={styles.msg}>
              <Text style={styles.meta}>{item.meta}</Text>
              <Text>{item.text}</Text>
            </View>
          )}
        />

        <TextInput
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Type message or raw JSON"
          multiline
          style={[styles.input, {height:80}]}
        />
        <View style={styles.row}>
          <Button title="Send Text" onPress={sendText} />
          <Button title="Send Raw JSON" onPress={sendRaw} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, padding:12, backgroundColor:'#fff'},
  title: {fontSize:18, fontWeight:'600', marginBottom:8},
  card: {background:'#f7f7f8', padding:10, borderRadius:8, marginBottom:10},
  input: {borderWidth:1, borderColor:'#ddd', padding:8, marginTop:6, borderRadius:6},
  row: {flexDirection:'row', justifyContent:'space-between', marginTop:8},
  meta: {fontSize:12, color:'#666', marginTop:6},
  msg: {padding:8, borderBottomWidth:1, borderBottomColor:'#eee'}
});
