# DevTinder

## 27th Jan'25 - Monday
 - Add Tailwind
 - Add Daisy UI
  - Why ?
  - It gives lots of component.
- Add Navbar component to App.jsx


Body 
 Navbar
 Route = /  =>  FEED
 Route = /login  =>  Login
 Route = /connections  =>  Connections

## 28th Jan'25 - Tuesday

   ### Login
   - Make login page
   - Install axios
   - CORS - install cors in backend => add middleware width configuration
   - whitelist list the origin
   - Whenever making api call so pass axios  => {withCredentials: true}

   - Install Redux toolkit  , react redux 


## AWS - 30'JAN'25- THURSDAY
  
    - Sign up n AWS
    - Launch AWS instance
    - chmod 400 "DevTinder-Security-Secret.pem"
    - ssh -i "DevTinder-Security-Secret.pem" ubuntu@ec2-13-53-42-82.eu-north-1.compute.amazonaws.com
    - Install Node version
    - Clone Git code 
    - FRONTEND
      - now go to project, 
      - npm install
      - npm run build
      - ls
      -TO deploy or frontedn project we need NGINX
      - sudo apt update
      -sudo apt install nginx
      - sudo systemctl start nginx
      - sudo systemctl enable nginx
      - Copy code from dist to /var/www/html
         - sudo scp -r dist/* /var/www/html
      - enable port :80 of your instance - from AWS console


# Adding a custom Domain name | 31 JAN'25 FRIDAY
   - purchase domain name from godaddy
   - signup on cloudfare & add a new domain name
   - change the nameservers on godaddy and point it to cloudfare
   - wait for sometime till your nameservers are updated ~15 minutes
   - DNS record: A devtinder.in 
   - Enable SSL for website

# SENDING EMAILS via SES
   - Create a IAM user
   - Give access yo Amazon SES Full Access
   - Amazon SES : Create an Identity
   - Verify your domain name
   - Verify an email address 
   - Install AWS SDK -SES - USE v3



  
 