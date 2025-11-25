# HikeSafe Messaging Temporary Application

This project is a temporary application designed to integrate messaging functionality using the LoRa protocol. It includes both real and mock implementations for testing purposes.

## Project Structure

```
hikesafe-messaging-temp
├── src
│   ├── index.js          # Entry point of the application
│   ├── messaging         # Contains messaging functionality
│   │   ├── lora.js      # LoRa messaging implementation
│   │   └── mock.js      # Mock messaging implementation for testing
│   ├── api              # API endpoints related to messaging
│   │   └── messages.js   # Handles incoming requests for messaging
│   └── utils            # Utility functions
│       └── serial.js     # Serial communication utilities
├── package.json          # npm configuration file
├── .env                  # Environment variables
├── .gitignore            # Files to ignore by Git
└── README.md             # Project documentation
```

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd hikesafe-messaging-temp
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory and add your configuration settings.

4. **Run the application**:
   ```
   npm start
   ```

## Usage

- The application initializes the messaging system and sets up the server logic in `src/index.js`.
- Use `src/messaging/lora.js` for LoRa messaging functionality.
- For testing, utilize the mock implementation in `src/messaging/mock.js`.
- API endpoints for messaging can be found in `src/api/messages.js`.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.