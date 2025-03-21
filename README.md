The Gmail autoreply bot

Description:
Developed using Node.js, utilizes the Gmail API to automatically classify and respond to unread 
emails. It generates appropriate replies based on custom rules and templates. Label management 
and sender tracking mechanisms are implemented to prevent duplicate email processing

Libraries
googleapis This package, imported from the googleapis module, provides the necessary functionality to interact with various Google APIs, including the Gmail API.

OAuth2 The OAuth2 class from the google.auth module is used to authenticate the application and obtain an access token for making requests to the Gmail API. It also handles token refresh and retrying requests if necessary.

Getting Started
Prerequisites
Node.js should be installed on your system.

Git installed for cloning the repository.

Setting Up OAuth 2.0 Authentication
Create a Project:

Visit the Google Cloud Console and create a new project.

Provide a suitable name and click on the Create button.

Navigate to the Project Dashboard:

Click on your project name to enter the dashboard.

Access Credentials:

In the left sidebar, navigate to APIs & Services > Credentials.

Create OAuth Client ID:

Click on the Create credentials button and select OAuth client ID.

Choose Web application as the application type.

Provide a name for the OAuth 2.0 client ID.

In the Authorized redirect URIs field, add:

https://developers.google.com/oauthplayground
Obtain Client ID and Client Secret:

Click on Create. A modal will display your Client ID and Client Secret. Copy these values.

Also, ensure that the Gmail API is enabled for your project.

Use OAuth 2.0 Playground:

Open the OAuth 2.0 Playground.

Click on the settings (gear) icon at the top right.

In the OAuth 2.0 configuration section, enter the Client ID and Client Secret obtained earlier.

Under Step 1: Select & authorize APIs, input:

https://mail.google.com
and select the appropriate Gmail API scope.

Click Authorize APIs and sign in with the Google account associated with your target Gmail account.

After successful authorization, copy the authorization code displayed.

Click Exchange authorization code for tokens to receive a refresh token, and copy the refresh token.

Configure Your Application:

Open the credentials.js file in your project.

Replace the placeholder values with your obtained credentials:

CLIENT_ID → Your Client ID.

CLEINT_SECRET → Your Client Secret.

REDIRECT_URI → Your Redirect URI (e.g., https://developers.google.com/oauthplayground).

REFRESH_TOKEN → Your Refresh Token.

Save the file.
