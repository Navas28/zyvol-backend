import express, { Request, Response } from 'express';
import { Contact } from '../models/contactModel';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {

    (async () => {
          try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json({ message: 'Contact submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
    })()
});

export default router;
