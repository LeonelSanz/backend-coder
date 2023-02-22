import MongoContainer from "./MongoContainer.js";
import messagesModel from '../../models/Messages.js';

export default class MessagesMongoContainer extends MongoContainer {
    async save(msg) {
        try {
            await messagesModel.create(msg);
            const message = await messagesModel.find(msg);
            return message
        } catch (error) {
            return console.log(error);
        }
    }
    async getAll(){
        try {
            return await messagesModel.find({});
        } catch (error) {
            return error;
        }
    }
};
