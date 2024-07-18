const { default: mongoose } = require('mongoose')
const uri = "mongodb+srv://dharunprakash:12345@cluster0.tttb0r3.mongodb.net/INTERN?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri,clientOptions)