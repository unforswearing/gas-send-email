/**
 * ## Sending Email  
 * The `sendEmail()` function is the main and only runner function for this script. 
 * To have this function respond to new form responses, please add `sendMail()` 
 * as an installable trigger in your project. Please see {@link https://developers.google.com/apps-script/guides/triggers/installable#google_apps_triggers|the installable triggers documentation} for more information.
 * <br /><br />
 * Your project information must be added to this config object before the 
 * `sendEmail()` function will work correctly. Please see the documentation 
 * for {@link module:emailConfig~config|config} for a description of 
 * required parameters. 
 * <br /><br />
 * For debugging this script, please see {@link module:sendEmail~sendMail|the sendMail function} below or the {@link module:debug|debug.js file} for more information. 
 * @author unforswearing
 * @module sendEmail
 * @see {@link module:emailConfig~config|config}
 */

import config from "./config";

/**
 * Get the spreadsheet object for the active spreadsheet.
 * Uses the Google Apps Script **{@link https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app|SpreadsheetApp class}**.
 * @constant {Object} 
 * */
const activeSpreadsheet = SpreadsheetApp.getActiveSheet();

/**
 * Use the `activeSpreadsheet` object to retrieve the name
 * of the current sheet via the **{@link https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getName()|getName}** method.  
 * @constant {string} 
 * */
const sheetName = activeSpreadsheet.getName();

/**
 * A method to retrieve the letter of the last used column
 * in the spreadsheet. Use getLastColumnLetter as the value for 
 * the {@link emailConfig~config|the config object} parameter 
 * `data.sheetInfo.lastColumnLetter`. This is set by default in 
 * the `sendMail` function.
 * @function getLastColumnLetter 
 * @example 
 * // Example: modify the script to retrieve an arbitrary range
 * // from your Google Spreadsheet
 * const getLastRange = () => {
 *   let lastCol = getLastColumnLetter()
 *   return activeSpreadsheet.getRange(`A30:${lastCol}30`)
 * }
 * @return {string} The last column letter as a string.
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
 * `procParams` is created using values from {@link module:emailConfig~config|the config object}.
 * The parameters in this `procParams` object will default to the imported 
 * config object. New information will be calculated from the active sheet 
 * where necessary. **Do not modify the `procParams` object directly!** 
 * @name procParams
 * @borrows emailConfig#config as procParams
* */
let procParams = {
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
    }
};

/**
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
  var id = parameters.sheetId;
  /** open the sheet for parsing */
  var sheet = SpreadsheetApp.openById(id);

  /** sheetInfo = { firstCol, lastCol } */
  var sheetInfo = parameters.sheetInfo;

  /**
   * Get the latest response range as text
   * eg. "A10:G10"
  * */
  sheetInfo.rangeString = `${sheetInfo.firstCol}${sheetInfo.lastRow}:${sheetInfo.lastCol}${sheetInfo.lastRow}`;

  /**
   * use the response range to get the questions from row 1 
   * if your questions are in a different row or column 
   * change 'A1' to the location of the cell containing the first question 
   * replace the '1' in 'sheetInfo.lastCol with the number of the row 
   * containing the last question.
   * */
  sheetInfo.questionString = `A1:${sheetInfo.lastCol + 1}`;

  /** 
   * get the values for question and latest response ranges
  * */
  sheetInfo.questions = sheet.getRange(sheetInfo.questionString).getValues()[0];

  sheetInfo.submissionData = sheet
    .getRange(sheetInfo.rangeString)
    .getValues()[0];

  /** only shorten timestamps if the timestamps array has a value */
  if (parameters.timestampsArray.join("")) {
    for (var n in parameters.timestampsArray) {
      /** tsi === time stamp index */
      var tsi = parameters.timestampsArray[n];

      /** change the date formatting if needed */
      sheetInfo.submissionData[tsi] = Utilities.formatDate(
        sheetInfo.submissionData[tsi],
        Session.getScriptTimeZone(),
        "M/d/yyyy h:mm a"
      ).toString();
    }
  }

  /**
   * create the submission info table and styles for html emails
   * table rows will be pushed to the dataTable column in the loop below
  * */
  var dataTable = [];
  var tdstyle = 'style="padding:7px;"';

  /** loop through the submissionData to create a table of questions and answers */
  for (var i in sheetInfo.submissionData) {
    var answer = sheetInfo.submissionData[i];
    var question = sheetInfo.questions[i];

    /** add the generated row to the dataTable array */
    dataTable.push(
      `<tr><td align="right" ${tdstyle}><b>${question}</b></td><td align="left"  ${tdstyle}>${answer}</td></tr>`
    );
  }

  /** add styles for full table and nest the dataTable rows in table tags */
  var tablestyle = 'style="width:80%;padding:7px;"';
  dataTable = `<table ${tablestyle}>${dataTable.join("")}</tables>`;

  /** Use admin email address if debug is true, otherwise use the script default */
  var recipient = debug === true ? parameters.admin : parameters.recipient();

  /** create email subject */
  var sheetName = sheet.getName().replace(parameters.sheetNameFilter, "");
  var subject = sheetName + parameters.subjectFilter;

  /** add a company logo if desired. otherwise, comment out the two lines below */
  var logo = undefined;
  logo = `<img src="${logo}" width="120px" height="80px">`;

  /** create the email body */
  var emailFooter = parameters.emailFooter;

  var body = `${logo}<br><br>
    'Hello,<br><br>'${sheetName} form was submitted on ${sheetInfo.submissionData[0]}. 
    Please find the submitted information below.<hr><br>${dataTable}<br><br><br><br>${emailFooter}`;

  /** send email to 'recipient', admin if debugging */
  MailApp.sendEmail(recipient, subject, body, {
    htmlBody: body,
    noReply: true,
  });
}

export default sendMail;
