const express = require('express');
const app = express();

const userRoutes = require('./routes/User')
const profileRoutes = require('./routes/Profile')
const paymentRoutes = require('./routes/Payments')
const courseRoutes = require('./routes/Course')

const database = require('./config/database')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const {cloudinaryConnect} = require('./config/cloudinary')
const fileUpload = require('express-fileupload')
require('dotenv').config();

const PORT = process.env.PORT || 4000;
database.connect();
app.use(express.json());
app.use(cookieParser());
//google about cors - 
app.use(cors({
    origin: ["http://localhost:3000","https://study-notion-seven-puce.vercel.app/"],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));
// app.use(cors({ origin: "https://study-notion-frontend-sooty.vercel.app" }));

app.use(fileUpload({useTempFiles:true,tempFileDir:"/tmp"}))
cloudinaryConnect();

app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/course",courseRoutes);

//def routes
app.get('/',(req,res)=>{
    return res.status(200).json({
        success: true,
        message: "Your server is up and running...",
    })
})

app.listen(PORT, ()=>{
    console.log("Server is running at port 4000");
})
