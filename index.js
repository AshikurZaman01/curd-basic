const express =  require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;


//middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('CURD port is running ');
})

app.listen(port, () => {
    console.log(`CURD port is running on port ${port}`);
});


const { MongoClient, ServerApiVersion , ObjectId } = require('mongodb');
const uri = "mongodb+srv://ashikurzaman774:wItHt935biybs8el@cluster0.q0gttvx.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Database
    const userCollection = client.db("userDB").collection("users");
    // Database

    // POST Data
    app.post("/users", async (req, res) => {
        const user = req.body;
        const result = await userCollection.insertOne(user);
        res.send(result);
        console.log(result);
    })
    // POST Data end

    // GET Data
    app.get("/users", async (req, res) => {
        const result = await userCollection.find({}).toArray();
        res.send(result);
        console.log(result);    
        
    })
    // GET Data☻ end

    // Delete Data☻
    app.delete("/users/:id", async (req, res) => {
        const id = req.params.id;
        const result = await userCollection.deleteOne({ _id: new ObjectId(id) });
        res.send(result);
        console.log(result);
        
    })
    // Delete Data☻

    app.get("/users/:id", async (req, res) => {
        const id = req.params.id;
        const result = await userCollection.findOne({ _id: new ObjectId(id) });
        res.send(result);
        console.log(result);
    })

    app.put("/users/:id", async (req, res) => {
        const id = req.params.id;
        const user = req.body;
        const result = await userCollection.updateOne({ _id: new ObjectId(id) }, { $set: user });
        res.send(result);
        console.log(result);
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
