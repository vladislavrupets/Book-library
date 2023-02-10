const db = require('../db-config');
class ReaderController {
    async addReader(req, res) {
        const { username, password, full_name, phone_number, trust_raiting } = req.body;
        const newReader = await db.query(
            `insert into Reader
            (username, password, full_name, phone_number, trust_raiting) 
            values ($1, $2, $3, $4, $5)`,
            [username, password, full_name, phone_number, trust_raiting]);
        res.json(newReader);
    }

    async getAllReaders(res) {
        const AllReaders = await db.query(
            `select * from Reader`
            );
        res.json(AllReaders);
    }
}

module.exports = new ReaderController();