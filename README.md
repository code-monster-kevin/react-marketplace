This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Setup keycloak as the authentication server
https://www.keycloak.org

This test is using the standalone configuration.
Update public/keycloak.json according to your own installation of keycloak.

References:
https://blog.scalac.io/user-authentication-with-keycloak-part1.html
https://www.keycloak.org/docs/latest/server_installation/index.html#setting-up-https-ssl

If keycloak is not using SSL, on Chrome, you will have to manually allow
"this page is trying to load scripts from unauthenticated sources" to see the authenticated page.

