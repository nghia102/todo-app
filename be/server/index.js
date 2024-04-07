const express = require('express');
const mongoose = require('mongoose');
// const dataSchema = require('src/models/model/dataSchema')
const app = express();
const port = 3000;
const cors = require('cors');
const mongoString = "mongodb+srv://nghianvptit19:nghia@cluster0.km5tfra.mongodb.net/todo";
const database = mongoose.connection;
// Kết nối đến cơ sở dữ liệu MongoDB
mongoose.connect(mongoString);
app.use(cors());
app.use(express.json())
// Định nghĩa schema cho document trong collection
const userSchema = new mongoose.Schema({
    
    username: {
        // required : true,
        type: String
    },
    password: {
      // required : true,
      type: String
    },
    todos: [{ task: String, completed: Boolean }]
})


// Tạo model từ schema
const DataModel = mongoose.model('User', userSchema);

app.get('/api/getAlldata', async (req, res) => {
  try {
    // Lấy tất cả dữ liệu từ collection
    const data = await DataModel.find({});
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/postData', async(req,res) => {
  try {
    let newDocument = new DataModel(req.body);
    const result = await newDocument.save();
    res.json(result);
    console.log(req.body)
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.post('/api/getUser', async (req, res) => {
  try {
    // Lấy tất cả dữ liệu từ collection
    const temp = req.body
    console.log(temp)
    const data = await DataModel.findOne(temp).exec();;
    console.log(req.body)
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/findOneAndUpdate', async (req, res) => {
  try {
    // Lấy tất cả dữ liệu từ collection
    const query = req.body.username
    const dataNew = req.body.todos
    // console.log(temp)
    const data = await DataModel.findOneAndUpdate(
      { username: query },
      { todos: dataNew },
    );
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/updateTodo', async(req,res) => {
  try {
    let newDocument = new DataModel(req.body);
    const result = await newDocument.save();
    res.json(result);
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});