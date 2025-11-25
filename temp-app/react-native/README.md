# HikeSafe React Native Client (Expo)

This is a minimal Expo React Native client that connects to the HikeSafe gateway WebSocket and sends/receives messages using the gateway JSON protocol.

Quick start (PowerShell)

1. Install Node.js and npm, then install Expo CLI if you like (`npm install -g expo-cli`) or use `npx`.

2. From this folder:

```powershell
cd "temp-app/react-native"
npm install
# start the Metro bundler
npx expo start
```

3. Configure the gateway address inside the app on the first screen (`ws://<GATEWAY_HOST>:8080`). Make sure the phone is on the same LAN as the gateway host.

Gateway notes
- Run `gateway/index.js` from the repository and set `SERIAL_PORT` to the port your TTGO is connected to.
- Example gateway start (PowerShell):

```powershell
$env:SERIAL_PORT='COM3'; node gateway/index.js
```

How the protocol looks
- Send a text message JSON:

```json
{
  "id": "1",
  "action": "sendText",
  "params": { "toPrefix": "abcdef012345", "text": "Hello" }
}
```

Incoming messages from the gateway are shown in the messages list. Use the "Send Raw JSON" box to send custom gateway actions for testing.

Next steps
- I can extend the UI (contacts, message threading), add persistent storage, or implement React Native background sockets for notifications. Tell me which you'd like next.
