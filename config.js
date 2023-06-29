/**
 * ## Configuration
 * `config.js` contains the configuration for the `sendMail` function. 
 * The `config` object must be completed for the `sendMail` function 
 * to work correctly. This object is passed to {@link module:sendEmail~sendMail|the sendEmail function} with values from the current sheet environment via 
 * {@link module:sendEmail~procParams|the procParams object}.
 * <br /><br />
 * Please see the documentation for the parameters in `const config` below. 
 * All parameter values are `undefined` by default. 
 * @author unforswearing
 * @module emailConfig
 * */

/**
 * Update `const` with values specific to your project. 
 * @constant {Object} config
* @property {string} admin Admin will receive error notifications
* @property {string} formName 
* The name of the form used to add responses to your spreadsheet
* @property {string} recipient 
* Add email addresses here. All form responses will be sent to any 
* address added. Addresses may be for one individual or an array of 
* addresses for multiple recipients. 
* @property {string} emailFooter
* `emailFooter` specifies the html string to be used in the emails
* that are sent from this script. Leave blank if you do not require
* an email footer
* @property {string} sheetId
* Property `sheetID` is required for this script to work properly
* Properties `formName` and `sheetId` will be extracted from
* `const formName` and `const sheet`
* @property {string} sheetNameFilter 
* `sheetNameFilter` is used to extract the form name from the sheet name.
* the 'responses' default is typical for most forms.
* @property {string} subjectFilter
* `subjectFilter` is used to create the email subject from the sheet name.
* the text in the subjectFilter will be added to the sheet name
* to generate an email subject. if you do not want the additional
* text in the email title you can leave this section blank -- use ''
* @property {{firstCol: string, lastCol: string, lastRow: number}} sheetInfo
* The first column is set to 'A' by default. To use a different first column
* modify the `firstCol` parameter to another column in your sheet. 
* */
const config = {
  admin: undefined,
  formName: undefined,
  recipient: undefined,
  emailFooter: undefined,
  sheetId: undefined,
  sheetNameFilter: undefined,
  subjectFilter: undefined,
  sheetInfo: {
    firstCol: "A",
    lastCol: getLastColumnLetter(), 
    lastRow: activeSpreadsheet.getLastRow(),
  },
};

export default config;
