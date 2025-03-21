//回復模板
module.exports = {
    defaultTemplate: {
      subject: "Re: ${subject}",
      body: "Hi ${name},\n\nThank you for reaching out to the ISTM office.Your email has been received and is currently under review.\nplease know that your message is important to us and we will get back to you as soon as possible.Thank you for your patience and understanding.\n\nBest,Regard\n\n${signature}"
    },
    visa: 
    {
        subject: "Re: ${subject}",
        body:"Hi ${name},\n\nThank you for reaching out to ISTM office regarding your visa inquiry. For detailed, up-to-date information on visa policies and requirements, please visit the official government website:\n\nhttps://www.immd.gov.hk/eng/faq/imm-policy-study.html\n\nWe recommend reviewing the information provided there, and if you have any further questions or need additional assistance, please do not hesitate to contact us again.\n\nBest regards,\n\n${signature}"
    },
    generalApplicationQuestions: {
        subject: "Re: ${subject}",
        body: "Hi ${name},\n\nThank you for your email. Regarding our admission condition, please note that our admissions process is rolling. We recommend a GRE score of at least 320 and a GMAT score of 600, along with strong English proficiency.\n\nYou can find the complete application details below:\n\nBest regards,\n\n${signature}"
    }
    

    };
   





      