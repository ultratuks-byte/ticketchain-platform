\# Student 2 - Wallet Integration Testing Instructions



\## ✅ What Student 2 Completed



Student 2 implemented \*\*wallet integration and transaction handling\*\* for the TicketChain platform, allowing users to interact with the blockchain through MetaMask.



\*\*Assignment Requirements Met:\*\*

\- ✅ Wallet Integration (MetaMask)

\- ✅ Transaction Handling (eth\_sendTransaction)

\- ✅ Record Submission (Events to blockchain)

\- ✅ Approvals (MetaMask confirmations required)

\- ✅ Status Retrieval (Blockchain queries)



\---



\## 📁 Files Created by Student 2

```

ticketchain-platform/

├── services/

│   ├── walletService.js          - Wallet connection and management

│   └── contractService.js        - Smart contract interaction

├── student2-complete.html        - Complete testing interface

└── STUDENT2\_INSTRUCTIONS.md      - This file

```



\---



\## 🛠️ Prerequisites



Before testing Student 2's work, you need:



1\. \*\*Ganache\*\* - Local Ethereum blockchain

&#x20;  - Download: https://trufflesuite.com/ganache/

&#x20;  

2\. \*\*MetaMask\*\* - Browser extension wallet

&#x20;  - Chrome: https://chrome.google.com/webstore

&#x20;  - Search "MetaMask" and install



3\. \*\*Node.js\*\* - Already installed (used for Student 1)



4\. \*\*VS Code\*\* with Live Server extension

&#x20;  - VS Code → Extensions → Search "Live Server" → Install



\---



\## 🚀 Setup Instructions



\### STEP 1: Install Dependencies

```bash

cd ticketchain-platform

npm install

```



\---



\### STEP 2: Start Ganache



1\. \*\*Open Ganache application\*\*



2\. \*\*Click "Quickstart Ethereum"\*\*



3\. \*\*Verify you see:\*\*

&#x20;  - 10 accounts listed

&#x20;  - Each with \*\*100.00 ETH\*\*

&#x20;  - RPC Server: \*\*HTTP://127.0.0.1:7545\*\*

&#x20;  - Network ID: \*\*5777\*\*



4\. \*\*Leave Ganache running\*\* (don't close it!)



\---



\### STEP 3: Deploy Smart Contract (from Student 1)



\*\*If contract not already deployed:\*\*

```bash

truffle migrate --reset

```



\*\*Expected output:\*\*

```

✓ Contract deployed successfully

✓ Contract address: 0x99677B872C707dF4B959850d5359EC3DAF86A69B

```



\*\*Copy this contract address!\*\* You'll need it.



\---



\### STEP 4: Configure MetaMask



\#### 4.1 Add Ganache Network to MetaMask



1\. \*\*Open MetaMask\*\* (click the fox icon in browser)



2\. \*\*Click the network dropdown\*\* (top center)



3\. \*\*Click "Add network"\*\*



4\. \*\*Click "Add a network manually"\*\*



5\. \*\*Fill in EXACTLY:\*\*

```

&#x20;  Network name: Ganache Local

&#x20;  

&#x20;  New RPC URL: http://127.0.0.1:7545

&#x20;  

&#x20;  Chain ID: 1337

&#x20;  

&#x20;  Currency symbol: ETH

&#x20;  

&#x20;  Block explorer URL: (leave blank)

```



6\. \*\*Click "Save"\*\*



7\. \*\*MetaMask will automatically switch to "Ganache Local"\*\*



✅ \*\*Network added successfully!\*\*



\---



\#### 4.2 Import Ganache Account to MetaMask



1\. \*\*In Ganache\*\*, find the \*\*first account (Index 0)\*\*



2\. \*\*Click the KEY icon 🔑\*\* on the right side of that account



3\. \*\*Copy the entire private key\*\* (starts with `0x...`)



4\. \*\*In MetaMask:\*\*

&#x20;  - Click the \*\*account dropdown\*\* (top left)

&#x20;  - Click \*\*"Import account"\*\*

&#x20;  - Make sure \*\*"Private Key"\*\* is selected

&#x20;  - \*\*Paste the private key\*\*

&#x20;  - Click \*\*"Import"\*\*



5\. \*\*Verify:\*\*

&#x20;  - New account appears (e.g., "Account 5" or "Imported Account 1")

&#x20;  - Balance shows: \*\*100 ETH\*\* ✅



✅ \*\*Account imported successfully!\*\*



\---



\### STEP 5: Open the Test Page



\#### Option A: Using Live Server (Recommended)



1\. \*\*Open VS Code\*\*



2\. \*\*Navigate to:\*\* `student2-complete.html`



3\. \*\*Right-click the file\*\*



4\. \*\*Select "Open with Live Server"\*\*



5\. \*\*Browser opens automatically\*\* at `http://127.0.0.1:5500/student2-complete.html`



\#### Option B: Manual (if no Live Server)



1\. \*\*Open Chrome\*\*



2\. \*\*Press Ctrl+O\*\*



3\. \*\*Navigate to:\*\* `C:\\Users\\\[YourName]\\Desktop\\ticketchain-platform\\student2-complete.html`



4\. \*\*Click "Open"\*\*



\---



\## 🧪 Testing All 6 Functions



\*\*Follow these steps IN ORDER:\*\*



\---



\### ✅ Step 1: Connect Wallet



1\. \*\*Click the green "Connect Wallet" button\*\*



2\. \*\*MetaMask popup appears\*\*



3\. \*\*Select the imported account\*\* (the one with 100 ETH)



4\. \*\*Click "Next"\*\* → \*\*"Connect"\*\*



5\. \*\*Expected Result:\*\*

```

&#x20;  ✅ WALLET CONNECTED SUCCESSFULLY!

&#x20;  

&#x20;  Connected Account: 0x...

&#x20;  Network: Ganache Local (Chain ID: 1337)

&#x20;  Status: Ready for blockchain transactions

&#x20;  

&#x20;  ✓ Wallet Integration: COMPLETE ✅

```



\*\*✅ If you see this - SUCCESS! Continue to Step 2\*\*



\---



\### ✅ Step 2: Initialize Contract



1\. \*\*Click "Initialize Contract" button\*\*



2\. \*\*Expected Result:\*\*

```

&#x20;  ✅ SMART CONTRACT INITIALIZED!

&#x20;  

&#x20;  Contract Address: 0x99677B872C707dF4B959850d5359EC3DAF86A69B

&#x20;  Network ID: 5777 (Ganache Local)

&#x20;  Blockchain: Ethereum (Test Network)

&#x20;  Status: Ready for interaction

&#x20;  

&#x20;  ✓ Contract Connection: COMPLETE ✅

```



\*\*✅ If you see this - SUCCESS! Continue to Step 3\*\*



\---



\### ✅ Step 3: Create Event (Record Submission + Approval)



1\. \*\*Fill in the event details\*\* (or use defaults):

&#x20;  - Event Name: `Lusaka Blockchain Summit 2026`

&#x20;  - Venue: `Mulungushi International Conference Centre`

&#x20;  - Ticket Price: `0.001` ETH

&#x20;  - Total Tickets: `500`



2\. \*\*Click "Create Event" button\*\*



3\. \*\*MetaMask popup appears\*\* 🦊



4\. \*\*Review the transaction details\*\*



5\. \*\*Click "Confirm"\*\* in MetaMask



6\. \*\*Wait 2-3 seconds\*\*



7\. \*\*Expected Result:\*\*

```

&#x20;  ✅ EVENT CREATION TRANSACTION SUCCESSFUL!

&#x20;  

&#x20;  Transaction Hash: 0x...

&#x20;  Event Name: Lusaka Blockchain Summit 2026

&#x20;  Venue: Mulungushi International Conference Centre

&#x20;  Ticket Price: 0.001 ETH

&#x20;  Total Tickets: 500

&#x20;  Status: Recorded on blockchain

&#x20;  

&#x20;  ✓ Record Submission: COMPLETE ✅

&#x20;  ✓ MetaMask Approval: CONFIRMED ✅

&#x20;  ✓ Transaction Executed: SUCCESS ✅

```



\*\*✅ If you see this - SUCCESS! Continue to Step 4\*\*



\---



\### ✅ Step 4: Retrieve Event Details (Status Retrieval)



1\. \*\*Make sure Event ID is set to `0`\*\* (default)



2\. \*\*Click "Get Event Details" button\*\*



3\. \*\*Expected Result:\*\*

```

&#x20;  ✅ EVENT DETAILS RETRIEVED!

&#x20;  

&#x20;  Event ID: 0

&#x20;  Contract Address: 0x99677B872C707dF4B959850d5359EC3DAF86A69B

&#x20;  Contract Balance: 0.001 ETH

&#x20;  Blockchain Status: Active

&#x20;  

&#x20;  ✓ Status Retrieval: COMPLETE ✅

&#x20;  ✓ Blockchain Query: SUCCESSFUL ✅

&#x20;  ✓ Data Verification: CONFIRMED ✅

```



\*\*✅ If you see this - SUCCESS! Continue to Step 5\*\*



\---



\### ✅ Step 5: Purchase Ticket (Transaction + Payment + Approval)



1\. \*\*Set Event ID to `0`\*\*



2\. \*\*Set Price to `0.001` ETH\*\*



3\. \*\*Click "Buy Ticket" button\*\*



4\. \*\*MetaMask popup appears\*\* 🦊



5\. \*\*Review the payment details\*\* (you're sending 0.001 ETH)



6\. \*\*Click "Confirm"\*\* in MetaMask



7\. \*\*Wait 2-3 seconds\*\*



8\. \*\*Expected Result:\*\*

```

&#x20;  ✅ TICKET PURCHASE SUCCESSFUL!

&#x20;  

&#x20;  Transaction Hash: 0x...

&#x20;  Event ID: 0

&#x20;  Amount Paid: 0.001 ETH

&#x20;  

&#x20;  ✓ Transaction: COMPLETE ✅

&#x20;  ✓ Payment Approval: CONFIRMED ✅

&#x20;  ✓ Payment Sent to Contract ✅

```



\*\*✅ If you see this - SUCCESS! Continue to Step 6\*\*



\---



\### ✅ Step 6: Validate Ticket (Verification + Approval)



1\. \*\*Set Ticket ID to `0`\*\*



2\. \*\*Click "Validate Ticket" button\*\*



3\. \*\*MetaMask popup appears\*\* 🦊



4\. \*\*Click "Confirm"\*\* in MetaMask



5\. \*\*Wait 2-3 seconds\*\*



6\. \*\*Expected Result:\*\*

```

&#x20;  ✅ TICKET VALIDATION SUCCESSFUL!

&#x20;  

&#x20;  Transaction Hash: 0x...

&#x20;  Ticket ID: 0

&#x20;  

&#x20;  ✓ Verification: COMPLETE ✅

&#x20;  ✓ Approval: CONFIRMED ✅

&#x20;  ✓ Status Updated ✅

```



\*\*✅ If you see this - SUCCESS! ALL TESTS COMPLETE!\*\*



\---



\## 🎉 Success Criteria



\*\*All 6 steps should show:\*\*

\- ✅ Green success messages

\- ✅ Transaction hashes (for steps 3, 5, 6)

\- ✅ "COMPLETE" status confirmations

\- ✅ MetaMask popups appeared (for steps 1, 3, 5, 6)



\*\*If all 6 steps passed - Student 2 implementation is verified working!\*\* ✅



\---



\## 🐛 Troubleshooting



\### ❌ "MetaMask not installed" error

\*\*Solution:\*\* Install MetaMask browser extension



\---



\### ❌ "Insufficient funds" error

\*\*Solution:\*\* 

1\. Check MetaMask balance - should show \~100 ETH

2\. If 0 ETH - import a fresh Ganache account

3\. Make sure you're on "Ganache Local" network



\---



\### ❌ MetaMask popup not appearing

\*\*Solution:\*\*

1\. Check network - must be "Ganache Local" (top center of MetaMask)

2\. Make sure Ganache application is running

3\. Refresh the page and try again



\---



\### ❌ "Could not fetch chain ID" error

\*\*Solution:\*\*

1\. Verify Ganache is running

2\. Check RPC URL in MetaMask is: `http://127.0.0.1:7545`

3\. Make sure it includes `http://` at the beginning



\---



\### ❌ "Transaction failed" or "Revert" error

\*\*Solution:\*\*

1\. Make sure contract was deployed (run `truffle migrate --reset`)

2\. Check Ganache is running on correct port (7545)

3\. Verify correct network selected in MetaMask



\---



\### ❌ Balance shows $0.00 in MetaMask

\*\*Solution:\*\*

1\. Click network dropdown - make sure "Ganache Local" is selected

2\. If wrong network - switch to "Ganache Local"

3\. If still $0 - import a fresh account from Ganache



\---



\## 📊 What Each Function Demonstrates



| Function | Demonstrates | MetaMask Popup? |

|----------|-------------|-----------------|

| Connect Wallet | Wallet Integration | ✅ Yes |

| Initialize Contract | Contract Connection | ❌ No |

| Create Event | Record Submission + Approval | ✅ Yes |

| Get Event Details | Status Retrieval | ❌ No |

| Buy Ticket | Transaction + Payment + Approval | ✅ Yes |

| Validate Ticket | Verification + Approval | ✅ Yes |



\---



\## 🎯 Assignment Requirements Verified



After completing all 6 tests, Student 2 has demonstrated:



✅ \*\*b. User Interaction \& Wallet Integration:\*\*

\- ✅ Integrate blockchain wallets (MetaMask via window.ethereum API)

\- ✅ Transaction handling (eth\_sendTransaction for blockchain writes)

\- ✅ Implement record submission (Events submitted via transactions)

\- ✅ Approvals (MetaMask confirmation required for all transactions)

\- ✅ Status retrieval (eth\_call and eth\_getBalance for reading state)



\---



\## 📸 Documentation



\*\*For your report, take screenshots of:\*\*

1\. ✅ Wallet Connected (Step 1)

2\. ✅ Contract Initialized (Step 2)

3\. ✅ Event Created with transaction hash (Step 3)

4\. ✅ Event Details Retrieved (Step 4)

5\. ✅ Ticket Purchased with payment (Step 5)

6\. ✅ Ticket Validated (Step 6)



\---



\## 🔄 To Test Again



\*\*If you want to run the tests multiple times:\*\*



1\. \*\*Make sure you have enough ETH\*\* (check MetaMask balance)

2\. \*\*If balance is low\*\*, import another Ganache account

3\. \*\*Refresh the test page\*\* (Ctrl+Shift+R)

4\. \*\*Repeat all 6 steps\*\*



\---



\## 📝 Notes for Student 3 \& 4



\*\*Student 3 (Testing):\*\*

\- Can use this test page as reference for automated tests

\- Should verify all 6 functions programmatically

\- Can extend tests for edge cases



\*\*Student 4 (User Interface):\*\*

\- Can reuse `walletService.js` and `contractService.js`

\- Should integrate these services into the main UI

\- Use the same MetaMask connection pattern



\---



\## 💻 Technical Implementation Details



\### Technologies Used:

\- \*\*MetaMask\*\* - Browser wallet for Ethereum

\- \*\*window.ethereum API\*\* - Web3 provider injection

\- \*\*Ganache\*\* - Local Ethereum blockchain

\- \*\*JavaScript ES6\*\* - Modern JavaScript features

\- \*\*HTML5/CSS3\*\* - User interface



\### Key Functions:

\- `connectWallet()` - Connects to MetaMask

\- `initContract()` - Initializes smart contract connection

\- `submitEvent()` - Sends transaction to create event

\- `retrieveEvent()` - Queries blockchain for event data

\- `purchaseTicket()` - Sends payment transaction

\- `verifyTicket()` - Sends validation transaction



\---



\## ✅ Completion Checklist



Use this to verify Student 2 is complete:



\- \[ ] Ganache running with 10 accounts (100 ETH each)

\- \[ ] MetaMask installed and configured

\- \[ ] Ganache Local network added to MetaMask

\- \[ ] Ganache account imported to MetaMask

\- \[ ] Contract deployed to Ganache

\- \[ ] Test page opens in browser

\- \[ ] Step 1: Connect Wallet ✅

\- \[ ] Step 2: Initialize Contract ✅

\- \[ ] Step 3: Create Event ✅ (MetaMask popup)

\- \[ ] Step 4: Get Event Details ✅

\- \[ ] Step 5: Buy Ticket ✅ (MetaMask popup)

\- \[ ] Step 6: Validate Ticket ✅ (MetaMask popup)

\- \[ ] All 6 steps show success messages

\- \[ ] Screenshots taken for documentation



\---



\## 🎊 Congratulations!



\*\*If all tests passed, Student 2 implementation is complete and verified!\*\*



\*\*Next Steps:\*\*

\- Student 3: Automated Testing \& Deployment

\- Student 4: User Interface Development



\---



\*\*Questions?\*\* Check the troubleshooting section or contact the team!



\*\*Student 2 - Wallet Integration: COMPLETE\*\* ✅

