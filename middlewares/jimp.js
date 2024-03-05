import Jimp from 'jimp';
import { HttpError } from '../helpers/HttpError.js';


export const jimp = async (req, res, next) => {
    try {
        const { path } = req.file
        const image = await Jimp.read(path)
        await image.resize(250, 250).writeAsync(path)
        next()
    } catch (err) {
        next(HttpError(400, 'Bad request'))
    }
}

