**The Gmail autoreply bot**

**Description:**
Developed using Node.js, utilizes the Gmail API to automatically classify and respond to unread 
emails. It generates appropriate replies based on custom rules and templates. Label management 
and sender tracking mechanisms are implemented to prevent duplicate email processing

**Features**

  1.Gmail API Integration: Utilizes the googleapis package to interact seamlessly with various Google APIs, including the Gmail API.

  2.OAuth2 Authentication: Implements secure authentication via the OAuth2 class from the google.auth module, which handles token refresh and retries automatically.

  3.Rule-Based Email Classification: Analyzes incoming emails using a set of customizable rules (e.g., regex matching on subject and body) to determine the appropriate response template.

  4.Dynamic Reply Generation: Generates personalized email replies by injecting details (such as the sender’s email and original subject) into pre-defined templates.

  5.Thread and Label Management: Checks email threads for prior replies to avoid duplication, and applies custom labels (e.g., "auto_reply") while marking messages as read.

  6.Randomized Interval Checks: Leverages a randomized interval mechanism to periodically check for new, unread emails, simulating a more natural load. (Note: Future improvements may include using cron jobs for scheduling.)

  7.Extensible and Improvement-Focused: The code includes comments highlighting potential areas for enhancement, such as better error handling, code efficiency for large volumes, secure credential storage, and user-specific configuration options.

**Libraries**
googleapis:
Imported from the googleapis module. Provides functionality to interact with Google APIs, including the Gmail API.
OAuth2 Class:
  1.From the google.auth module.
  2.Handles authentication, token refresh, and retrying requests.
  3.Used to obtain an access token for the Gmail API.

**Getting Started**
Follow these steps to set up OAuth 2.0 authentication for your application:

**Step-by-Step Setup**
1. Configure Google Cloud Console
    Create a Project:
    Go to the Google Cloud Console.

    Click Create Project → Name your project → Click Create.

    Enable the Gmail API:

    In the project dashboard, go to APIs & Services → Library.

    Search for Gmail API → Click Enable.

    Create OAuth 2.0 Credentials:

    Navigate to APIs & Services → Credentials.

    Click Create Credentials → OAuth client ID.

    Select Web Application as the application type.

    Under Authorized redirect URIs, add: **https://developers.google.com/oauthplayground**

**2. Use OAuth 2.0 Playground**
  Configure Playground:
    Open the OAuth 2.0 Playground.
  
    Click the gear icon (⚙️) → OAuth 2.0 Configuration.
  
    Check Use your own OAuth credentials.
    
    Enter your Client ID and Client Secret → Click Close.
    
    Authorize Gmail API:
    In Step 1, enter the scope: https://mail.google.com/
    
    Click Authorize APIs.
    
    Sign in with the Google account linked to your target Gmail.
    
    Approve the permissions when prompted.
    Generate Tokens:
    
    In Step 2, click Exchange authorization code for tokens.
    
    Copy the generated Refresh Token.

**3. Update credentials.js**
Replace the placeholders in your credentials.js file with the values from the previous steps:
module.exports = {
  CLIENT_ID: 'YOUR_CLIENT_ID',
  CLIENT_SECRET: 'YOUR_CLIENT_SECRET',
  REDIRECT_URI: 'https://developers.google.com/oauthplayground',
  REFRESH_TOKEN: 'YOUR_REFRESH_TOKEN'
