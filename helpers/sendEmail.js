
import ElasticEmail from '@elasticemail/elasticemail-client';
import 'dotenv/config.js'
const { ELASTIC_EMAIL_API_KEY } = process.env;
const client = ElasticEmail.ApiClient.instance;

const apikey = client.authentications['apikey'];
apikey.apiKey = ELASTIC_EMAIL_API_KEY;

const emailsApi = new ElasticEmail.EmailsApi();


export const sendEmail = async (data) => {
    const emailData = {
        ...data,
        Content: {
            ...data.Content,
            from: 'user16101979@gmail.com'
        }
    };
    console.log(emailData);
    try {
        await emailsApi.emailsTransactionalPost(emailData);
        console.log('API called successfully.');
        console.log('Email sent.');
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// const callback = (error, data, response) => {
//     if (error) {
//         console.error(error);
//     } else {
//         console.log('API called successfully.');
//         console.log('Email sent.');
//     }
// };
// export const sendEmail = async (data) => {
//     const emailData = { ...data, from: 'user16101979@gmail.com' };
//     console.log(emailData)
//     await emailsApi.emailsTransactionalPost(emailData)
//     return true;
// };


// const emailData = {
//     Recipients: {
//         To: ["oksana_lesjuk@ukr.net"]
//     },
//     Content: {
//         Body: [
//             {
//                 ContentType: "HTML",
//                 Charset: "utf-8",
//                 Content: "<strong>Mail content.<strong>"
//             },
//             {
//                 ContentType: "PlainText",
//                 Charset: "utf-8",
//                 Content: "Mail content."
//             }
//         ],
//         From: "user16101979@gmail.com",
//         Subject: "Example transactional email"
//     }
// };

// const callback = (error, data, response) => {
//     if (error) {
//         console.error(error);
//     } else {
//         console.log('API called successfully.');
//         console.log('Email sent.');
//     }
// };
// // emailsApi.emailsTransactionalPost(emailData, callback);



// import Elasticemail from "@elasticemail/elasticemail-client";
// import 'dotenv/config.js'
// // import { HttpError } from "./HttpError";


// const { ELASTIC_EMAIL_API_KEY } = process.env;
// const client = ElasticEmail.ApiClient.instance(ELASTIC_EMAIL_API_KEY);

// const email = {
//     to: "oksana_lesjuk@ukr.net",
//     from: "user16101979@gmail.com",
//     subject: "Test email",
//     body_text: "Test email from localhost:3000"
// }

// elasticemail.mailer.send(email)
//     .then(() => console.log("Email send success"))
//     .catch(err => console.log(err.message))

// const sendEmail = async data => {
//     const email = { ...data, from: 'user16101979@gmail.com' };
//     await elasticemail.mailer.send(email, HttpError);
//     return true;
//   };