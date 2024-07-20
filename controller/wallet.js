const { log } = require('console');
const { ObjectId } = require('mongodb'); // Moved ObjectId require here
const readline = require('prompt-sync')({ sigint: true });
const fs = require('fs');  // Fixed fs module import
const MongoClient = require('./../server/localConnection.js'); // Assuming this file exports your MongoDB connection

const uri = MongoClient.uri;
const client = MongoClient.client;
const db = MongoClient.db;
const collection = MongoClient.collection;

const today = new Date();

let chargeCode = readline("Enter code: ");
let chargeBalance = 0;
let balance = 0; // Initialize balance outside the if block

if (chargeCode == 12) { // Corrected the assignment operator to equality comparison
  chargeBalance = 100;
  balance += chargeBalance;
  fs.writeFileSync('./../private/test.csv', `amount: ${chargeBalance}, Added on: ${today.toLocaleDateString()}, New balance: ${balance}\n`, { flag: 'a' });
  console.log(chargeBalance);
} else {
  console.log(`No such code: ${chargeCode}`);
}

async function main() { // Renamed function to 'main' for consistency
  try {
    await client.connect();
    console.log("Connected");

    if (chargeCode == 12) {
      const objectId = new ObjectId('6698395188f43f5a9e91e073');
      if (!ObjectId.isValid(objectId)) {
        throw new Error('Invalid ObjectId');
      }
      const result = await collection.updateOne(
        { _id: objectId },
        { $inc: { balance: chargeBalance } } // Corrected field name
      );

      if (result.modifiedCount === 1) {
        console.log("Balance updated successfully in MongoDB!");
      } else {
        console.log("No matching document found to update.");
      }
    }
    
  } catch (err) {
    console.error("Error updating balance:", err); // Added error handling
  } finally {
    await client.close(); // Ensure the connection is closed in the finally block
  }
}

main(); // Call main() after it's defined
console.log(balance); // This will now log the updated balance (after the update completes) 


// transRecord.writeFileSync('./../private/test.txt', 'here is the result of the first: ', { flag: 'a' })


