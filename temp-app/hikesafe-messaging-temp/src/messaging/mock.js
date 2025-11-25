const mockMessaging = {
    sendMessage: (message) => {
        console.log(`Mock sending message: ${message}`);
        return Promise.resolve({ success: true, message });
    },
    receiveMessage: () => {
        const mockMessage = "This is a mock message.";
        console.log(`Mock receiving message: ${mockMessage}`);
        return Promise.resolve(mockMessage);
    },
    clearMessages: () => {
        console.log("Mock clearing messages.");
        return Promise.resolve({ success: true });
    }
};

export default mockMessaging;