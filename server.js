import attacks  from './attacks.json' with { type:'json'};
import  express  from 'express';
import cors from 'cors';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors())

app.get('/', (req, res)=>{
    res.json({
        message : 'Cybersecurity Attacks Educational API',
        purpose : 'Learn attacks and how to defend against them' 
    });
});

app.get("/attacks", (req, res) =>{
    res.json(attacks)
})



app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});

// if search fynctiuon is implemented 
/*
const slugify = (text) => {
  return text
    .toLowerCase()      // "SQL Attack" -> "sql attack"
    .trim()             // Removes accidental spaces at the ends
    .split(' ')         // Splits into an array: ["sql", "attack"]
    .filter(word => word !== "") // Removes extra spaces in between words
    .join('-');         // Joins them back: "sql-attack"
};
*/