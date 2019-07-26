# MsalExample

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.  

This project is based on the MSAL example projects which are available [here](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-angular/samples). The MSAL-Angular documentation is very helpful as well for anyone getting started and can be found [here](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/README.md).

## Get Started
Use the following instructions to clone and experiment with this project

1. Begin by cloning the git repository to your development machine 
    git clone https://github.com/dmcwee/msaldemo.git
1. Run `npm install` in the folder where the repository was cloned
1. Register your application with Azure AD using [these instructions](https://docs.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-javascript-spa#register-your-application)
1. Grant this application `user.read` and `user.read.all` permissions
1. Update the `Msaldemocfg.ts` file to include your clientID and Tenant Name with your application registration information
```javascript
export const MSALDemoCfg = {
  // This comes from your Azure AD Application registration settings authority
  clientID:'[YOUR CLIENT ID HERE]',
  
  // This can by your *.onmicrosoft.com tenant name
  authority: "https://login.microsoftonline.com/[YOUR TENANT NAME HERE]" 
}
```
1. Run `ng serve` to begin your application and browse to http://localhost:4200/ 

### Known Issue
1. After login the AAD List Link and Welcome {username} values do not show so the user must refresh the browser

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
E2E is not currently enabled in this project.

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

v: 0.1
