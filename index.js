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


// Відсутні поля. Якщо в запиті на створення немає імені або тіло порожнє, сервер падає з 500. Це помилка клієнта, тому відповідь має бути 400 зі зрозумілим повідомленням.
// - Повідомлення про помилку валідації не відповідає умові («рік не повинен дорівнювати 0») і не каже, яке саме поле невалідне. Краще для кожного поля давати окреме повідомлення.

//Створення юзера: після успішної відповіді 201 код іде далі й намагається відправити ще й 400.
// Клієнт цього не бачить, але сервер на кожне створення пише в лог Cannot set headers after they are sent to the client. Після відправки відповіді хендлер має завершуватися.
app.post('/users', (req, res) => {
        try {
               const {name, age, status} = req.body;

               if(!name || typeof  name !== 'string' || name.length <= 3){
                       return res.status(400).send("Ім'я повинно бути стрінгове, більше 3 символів і обов'язкове")
               }
               if(age === undefined || age === null || typeof age !== 'number' || age < 0){
                      return  res.status(400).send("Вік повинен бути числовим, не менше 0 і обов'язковим")
               }
               if(typeof status !== 'boolean'){
                     return res.status(400).send("Статус повинен бути boolean і обов'язковим")
               }
               const id = users[users.length-1].id+1;
               const newUser = {id, name, age, status};
               users.push(newUser);
               return res.status(200).send(newUser);
       }catch (e){
               res.status(400).send(e.message);
       }
})

// Отримання юзера за id, якого не існує, повертає 500 req.status is not a function замість 404.
// Перевірку написано, але відповідь відправляється не через той об'єкт: статус встановлюють на відповіді (res), а не на запиті (req).
app.get('/users/:userId', (req, res) => {
       try {
               const userId = Number(req.params.userId)
               const user = users.find(user => user.id === userId);
               if(!user){
                       return res.status(404).send('Такого юзера не існує')
               }
                       res.send(user);
       } catch (e){
               res.status(500).send(e.message);
       }
})

//Оновлення юзера змінює дані, але клієнт отримує 500 з тієї ж причини: req замість res. Клієнт бачить помилку, хоча оновлення відбулося.
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
                res.status(201).send(users[userIndex]);
        }catch (e){
                res.status(500).send(e.message);
        }
})

//Видалення юзера прибирає юзера з масиву, але клієнт отримує 500 через друкарську помилку в назві методу для відправки статусу. Має повертатися 204.
app.delete('/users/:userId', (req, res) => {
        try {
                const userId = Number(req.params.userId)
                const userIndex = users.findIndex(user => user.id === userId);
                if(userIndex === -1){
                        return res.status(404).send('Такого юзера не існує')
                }
                users.splice(userIndex, 1);
               return  res.status(204).send()
        }
        catch (e){
                res.status(500).send(e.message);
        }
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


