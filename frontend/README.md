<h1>A Full Stack Online Banking Web Application</h1>

## Description

This is a complete comprehensive online baking web application having essential features like New Customer Registration, Authentication, Money Transfer, Modification of Account Details, and Viewing your Transaction History.

### Usage/Flow
1. `Register` as a new Customer.
2. Login to your account. Account will have an initial balance of `RM100`.
3. Bank `Account Number` and `idNo` are assigned using UUID. Also they cannot be modified along with the `login ID`.
4. You can view your account details in `Account Summary`, make transactions, and edit account details.
5. To view your recent transactions, click `Transactions` on the Nav Bar.
6. `Logout` 

## Deployment Guide

1. Install Amazon AWS CLI:<br>
`msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi`

2. Download and Install Terraform for your respective OS.
 - Set ENVIRONMENT VARIABLE
 - Configure globally

3. Create a bucket on S3.

4. Set region, access key, and secret key.

5. Create Runner on Gitlab and configure in CI/CD Pipelines.

6. Run `npm run build` to prepare the project for deployment.

6. Run `aws s3 cp . s3://sadfgh --recursive` from the 'build' directory and access the assigned URL.

## How to Run Locally

Install node version 16 and above.

### `npm install`

Installs the necessary dependencies.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
