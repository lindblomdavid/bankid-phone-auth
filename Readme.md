# BankID Phone Authentication API

## Overview
This API is specifically designed for scenarios where you need to verify a customer's identity over the phone using BankID. It facilitates remote authentication by allowing a user (such as a customer service representative) to send a personal identity number (personnummer) through the API and then collect the authentication response. The project utilizes Node.js and Express and serves as a practical tool for understanding and implementing BankID's phone authentication process in web applications. This was developed as part of a learning exercise to explore the intricacies of the BankID API and its application in remote customer identity verification scenarios.

## Features
- Phone authentication with BankID
- Secure communication using .p12 certificates
- Environment variable configuration for sensitive data
- Middleware for API key authentication

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Node.js
- npm (Node package manager)
- A BankID test account and associated .p12 certificate

### Installation
1. Clone the repo: git clone https://github.com/yourusername/bankid-phone-auth.git
2. Navigate to the project directory: cd bankid-phone-auth
3. Install NPM packages: npm install
4.  Create a `.env` file in the root directory and fill it with the necessary environment variables:
   BANKID_API_URL=your_bankid_api_url
  BANKID_CERT_PATH=path_to_your_p12_certificate
  APP_API_KEY=your_generated_api_key
5. Start the server: npm start


## Usage
The API exposes endpoints for starting phone authentication and collecting the result.

### Start Phone Authentication
- **URL:** `/api/start-phone-auth`
- **Method:** `POST`
- **Headers:** `x-api-key: your_api_key`
- **Body:** 
  { "personalNumber": "your_personal_number",
  "callInitiator": "user" }


  ### Collect Authentication Result
  - **URL:** `/api/collect`
  - **Method:** `POST`
  - **Headers:** `x-api-key: your_api_key`
  - **Body:**
    {
    "orderRef": "your_order_reference"
    }

   ## License
This project was built as a personal project by lindblomdavid. Feel free to use it as you like, but I offer no support or guarantee.

### Disclaimer
This software is provided "as is", without warranty of any kind. Users of this repository must be aware of and comply with any regulations, terms, and conditions set forth by BankID for its usage. The author of this repository does not take any responsibility for the use or misuse of this software. Users should ensure they adhere to all the guidelines and legal requirements set by BankID or any other related authorities when using the BankID service.


  ### Acknowledgments
    - BankID team for the API documentation and support
      



  

