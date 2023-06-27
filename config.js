/**
 * @author unforswearing
 * {@link https://github.com/unforswearing/gas-send-email|Repository}
 * @module emailConfig
 * */

/**
 * @constant {Object} config
* @property {string} admin admin will receive error notifications
* @property {string} formName 
* @property {string} recipient 
* add any recipient email addresses here. these may be single
* addresses or an array of quoted addresses. 
* @property {string} emailFooter
* `emailFooter` specifies the html string to be used in the emails
* that are sent from this script. Leave blank if you do not require
* an email footer
* @property {string} sheetId
* Property `sheetID` is required for this script to work properly
* Properties `formName` and `sheetId` will be extracted from
* `const formName` and `const sheet`
* @property {string} sheetNameFilter 
* used to extract the form name from the sheet name.
* the 'responses' default is typical for most forms.
* @property {string} subjectFilter
* `subjectFilter` is used to create the email subject from the sheet name.
* the text in the subjectFilter will be added to the sheet name
* to generate an email subject. if you do not want the additional
* text in the email title you can leave this section blank -- use ''
* NOTE the modifications above have not yet been tested (as of 2/16/2021)
* @property {{firstCol: string, lastCol: string, lastRow: number}} sheetInfo
* The first column is set to 'A' by default. To use a different first column
* modify the `firstCol` parameter to another column in your sheet. 
* */
const config = {
  admin: "",
  formName: "",
  recipient: "",
  emailFooter: "",
  sheetId: "",
  sheetNameFilter: "",
  subjectFilter: "",
  sheetInfo: {},
};

// const setConfig = (configOptions) => {};

export default config;
