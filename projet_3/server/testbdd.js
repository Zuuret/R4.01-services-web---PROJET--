const {MongoClient} = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017/'
const nomBdd = "chat";

async function getBooks() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(nomBdd);
        const booksCollection = db.collection("chats");
        const books = await booksCollection.find({
            name: {$in: ["testName", "AVAILABLE"]}
        }).toArray();
        console.log("Livres : ", JSON.stringify(books, null, 2));
    } catch(err) {
        console.log(err);
    } finally {
        await client.close();
    }
}

getBooks();
