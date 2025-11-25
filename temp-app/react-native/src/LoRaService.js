class LoRaService {
  constructor() {
    this.ws = null;
    this.onMessage = null; // callback
    this.onStatus = null; // callback
  }

  connect(url) {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(url);
      } catch (e) {
        reject(e);
        return;
      }

      this.ws.onopen = () => {
        if (this.onStatus) this.onStatus('connected');
        resolve();
      };

      this.ws.onmessage = (e) => {
        let data = e.data;
        try { data = JSON.parse(e.data); } catch (err) { /* not JSON */ }
        if (this.onMessage) this.onMessage(data);
      };

      this.ws.onerror = (err) => {
        if (this.onStatus) this.onStatus('error');
        console.warn('WebSocket error', err);
      };

      this.ws.onclose = () => {
        if (this.onStatus) this.onStatus('closed');
      };
    });
  }

  send(text) {
    if (!this.ws || this.ws.readyState !== 1) {
      console.warn('WebSocket not connected');
      return;
    }
    this.ws.send(text);
  }

  disconnect() {
    if (this.ws) {
      try { this.ws.close(); } catch (e) {}
      this.ws = null;
      if (this.onStatus) this.onStatus('idle');
    }
  }
}

export default new LoRaService();
