# License Appointment System

This project will help people to apply for License and renew Appointment.

## Prerequisits

- Should have node envirnment installed into your computer
- node version should be > 10

## How to run

#### Clone the repo and run

```http
 npm install or npm i
```

#### To run the project

```http
  npm run dev
```

#### To run the test cases.

```http
  npx playwright test --headed
```

#### To run the test cases of particular file where replace integration.spec.ts with any file name.

```http
  npx playwright test integration.spec.ts --headed

```

## Deployment

Deployed Url of project

```bash
  https://license-appointment-system.vercel.app/
```

## Environment Variables

DB_URL=mongodb+srv://Avishekh:Avishekh@cluster0.7zaq6ti.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0

CLOUDINARY_UPLOAD=evwmejyu
CLOUD_NAME=dzg8istiw
API_SECRET=Ml89bVVu8hx89fWKM-Zo3v97Dcc
API_KEY=347896473673845

EMAIL=licenseappointmant@gmail.com
PASSOWRD=mfgxreslwfjljabf

VERIFY_URL=http://localhost:3000/verify/

JWT_SECRET=thisissecret454567877@45
NEXTAUTH_SECRET=aslkdjsalkdfasdf80980
BASE_URL=http://localhost:3000
API_URL=http://localhost:3000/api/
KHALTI_RETURN_URL=http://localhost:3000/payment/verify/
KHALTI_SECRET_KEY=a558b8820fa84abca6fd20cf6c51a0f0
FLASK_SERVER=http://127.0.0.1:5000
