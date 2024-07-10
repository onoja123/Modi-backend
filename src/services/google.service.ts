import axios from "axios";
import querystring from "querystring";
import { google } from 'googleapis';

type GoogleTokensResult = {
  access_token: string, 
  id_token: string, 
  token_type: string, 
  scope: string, 
  expiry_date: number,
}

type GoogleProfile = {
  id: string,
  email: string,
  verified_email: boolean,
  name: string,
  given_name: string,
  family_name: string,
  picture: string,
  locale: string,
}

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.APP_BASE_URL}/api/v1/auth/google/callback`
);

export default class GoogleService {
  private static OAUTH_TOKEN_URL = "https://oauth2.googleapis.com/token";
  private static PROFILE_URL = "https://www.googleapis.com/oauth2/v1/userinfo"
  private static CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  private static CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  private static REDIRECT_URL = `${process.env.APP_BASE_URL}/api/v1/auth/google/callback`


  static  getAuthorizationUrl(): string {
    const scopes = [
      "https://www.googleapis.com/auth/userinfo.profile", 
      "openid", 
      "https://www.googleapis.com/auth/userinfo.email"
    ];

    // Generate a url that asks permissions for the Drive activity scope
    const authorizationUrl = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',
      /** Pass in the scopes array defined above.
        * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
      scope: scopes,
      // Enable incremental authorization. Recommended as a best practice.
      include_granted_scopes: true
    });
    return authorizationUrl;
  }

  static async getOauthTokens(code: string): Promise<any> {
    try {
      const { tokens } = await oauth2Client.getToken(code);
      return tokens 

    } catch (err: any) {
      console.error("error getting tokens")
      console.log(err)
    }
  }

  static async getOauthTokensWithURL(code: string): Promise<any> {
    const values = {
      code, 
      client_id: this.CLIENT_ID,
      client_secret: this.CLIENT_SECRET,
      redirect_uri: this.REDIRECT_URL,
      grant_type: "authorization_code"
    }
    try {
      const response = await axios.post<GoogleTokensResult>(this.OAUTH_TOKEN_URL,querystring.stringify(values), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      } )
      
      return response.data 

    } catch (err: any) {
      console.error("error getting tokens")
      console.log(err)
    }
  }
  
  static async getProfile(accessToken: string, idToken:string): Promise<GoogleProfile | undefined> {
    try {
      const response = await axios.get<GoogleProfile>(`${this.PROFILE_URL}?alt=json&access_token=${accessToken}`, {
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      });
      return response.data
    } catch (error: any) {
      console.log("Error getting google profile");
      console.log(error)
    }
  }
}