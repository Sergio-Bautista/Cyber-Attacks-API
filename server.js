// imports json file
import attacks  from './attacks.json' with { type:'json'};
import  express  from 'express';

// lets the server know what external domains are allowed to access it's resources
import cors from 'cors';

// initiates an express instance and set the port number
const app = express();
const PORT = 8000;

// lets the app know tho use json and cors
app.use(express.json());
app.use(cors())

// creates the server
app.get('/', (req, res)=>{
    res.json({
        message : 'Cybersecurity Attacks Educational API',
        purpose : 'Learn attacks and how to defend against them' 
    });
});

// specifies what route the API will use to access the attack info
app.get("/attacks", (req, res) =>{
    res.json(attacks)
})

app.get("/quiz", (req, res) =>{
    res.json({
        title: "This is a quiz for the website",
        purpose : " to apply the learning we've done"
    })
})


// makes the server listen to the specified port 
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});