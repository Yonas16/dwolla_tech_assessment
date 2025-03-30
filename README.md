# Dwolla Software Engineering Intern Technical Assessment

Thank you for applying to be one of our interns this summer! You've made it past the initial resume screen and now we want to see what you can do!

Please complete this technical assessment as outlined below. The assessment is not timeboxed, but we've scoped it to a couple hours or less. Please complete it within 3 days and email a link to your solution to [cfinholt@dwolla.com & jgens@dwolla.com](mailto:cfinholt@dwolla.com,jgens@dwolla.com) for review

## Scenario

You are to build out a page that lists all existing customers in a table and a dialog that can be used to add a new customer to that list. Please try to match the following mock-ups as closely as possible

### List

Recommended MUI Component: [Table](https://mui.com/material-ui/react-table/)
![List Mock-up](/mocks/list.png)

### Dialog

Recommended MUI Component: [Dialog](https://mui.com/material-ui/react-dialog/)
![Dialog Mock-up](/mocks/dialog.png)

## Additional Instructions

- Your starting point should be `src/pages/index.tsx`, which already provides a basic structure and an API call to get the list of customers
- API endpoints have been provided, which should be used for getting the list of customers and adding new ones. You can reference `src/pages/api/customers.ts` for details, but you should not have to make changes to that file as part of this exercise
- Use [Material UI](https://mui.com/material-ui/all-components/) components
- Use of [Material UI's sx prop](https://mui.com/system/getting-started/the-sx-prop/) for styling is encouraged, but not required
- You are welcome to use AI tools to assist you (we do!), but please be prepared to explain your design choices and the code that you submit in a follow-up interview with the hiring manager

## Setup

**Important Note:** Do NOT fork this repository

1. Use this template to create a new repository so that your solution lives on your own GitHub profile (click `Use this template` → `Create a new repository`)
2. Install the latest LTS version of [Node](https://nodejs.org/en) on your machine. If you use [Node Version Manager](https://github.com/nvm-sh/nvm) on Mac/Linux, run `nvm install`
3. Run `npm ci` to install dependencies
4. Run `npm run seed` to get a starting point for your customers data (this can be re-run if the data file gets messed up somehow)
5. Run `npm run dev` to start the server
6. In a browser, navigate to `http://localhost:3000`

## Submitting

1. Complete the assessment sometime within the next 3 days
2. Push your solution to your repo
3. Make sure that your repo is public
4. Email [cfinholt@dwolla.com & jgens@dwolla.com](mailto:cfinholt@dwolla.com,jgens@dwolla.com) a link to your repo so that we can review it
