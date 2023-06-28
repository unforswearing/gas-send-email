/**
 * ## Sending Email  
 * Please see the documentation for `const config` below for a description of
 * required parameters.
 * 
 * @author unforswearing
 * @module sendEmail
 * @see {@link module:emailConfig~config|config}
 */

import config from "./config";

/**
 * Get the spreadsheet object for the active spreadsheet.
 * Uses the Apps Script class `SpreadsheetApp` 
 * @constant {Object} 
 * @private
 * */
const activeSpreadsheet = SpreadsheetApp.getActiveSheet();

/**
 * Use the `activeSpreadsheet` object to retrieve the name
 * of the current sheet via the `getName()` method.  
 * @constant {string} 
 * @private
 * */
const sheetName = activeSpreadsheet.getName();

/**
 * A method to retrieve the letter of the last used column
 * in the spreadsheet. 
 * @function getLastColumnletter 
 * @example 
 * let lastCol = getLastColumnLetter()
 * @return {string} The last column letter as a string.
 * @private
*/
const getLastColumnLetter = function getLastColumnLetter() {
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  var alphaLen = alphabet.length;
  var col = spreadsheet.getLastColumn();

  if (col <= alphaLen) return alphabet.splice(col - 1, 1).toString();

  var firstLetter = alphabet[Math.floor(col / alphaLen) - 1];
  return `${firstLetter}${alphabet.splice(col % alphaLen, 1).toString()}`;
};

/**
 * The parameters in this `procParams` object will default to the
 * imported config file, calculating information from the active
 * sheet only where necessary. 
 * @name procParams
 * @requires emailConfig.config
 * @property {string} data.admin admin will receive error notifications
 * @property {string} data.formName 
 * @property {string} data.recipient 
 * add any recipient email addresses here. these may be single
 * addresses or an array of quoted addresses. 
 * @property {string} data.emailFooter
 * `emailFooter` specifies the html string to be used in the emails
 * that are sent from this script. Leave blank if you do not require
 * an email footer
 * @property {string} data.sheetId
 * Property `sheetID` is required for this script to work properly
 * Properties `formName` and `sheetId` will be extracted from
 * `const formName` and `const sheet`
 * @property {string} data.sheetNameFilter 
 * used to extract the form name from the sheet name.
 * the 'responses' default is typical for most forms.
 * @property {string} data.subjectFilter
 * `subjectFilter` is used to create the email subject from the sheet name.
 * the text in the subjectFilter will be added to the sheet name
 * to generate an email subject. if you do not want the additional
 * text in the email title you can leave this section blank -- use ''
 * NOTE the modifications above have not yet been tested (as of 2/16/2021)
 * @property {{firstCol: string, lastCol: string, lastRow: number}} data.sheetInfo
 * The first column is set to 'A' by default. To use a different first column
 * modify the `firstCol` parameter to another column in your sheet. 
 * */
let procParams = {
  data: {
    admin: config.admin,
    formName: config.formName | sheetName.replace(" (Responses"),
    recipient: config.recipient,
    emailFooter: config.emailFooter | "",
    sheetId: config.sheetId | activeSpreadsheet.getSheetId(),
    sheetNameFilter: config.sheetNameFilter | ` (Responses)`,
    subjectFilter: config.subjectFilter | " Form Submission",
    sheetInfo:
      config.sheetInfo |
      {
        firstCol: "A",
        lastCol: getLastColumnLetter(),
        lastRow: activeSpreadsheet.getLastRow(),
      },
  },
};

/**
 * ## Using the `sendEmail()` function 
 * 'sendMail()` is the main runner function. Be sure to add this functiom
 * as an **installable trigger** in your project. See {@link https://developers.google.com/apps-script/guides/triggers/installable#google_apps_triggers|the installable triggers documentation} for more information.
 * ### Debugging 
 * sendEmail(true) to send all notifications to 'admin' for testing. 
 * The `debugRunner` function is equivalent to running `sendMail(true)` - 
 * all actions between debugRunner and sendMail(true) are equivalent. 
 * Both functions will send all runtime notifications to the email 
 * address listed in `procParams.data.admin` instead of the recipient 
 * listed in `procParams.data.recipient`. This is most useful for testing. 
 * @function sendMail
 * @argument {boolean} debug specify whether the script should send errors to `admin`
 * @returns {void} 
 * */
function sendMail(debug) {
  /* create the helper object **/
  var parameters = procParams;

  /** 
   * extract helper code and info from procParams (var parameters)
   * assumption: parameters.helper contains an object of helper vars / funcs
   * var helper = parameters.helper;
  * */
  var data = parameters.data;
  var id = data.sheetId;
  /** open the sheet for parsing */
  var sheet = SpreadsheetApp.openById(id);

  /** sheetInfo = { firstCol: ..., lastCol: ... } */
  var sheetInfo = data.sheetInfo;

  // Get the latest response range as text
  sheetInfo.rangeString = `${sheetInfo.firstCol}${sheetInfo.lastRow}:${sheetInfo.lastCol}${sheetInfo.lastRow}`;

  // use the response range to get the questions from row 1
  // if your questions are in a different row or column
  // change 'A1' to the location of the cell containing the first question
  // replace the '1' in 'sheetInfo.lastCol with the number of the row
  // containing the last question.
  sheetInfo.questionString = `A1:${sheetInfo.lastCol + 1}`;

  // get the values for question and latest response ranges
  // @todo could this be done in a better way? (prolly)
  sheetInfo.questions = sheet.getRange(sheetInfo.questionString).getValues()[0];

  sheetInfo.submissionData = sheet
    .getRange(sheetInfo.rangeString)
    .getValues()[0];

  // only shorten timestamps if the timestamps array has a value
  if (data.timestampsArray.join("")) {
    for (var n in data.timestampsArray) {
      // tsi === time stamp index
      var tsi = data.timestampsArray[n];

      // change the date formatting if needed
      sheetInfo.submissionData[tsi] = Utilities.formatDate(
        sheetInfo.submissionData[tsi],
        Session.getScriptTimeZone(),
        "M/d/yyyy h:mm a"
      ).toString();
    }
  }

  // create the submission info table and styles for html emails
  // table rows will be pushed to the dataTable column in the loop below
  var dataTable = [];
  var tdstyle = 'style="padding:7px;"';

  // loop through the submissionData to create a table of questions and answers
  for (var i in sheetInfo.submissionData) {
    var answer = sheetInfo.submissionData[i];
    var question = sheetInfo.questions[i];

    // add the generated row to the dataTable array
    dataTable.push(
      `<tr><td align="right" ${tdstyle}><b>${question}</b></td><td align="left"  ${tdstyle}>${answer}</td></tr>`
    );
  }

  // add styles for full table and nest the dataTable rows in table tags
  var tablestyle = 'style="width:80%;padding:7px;"';
  dataTable = `<table ${tablestyle}>${dataTable.join("")}</tables>`;

  // Use admin email address if debug is true, otherwise use the script default
  var recipient = debug === true ? data.admin : data.recipient();

  // create email subject
  var sheetName = sheet.getName().replace(data.sheetNameFilter, "");
  var subject = sheetName + data.subjectFilter;

  // add a company logo if desired. otherwise, comment out the two lines below
  // @todo logo can probably be added to procParams - logo = procParams.logo || '';
  var logo = undefined;
  logo = `<img src="${logo}" width="120px" height="80px">`;

  // create the email body
  var emailFooter = parameters.emailFooter;

  var body = `${logo}<br><br>
    'Hello,<br><br>'${sheetName} form was submitted on ${sheetInfo.submissionData[0]}. 
    Please find the submitted information below.<hr><br>${dataTable}<br><br><br><br>${emailFooter}`;

  // send email to 'recipient', admin if debugging
  MailApp.sendEmail(recipient, subject, body, {
    htmlBody: body,
    noReply: true,
  });
}

export default sendMail;
