import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Comprobar si el usuario YA está loggeado.
export const isLogged = (req, res, next) => {
    req.session.nombre ? next() : res.redirect('/')
};

export const createHash = async (password) => {
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salts)
};

export const validatePassword = async (password, userPwd) => {
    return bcrypt.compare(password, userPwd);
};

export default __dirname;