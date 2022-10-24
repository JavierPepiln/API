import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({
    
    })
  }
  
  /*private url = 'https://apiqrcodeapi.azure-api.net/v1/encrypt?passwordname=Hola'*/

  private url_encrypt: string = "https://apiqrcodeapi.azure-api.net/v1/encrypt?passwordname="

  private url_hash: string = "https://apiqrcodeapi.azure-api.net/v1/ValidateHash?"
  private passwordInput: string = "passwordname="
  private passwordDatabase: string = "dbregisteredpass="

  private _url = "https://apiqrcodeapi.azure-api.net/v1/qrGenerator?email="

  private _url_qr = "https://apiqrcodeapi.azure-api.net/v1/validateCode?"
  private _url_email = "email=";
  private _url_code = "code=";

  private UrlGoogleCode = "https://apiqrcodeapi.azure-api.net/v1/GoogleAuthCode?varProjUrl=https://oauth2.googleapis.com/&"
  private googleCode = "varCode="
  private googleClientId = "varClientId="
  private googleClientSecret = "varClientSecret="
  private googleRedirectURI = "varRedirectUri="

  private _url_info_user = "https://www.googleapis.com/oauth2/v1/userinfo?"
  private info_user = "access_token="

  private UrlSocialAccount = "https://apiqrcodeapi.azure-api.net/v1/SocialAccount?"
  private socialAccount = "OAuthUri="
  private socialClientId = "varClientId="
  private socialRedirectURI = "varRedirectUri="

  private URL_MICROSOFT = "https://login.microsoftonline.com/common/oauth2/v2.0/token"

  private URL_SPA_MICROSOFT = "https://apiqrcodeapi.azure-api.net/v1/MicrosoftOAuth?"
  private SPA_clientId = "varClientId="
  private SPA_redirectURI = "varRedirectUri="

  private URL_INFO = "https://graph.microsoft.com/v1.0/me"
  
  constructor(private http: HttpClient) { }


  getEncryptPass(pass:string) {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    // return this.http.get(`${this.url_encrypt}${pass}`, { headers, responseType: 'text'})
    return this.http.get(this.url_encrypt+pass, { headers, responseType: 'text'})
  }

  getValidatePass(pass:string, dbpass:string) {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    // return this.http.get(`${this.url_hash}${this.passwordInput}${pass}&${this.passwordDatabase}${dbpass}`,  {responseType: 'text'} )
    return this.http.get(`${this.url_hash}${this.passwordInput}${pass}&${this.passwordDatabase}${dbpass}`,  {responseType: 'text'} )
  }

  getBarcodeByEmail(email:string){
    return this.http.get(this._url + email, {responseType: 'text'});
  }

  getValidateCode(correo:string, code:string) {
    return this.http.get(`${this._url_qr}${this._url_email}${correo}&${this._url_code}${code}`, {responseType: 'text'})
  }

  getGoogleAuthCode(none:string, code:string, clientId:string, clientSecret:string, redirectUri:string ) {
    return this.http.get(`${this.UrlGoogleCode}${this.googleCode}${code}&${this.googleClientId}${clientId}&${this.googleClientSecret}${clientSecret}&${this.googleRedirectURI}${redirectUri}`, {responseType: 'text'})
  }

  googleGetToken(url:string) {
    return this.http.post(url, {responseType: 'text'})
  }

  getInfoGoogleUser(token:string) {
    return this.http.get(`${this._url_info_user}${this.info_user}${token}`)
  }

  getSocialAccount(social:string, clientId:string, redirectURI:string) {
    return this.http.get(`${this.UrlSocialAccount}${this.socialAccount}${social}&${this.socialClientId}${clientId}&${this.socialRedirectURI}${redirectURI}`, {responseType: 'text'})
  }


  getMicrosoftAuthCode(code:string) {
    
    // const header = {}
    // return this.http.post(this.URL_MICROSOFT,  {grant_type:'authorization_code',
    //                                                 code:code,
    //                                                 client_secret:'Y5M8Q~wcaIsoj4R07jcr8nqPzMOg~YHVqM9lxcjz',
    //                                                 client_id:'6602f94a-3574-4b4e-b53b-fb91200de84b',
    //                                                 scope:'https://graph.microsoft.com/User.Read',
    //                                                 redirect_uri:'http://localhost:4200/signin-microsoft'}, {responseType: 'text'})



    // const headers = new HttpHeaders()
    // .append(
    //   'Content-Type',
    //   'application/json'
    // );

    // const body= {}
    
    // const params = new HttpParams()
    //   .append('grant_type', 'authorization_code')
    //   .append('code', code)
    //   .append('client_secret','Y5M8Q~wcaIsoj4R07jcr8nqPzMOg~YHVqM9lxcjz')
    //   .append('client_id', '6602f94a-3574-4b4e-b53b-fb91200de84b')
    //   .append('scope', 'https://graph.microsoft.com/User.Read' )
    //   .append('redirect_uri', 'http://localhost:4200/signin-microsoft')
    
    // return this.http.post(this.URL_MICROSOFT, body, {headers:headers, params:params})]

    let header = new Headers();

    header.append('Origin', 'http://localhost')

    let body = new FormData()
    body.append('grant_type','authorization_code');
    body.append('code', code);
    // body.append('client_secret','Y5M8Q~wcaIsoj4R07jcr8nqPzMOg~YHVqM9lxcjz');
    body.append('client_id','6602f94a-3574-4b4e-b53b-fb91200de84b');
    body.append('scope','https://graph.microsoft.com/User.Read');
    body.append('redirect_uri','http://localhost:4200/signin-microsoft');
    body.append('code_verifier', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855')

    return this.http.post(this.URL_MICROSOFT, body, this.httpOptions)
  }

  spaMicrosoftAuth(clientId:string, redirectURI:string) {
    return this.http.get(`${this.URL_SPA_MICROSOFT}${this.SPA_clientId}${clientId}&${this.SPA_redirectURI}${redirectURI}`, {responseType: 'text'})
  }

  getInfoUserMicrosoft(token:string):Observable<any>{

    var httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }

    // const headers = new Headers({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`
    // })

    return this.http.get(this.URL_INFO, httpOption)
  }

  



  
}
