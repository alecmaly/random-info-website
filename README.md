# Info
This project gets random information for learning purposes.

Navigating to the [Site Hosted in Azure](https://random-info-website.azurewebsites.net/) will result in random info.



# Send email
To send an email, send a post request with email and password. 
This endpoint will send an email of random data given proper email credentials
```
POST /sendEmail
```
Headers
```
Content-Type: application/json
```
Body
```
{
    emailAddress: "alecjmaly@gmail.com",
    emailPassword: "vfc..wgjs"
}
``` 

## Example curl request (Windows) to trigger email
Example, using Gmail and [App-Specific Password](https://support.google.com/accounts/answer/185833?hl=en)

```
    curl -H "Content-Type: application/json" -d "{\"emailAddress\": \"alecjmaly@gmail.com\",\"emailPassword\": \"vfc..wgjs\"}" -X POST https://random-info-website.azurewebsites.net/sendEmail
```


## Dependencies
- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://docs.docker.com/)

## To build in Azure
Clone Repo, Dockerize (command below), then host in Azure - App Service
``` 
npm run dockerize
```




