const express = require("express");
const { ProjectUserModel } = require("../Models");
const router = express.Router();

//Получать всех юзеров подойдет для получения списка пользователей для подписки - работает
router.get("/", (req, res) => {
    ProjectUserModel.find({}, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(results);
        }
    });
}) 

//Получить одного юзера
//подойдет для получения информации профиля - Работает
router.get("/:id", (req, res) => {
    const id = req.params.id;
    ProjectUserModel.findById(id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    })
})

router.post("/auth", (req, res) => {
    const {login, password } = req.body;
    ProjectUserModel.find({login: login, password: password}, (err, results) => {
        if (err) {
            res.status(500).send("null");
        } else {
            res.status(200).send(results);
        }
    });
})

//Добавить пользователя Он же регистрация - Работает
router.post("/", (req, res) => {
    const { fullName, login, password } = req.body;
    const newUser = new ProjectUserModel({ fullName, login, password, aboutAuthor: "", followedAuthors: []});
    newUser.save((err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send("User added");
        }
    });
})

//Редактировать пользователя - Работает
router.put("/:id", async (req, res) => {
    const id = req.params.id
    const { fullName, aboutAuthor } = req.body;
    await ProjectUserModel.findByIdAndUpdate(id,{fullName: fullName, aboutAuthor: aboutAuthor})
    res.send("User info updated");
});

//Подписаться на пользователя - Работает
router.post("/followUser", async (req, res) => {
    const { userId, followedUserId } = req.body;
    const user = await ProjectUserModel.findById(userId);

    user.followedAuthors.push(followedUserId)
    user.save((err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send("User followed");
        }
    });
});

//Отписаться от пользователя
router.post("/unFollowUser", async (req, res) => {
    const { userId, followedUserId } = req.body;
    const user = await ProjectUserModel.findById(userId);

    await ProjectUserModel.findByIdAndUpdate(userId,{followedAuthors: user.followedAuthors.filter((user) => user != followedUserId)})
    res.status(201).send("User unfollowed");

});


module.exports = router;