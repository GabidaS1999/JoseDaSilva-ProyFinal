import {messageModel} from '../models/messages.js'

export default class MessagesService {
    getAll = async () => {
        try {
            let message = await messageModel.find();
            return message;
        } catch (error) {
            throw error;
        }
    }
    save = async (message) => {
        let newMessage = await messageModel.create(message);
        return newMessage
    }
}