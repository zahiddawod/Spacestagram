# Spacestagram

Image-sharing from the final frontier

**An app for shopify summer 2022 front-end internship.**

## Intro

NOTE: Reviewers please check the `view/` folder for the frontend code.
A live version of the app can be found at <https://zd-spacestagram.herokuapp.com>.

## Running the project locally

1. Clone this repo `git clone https://github.com/zahiddawod/Spacestagram.git`
2. `cd Spacestagram` and run `npm run install-all`
3. Create a file at the root of the project named `.env` and copy the example of `.env.example`
4. Run `npm run dev` to start the app on `http://localhost:3000`

or

[<img src="https://codesandbox.io/static/banner-b3e4dc81348f7f65008a97a62f9125dd.png" target="_blank">](https://codesandbox.io/s/cranky-bash-pv7v9/)

## Current Features

- Infinite scrolling
- Instagram-theme UI
- Discovery page (random feed)
- Most popular feed
- Like/unlike picture
- Show loading state when waiting for backend to return data
- Hide/Report modal when clicking on three dots at the top of each card

## Project Structure

TypeScript (`.ts`) files live in the `src` folder and after compilation are output as JavaScript (`.js`) in the `dist` folder.
The `test` and `views` folders remain top level as expected.

> The full folder structure of this app is explained below:

| Name             | Description                                                                      |
| ---------------- | -------------------------------------------------------------------------------- |
| **src**          | Contains the source code that will be compiled to the `dist` dir for the backend |
| **src/utl**      | Utilty functions and other helper classes                                        |
| **src/schema**   | The graphql resolvers and schema layout                                          |
| **src**/app.ts   | Entry point to the express/apollo-server app                                     |
| **test**         | Contains all the backend tests.                                                  |
| **views**        | The frontend code (REACT)                                                        |
| .env.example     | Example of how your `.env` should look like including API keys, tokens, etc.     |
| .prettierrc.json | The config file for prettier extension on VS Code                                |
| jest.config.js   | Used to configure Jest running tests written in TypeScript                       |
| package.json     | File that contains npm dependencies as well as build scripts                     |
| tsconfig.json    | Config settings for compiling server code written in TypeScript                  |
| **views**/src    | Entry point for the react frontend code including components, apis, and contexts |
