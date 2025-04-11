const { generateUniqueId, searchObjectsByFields, getFieldValuesFromArray } = require('victor-dev-toolbox');
const { admin } = require('./firebase-config'); // Import Firebase Admin instance

class FirebaseClient {
  constructor(collection) {
    // Firebase Realtime Database reference using the provided collection
    this.db = admin.database().ref(collection);
  }



  // CREATE: Add a new record to the collection
  async create(data) {
    try {
      // Generate a unique ID (you can replace this with your custom ID generator)
      const id = data.id|| generateUniqueId();
      data.id = id; // Ensure data has the generated id
      const newRecordRef = this.db.child(id); // Use the generated ID as the key
      await newRecordRef.set(data); // Set the data at the generated ID
      return { id, data }; // Return the id and data
    } catch (error) {
      throw new Error(`Error creating record: ${error.message}`);
    }
  }

  // READ: Get a record by ID
  async get(id) {
    try {
      const ref = this.db.child(id); // Reference to a specific record
      const snapshot = await ref.once('value'); // Get the data
      if (!snapshot.exists()) {
        // throw new Error('Record not found');
        return null;
      }
      return snapshot.val(); // Return the data
    } catch (error) {
      throw new Error(`Error reading record: ${error.message}`);
    }
  }

  // UPDATE: Update an existing record by ID
  async update(id, data) {
    try {
      const ref = this.db.child(id); // Reference to the specific record
      await ref.update(data); // Update the record with new data
      return { id, data };
    } catch (error) {
      throw new Error(`Error updating record: ${error.message}`);
    }
  }


async delete(id){
    try {
      const ref = this.db.child(id); // Reference to the specific record
      await ref.remove(); // Remove the record
      return { id };
    } catch (error) {
      throw new Error(`Error deleting record: ${error.message}`);
    }
}


  // DELETE: Delete a record by ID

  // LIST: Get all records in the collection
  async list() {
    try {
      const snapshot = await this.db.once('value'); // Get all records
      if (!snapshot.exists()) {
        // throw new Error('No records found');
        return [];
      }
  
      const records = snapshot.val(); // Get the full object with IDs as keys
      return Object.values(records); // Return just the objects, not the keys
    } catch (error) {
    //   throw new Error(`Error listing records: ${error.message}`);
    return [];
    }
  }
  }


  


module.exports = FirebaseClient;
