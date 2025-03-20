//imported required packages
/*1.googleapis: This package is imported from the googleapis module and provides the necessary functionality to interact with various Google APIs, including the Gmail API.

  2.OAuth2: The OAuth2 class from the google.auth module is used to authenticate the application and obtain an access token for making requests to the Gmail API. It handles token refresh and retrying requests if necessary.*/
  //import modules
// Imported required packages and modules.
const { google } = require("googleapis");
const rules = require('./classrule');
const templates = require('./replyTemplates');
const {
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI,
  REFRESH_TOKEN,
} = require("./credentials");

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Check if the email meets a rule
function checkmeetrule(subject, body) {
  for (const rule of rules) {
    let match = true;
    for (const condition of rule.conditions) {
      if (condition.field === "subject" && !condition.match.test(subject)) {  //.test 表示是否符合正則表達式條件
        match = false;
        break;
      }
      if (condition.field === "body" && !condition.match.test(body)) {
        match = false;
        break;
      }
    }
    if (match) {
      return rule.name;
    }
  }
  return "null";
}

// Extract email body
function getEmailBody(payload) {
  const parts = payload.parts || [];
  for (const part of parts) {
    if (part.mimeType === 'text/plain' && part.body && part.body.data) {//從 payload 對象中提取 parts 屬性。如果 parts 不存在，則使用空數組 [] 作為備選值，是否為純文本格式
      return Buffer.from(part.body.data, 'base64').toString('utf-8');
    }
  }
  return '';
}

async function checkEmailsAndSendReplies() {
  const repliedUsers = new Set(); //已經回復的人
  try {
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
  
    const res = await gmail.users.messages.list({
      userId: "me",
      q: "is:unread",
    });
    const messages = res.data.messages;
  
    if (messages && messages.length > 0) {  // Valid emails exist
      for (const message of messages) {
        const email = await gmail.users.messages.get({
          userId: "me",
          id: message.id,
        });
  
        // Extract headers
        const fromHeader = email.data.payload.headers.find(header => header.name === "From");
        const toHeader = email.data.payload.headers.find(header => header.name === "To");
        const subjectHeader = email.data.payload.headers.find(header => header.name === "Subject");
  
        // Use descriptive variable names
        const senderEmail = fromHeader ? fromHeader.value : "";
        const recipientEmail = toHeader ? toHeader.value : "";
        const subject = subjectHeader ? subjectHeader.value : "";
  
        console.log("Email received from:", senderEmail);
        console.log("To Email:", recipientEmail);
  
        const body = getEmailBody(email.data.payload);
  
        if (repliedUsers.has(senderEmail)) {//if already reply the mail
          console.log("Already replied to:", senderEmail);
          continue;
        }
  
        // Check if the email has any replies
        const thread = await gmail.users.threads.get({//通過message.threadId獲取整個綫程的所有郵件，用slice（1)排除原始郵件 只保留回復記錄，判斷是否已經進行或自動回復
          userId: "me",
          id: message.threadId,
        });
  
        const replies = thread.data.messages.slice(1);//thread.data.messages 會返回一個郵件消息的數組，其中包含該線程中的所有郵件使用 slice(1) 方法從數組中提取從第二個消息開始的所有消息（即，排除第一條消息，通常是原始郵件
  
        if (replies.length === 0) {
          // Classify the email based on subject and full body
          const category = checkmeetrule(subject, body);
          const template = templates[category] || templates.defaultTemplate;
  
          // Generate reply subject and body from template
          const replySubject = template.subject.replace("${subject}", subject);
          const replyBody = template.body.replace("${name}", senderEmail).replace("${signature}", "ISTM office");
  
          // Send reply email using the updated createReplyRaw accepting extra parameters
          await gmail.users.messages.send({
            userId: "me",
            requestBody: {
              raw: await createReplyRaw(recipientEmail, senderEmail, subject, replySubject, replyBody),
            },
          });
  
          // Label the email to indicate processing
          const labelName = "auto_reply";//加入標簽
          await gmail.users.messages.modify({
            userId: "me",
            id: message.id,
            requestBody: {
              addLabelIds: [await createLabelIfNeeded(labelName)],
              removeLabelIds:["UNREAD"]//移除未讀標簽 避免重複寄送
            },
          });
  
          console.log("Sent reply to:", senderEmail);
          repliedUsers.add(senderEmail);
        }
      }
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

// Updated createReplyRaw to accept dynamic subject and body
async function createReplyRaw(from, to, originalSubject, replySubject, replyBody) {
  const finalSubject = replySubject || `Re: ${originalSubject}`;
  const emailContent = `From: ${from}\nTo: ${to}\nSubject: ${finalSubject}\n\n${replyBody}`;
  const base64EncodedEmail = Buffer.from(emailContent)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return base64EncodedEmail;
}

async function createLabelIfNeeded(labelName) {
  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
  const res = await gmail.users.labels.list({ userId: "me" });
  const labels = res.data.labels;
  const existingLabel = labels.find(label => label.name === labelName);
  
  if (existingLabel) {
    return existingLabel.id;
  }
  
  const newLabel = await gmail.users.labels.create({
    userId: "me",
    requestBody: {
      name: labelName,
      labelListVisibility: "labelShow",
      messageListVisibility: "show",
    },
  });
  
  return newLabel.data.id;
}

function getRandomInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Run the email checking function at random intervals
setInterval(checkEmailsAndSendReplies, getRandomInterval(1, 10) * 1000);

  
  /*note on areas where your code can be improved.
    1.Error handling: The code currently logs any errors that occur during the execution but does not handle them in a more robust manner.
    2.Code efficiency: The code could be optimized to handle larger volumes of emails more efficiently.
    3.Security: Ensuring that sensitive information, such as client secrets and refresh tokens, are stored securely and not exposed in the code.
    4.User-specific configuration: Making the code more flexible by allowing users to provide their own configuration options, such as email filters or customized reply messages.
    These are some areas where the code can be improved, but overall, it provides implementation of auto-reply functionality using the Gmail API.
    5.Time Monitoring: The code currently use randominterval function to generate seconds and in this code can be improved by adding cron jobs package to schedule email tasks 
  */