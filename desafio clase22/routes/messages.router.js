import { Router } from "express";
import { normalize, schema } from "normalizr";
import { messages } from "../index.js";
const messagesRouter = new Router;

messagesRouter.get('/', (req, res) => {
    const newMessages = {
        id: 1000, 
        chat: messages
    };

    const user = new schema.Entity('users');

    const message = new schema.Entity('messages', {
        user: user
    });

    const result = new schema.Entity('results', {
        chat: [ message ]
    });

    const normalizedData = normalize(newMessages, result);
    //console.log(JSON.stringify(normalizedData, null, '\t'));

    res.json(normalizedData);
});

export default messagesRouter;