# gmail_auto_reply
Auto_reply_gmail_api_app
This repository contains the Auto_reply_gmail_api_app, an application developed using Node.js and the Google APIs. The app automatically responds to emails sent to your Gmail account while you're away on vacation. It leverages the Gmail API and OAuth2 for secure communication with Google services and uses rule-based logic to select the appropriate reply template for each email.
Description
The app is designed to check your Gmail inbox at random intervals and automatically reply to emails that have not been previously responded to. In addition to basic auto-reply functionality, 
the app features:

Reply Templates: Dynamically generate personalized email responses using customizable templates.

Email Classification: Evaluate incoming emails against a set of predefined rules (based on subject and body content) to determine which response template to use.

Labeling: Automatically adds a custom label (e.g., "auto_reply") to processed emails and marks them as read to prevent duplicate responses.

Node.js Clusters Support: Optimizes performance by leveraging Node.js cluster functionality, making it scalable for high-volume Gmail accounts.

Random Interval Checks: Emails are checked every 45 to 120 seconds (randomized) to add variability and avoid predictable patterns.

Features
Automatic Email Retrieval: Periodically checks a Gmail ID for new, unread emails.

Rule-Based Email Classification: Uses regular expressions and condition matching to categorize emails based on their subject and body content.

Dynamic Reply Templates: Customizes reply subjects and bodies using placeholders such as ${subject}, ${name}, and ${signature}, ensuring each auto-response feels personal.

Prevention of Duplicate Replies: The system verifies if an email thread or sender has already been replied to.

Email Labelling and Management: Applies a custom label to each processed email and removes the "UNREAD" status to avoid processing the same email again.

Flexible Execution Intervals: Periodic execution occurs at random intervals (45 to 120 seconds) to mimic natural checking periods.

Secure OAuth2 Authentication: Uses Google's OAuth2 to manage application authentication, token refresh, and secure API access.

Libraries
googleapis:

Provides necessary functionality to interact with various Google APIs, including Gmail.

OAuth2 (from google.auth):

Handles authentication, access token management, and token refresh when interacting with the Gmail API.

Getting Started
Follow the steps below to set up the OAuth 2.0 authentication for your application and get the app running on your local machine.

Create a Project in Google Cloud Console:

Go to Google Cloud Console and create a new project. Provide a suitable name and click "Create."

Enable the Gmail API:

After creating your project, navigate to the project dashboard, click on the "APIs & Services" section in the left sidebar, and then click on "Library." Search for the Gmail API and enable it.

Set Up OAuth 2.0 Credentials:

In the left sidebar under "APIs & Services," click "Credentials."

Click "Create credentials" and select "OAuth client ID."

Choose "Web application" as the application type, give it a name, and add the authorized redirect URI. For testing purposes, you can use https://developers.google.com/oauthplayground.

Click "Create" to generate your client ID and client secret. Copy these values.

Configure OAuth 2.0 Playground:

Open the OAuth 2.0 Playground.

Click on the gear (settings) icon in the upper right and input your OAuth 2.0 client ID and client secret.

In "Step 1: Select & authorize APIs," enter https://mail.google.com and select the appropriate Gmail API scope.

Click "Authorize APIs." Sign in with the Google account corresponding to the Gmail account you want to auto-reply.

Once authorized, the OAuth 2.0 Playground will display an authorization code. Copy it.

Click "Exchange authorization code for tokens" to obtain a refresh token. Copy the refresh token value.

Configure the Application:

In the project directory, locate the credentials.js file.

Replace the placeholder values with your obtained values:

CLIENT_ID → Your client ID.

CLEINT_SECRET → Your client secret.

REDIRECT_URI → Your redirect URI (e.g., https://developers.google.com/oauthplayground).

REFRESH_TOKEN → Your refresh token.

Save the changes in credentials.js.

Clone and Run the Repository:

Clone the repository:

bash
git clone https://github.com/your-username/Auto_reply_gmail_api_app.git
cd Auto_reply_gmail_api_app
Install the required packages:

bash
npm install
Start the application:

bash
node app.js
The app will now start checking your Gmail inbox at randomized intervals (between 45 to 120 seconds) and send auto-replies according to the configured rules and templates.

Customization
Reply Templates: Edit or add your reply templates in the replyTemplates.js file. You can customize the subject and body content by using placeholders like ${subject}, ${name}, and ${signature}.

Email Classification Rules: Update the rules in the classrule.js file. These rules determine which template to use based on the email’s subject and body content. You can add, remove, or modify rules by adjusting regular expressions and conditions as needed.

Conclusion
This application is a flexible solution for managing email auto-responses while you are unavailable. Its rule-based classification and dynamic reply capabilities ensure that each email is handled in a personalized and efficient manner. Whether you’re on vacation or simply need an automated assistant for your Gmail account, Auto_reply_gmail_api_app offers a robust, secure, and easy-to-configure solution.

Feel free to explore, customize, and extend the functionalities. If you have suggestions or need further assistance, the community is here to engage in deep conversations and help you innovate further!
