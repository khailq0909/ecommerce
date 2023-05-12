const nodemiler = require('nodemailer');
const sendEmail = async options =>{
    let transporter = await nodemiler.createTransport({
        service:"gmail",
        auth:{
            user:"khaiql0909@gmail.com",
            pass:"bixriymrmggvtslj"
        }
        });
        const message = {
            from: `noreply@ecommerce.com`,
            to: options.email,
            subject: options.subject,
            text: options.message
        }
        await transporter.sendMail(message)

}
module.exports = sendEmail