const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const privateKey = "mySecretKey";


app.use((req, res, next) => {

    if (req.url == "/login") {
        next();
    }
        try {
            let token = req.headers.authorization.split(' ')[1]
            let result = jwt.verify(token, privateKey)
            next();
        } catch (error) {

            res.status(401).json({ message: error });

        }

})

// app.use((req, res, next) => {
//     console.log("Middleware 1");

// })


app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (email == "cagatay@mail.com" && password == "123") {

        const token = jwt.sign({ email }, privateKey,
            {
                expiresIn: 30000
            }
        );
        res.status(200).json({ token });

    } else {
        res.status(401).json({ message: "Kullanıcı adı veya şifre hatalı" });
    }
}
)


app.get("/", (req, res) => {
    let cities = ["İzmir", "İstanbul", "Ankara", "Bursa"];
    res.status(200).json(cities);

})





app.listen(3000, () => {
    console.log('Server running on port 3000');
})