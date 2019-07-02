echo 'postbuild.sh running'

echo "Running ng build command"
ng build --prod
xcopy dist/msal-example/* .