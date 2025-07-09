const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('Hello world');
});

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = "mongodb+srv://ishimwefrank147:PEip9cv3TVqNqhGY@cluster0.5tx4j3t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const bookCollections = client.db("BookInventory").collection("books");

    // Upload a new book
    app.post("/upload-book", async (req, res) => {
      const data = req.body;
      const result = await bookCollections.insertOne(data);
      res.send(result);
    });

    // Get all books OR filter by category
    app.get("/all-books", async (req, res) => {
      let query = {};
      if (req.query?.category) {
        query = { category: req.query.category };
      }
      const result = await bookCollections.find(query).toArray();
      res.send(result);
    });

    //to get single book data
    app.get("/book/:id", async(req,res) =>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const result = await bookCollections.findOne(filter);
      res.send(result);
    })

    // Update a book
    app.patch("/book/:id", async (req, res) => {
      const id = req.params.id;
      const updateBookData = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updateDoc = {
        $set: {
          ...updateBookData
        }
      };

      const result = await bookCollections.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // Delete a book
    app.delete("/book/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await bookCollections.deleteOne(filter);
      res.send(result);
    });

    // Confirm successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Successfully connected to MongoDB!");

  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
}
run().catch(console.dir);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
 