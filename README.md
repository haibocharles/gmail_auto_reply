**The Gmail autoreply bot**

**Description:**
Developed using Node.js, utilizes the Gmail API to automatically classify and respond to unread 
emails. It generates appropriate replies based on custom rules and templates. Label management 
and sender tracking mechanisms are implemented to prevent duplicate email processing

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
