const express = require('express')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Закінчити з CRUD операціями.
//
// При створенні робити валідацію на імʼя і вік,
//
// імʼя повинно бути більше за 3 символи, вік – не менше нуля
//
// На гет, пут, деліт юзерів перевірити чи такий юзер є в базі.
//
// якщо немає – вивести помилку
//
// Використовуйте шляхи для нових ендпоінтів згідно REST правил

let users = [
        { id: 1, name: "Oleksandr", age: 25, status: true },
        { id: 2, name: "Maria", age: 30, status: false },
        { id: 3, name: "Dmytro", age: 19, status: true },
        { id: 4, name: "Olena", age: 42, status: false },
        { id: 5, name: "Andrii", age: 28, status: true },
        { id: 6, name: "Anna", age: 35, status: true },
        { id: 7, name: "Maksym", age: 22, status: false },
        { id: 8, name: "Victoria", age: 27, status: true },
        { id: 9, name: "Ihor", age: 31, status: false },
        { id: 10, name: "Yuliia", age: 24, status: true }
];

app.get('/users', (req, res) => {
        try {
                res.send(users);
        } catch (e) {
                res.status(500).send(e.message);
        }
});

app.post('/users', (req, res) => {
       try {
               const {name, age, status} = req.body;
               if (name.length > 3 && age !== 0){
                       const id = users[users.length-1].id+1;
                       const newUser = {id, name, age, status};
                       users.push(newUser);
                       res.status(201).send(newUser);
               }
               res.status(400).send("Ім'я повинно бути більше 3 символів або рік не повинен дорівнювати 0")
       }catch (e){
               res.status(500).send(e.message);
       }
})

app.get('/users/:userId', (req, res) => {
       try {
               const userId = Number(req.params.userId)
               const user = users.find(user => user.id === userId);
               if(!user){
                       return req.status(404).send('Такого юзера не існує')
               }
               res.send(user);
       } catch (e){
               res.status(500).send(e.message);
       }
})

app.put('/users/:userId', (req, res) => {
        try {
                const userId = Number(req.params.userId)
                const userIndex = users.findIndex(user => user.id === userId);
                if(userIndex === -1){
                        return res.status(404).send('Такого юзера не існує')
                }
                const {name, age, status} = req.body;
                users[userIndex].name = name;
                users[userIndex].age = age;
                users[userIndex].status = status;
                req.status(201).send(users[userIndex]);
        }catch (e){
                res.status(500).send(e.message);
        }
})

app.delete('/users/:userId', (req, res) => {
        try {
                const userId = Number(req.params.userId)
                const userIndex = users.findIndex(user => user.id === userId);
                if(userIndex === -1){
                        return res.status(404).send('Такого юзера не існує')
                }
                users.splice(userIndex, 1);
                res.sedStatus(204)
        }
        catch (e){
                res.status(500).send(e.message);
        }
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


