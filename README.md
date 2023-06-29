# Google Apps Script - Send Email

> A better form submission notification message for [Google Apps Script](https://developers.google.com/apps-script/reference/) Form and Spreadsheet projects. 

This project is aimed at users who use Google Spreadsheets to collect Google Form response data, and want more informative notifications when a new form is submitted. This project intends to be a replacement for the default [Google Sheet edit notifications](https://support.google.com/docs/answer/91588?hl=en&co=GENIE.Platform%3DDesktop) by providing the full form submission in the email notification. 

This script has been used across several long-term Google Apps Script projects and is fairly robust, however please review the docs and submit an issue if you encounter any bugs. 

## Documentation

[View the documentation here](/docs/README.md)

## Installation

Install via `npm`:

```shell-session
npm install google-apps-script-send-email
```

## Usage

Add your project info to [the configuration file](/config.js)

```javascript
// Sample configuration 
const config = {
  admin: "rstevens@example.com",
  formName: "Site Survey",
  recipient: [ 
      "marketing@example.com",
      "ceo@example.com
    ]
  emailFooter: "<br />This is an automated message, do not reply",
  sheetId: "1234567890abcdef,
  sheetNameFilter: " Responses",
  subjectFilter: "New Submission: ",
  sheetInfo: {
    firstCol: "A",
    lastCol: "R", 
    // the lastRow parameter does not need to be edited
    lastRow: activeSpreadsheet.getLastRow(), 
  },
}
```

Run the `sendEmail` function as an [installable trigger](https://developers.google.com/apps-script/guides/triggers/installable#google_apps_triggers). You may also `import` [sendEmail.js](/sendEmail.js) into another file in your Google Apps Script project. 
