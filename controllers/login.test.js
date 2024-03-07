/*
1. Чи успішний логін користувача: 
правильний емейл та пароль - сервер повертає статус код 200 та повертає токен користувача. 
Повертається  об'єкт: 
  властивість user є об'єктом  ,
   властивості email та subscription є string.

 користувач вводить неправильний пароль або емейл -   код 401.

2.З'єднання з базою даних:   перед запуском і  після завершення тестів. 

3.Використання правильних залежностей: всі встановлені і доступні для використання.

4. сервер запускається і працює коректно, додаток завантажується без помилок.

*/




import mongoose from 'mongoose';
import { beforeAll, afterAll, expect, describe, test } from '@jest/globals'
import request from 'supertest';
import { app } from '../app';

import dotenv from 'dotenv';
dotenv.config();


describe('POST /login', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.DB_HOST)
    })
    const user = {
        email: 'woman@ukr.net',
        password: '123456'
    }
    test('It should login user and return token', async () => {
        const logResponse = await request(app).post('/api/users/login').send(user)
        expect(logResponse.status).toBe(200)
        expect(logResponse.body.token).toBeTruthy()
        expect(logResponse.body.user).toBeInstanceOf(Object)
        expect(typeof logResponse.body.user.email).toBe('string')
        expect(typeof logResponse.body.user.subscription).toBe('string')
    });


    test('It should return 401 for incorrect password', async () => {
        const invalidUser = {
            password: 'wrongpassword',
            email: 'woman@gmail.com',
        };
        const logResponse = await request(app).post('/api/users/login').send(invalidUser);
        expect(logResponse.status).toBe(401);
        expect(logResponse.body.message).toBe('Email or password is wrong');
    });
    afterAll(async () => {
        await mongoose.connection.close()
    })
})