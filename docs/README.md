## Modules

<dl>
<dt><a href="#module_emailConfig">emailConfig</a></dt>
<dd><p><strong>This configuration file must be completed for the <code>sendMail</code> function
to work correctly.</strong></p>
<p>Please see the documentation for <code>const config</code> below for a description of
required parameters. Please find additional information in the
[ Source Repository](https://github.com/unforswearing/gas-send-email)</p></dd>
<dt><a href="#module_sendEmail">sendEmail</a></dt>
<dd><p>Please see the documentation for <code>const config</code> below for a description of
required parameters. Please find additional information in the
[ Source Repository](https://github.com/unforswearing/gas-send-email)</p></dd>
<dt><a href="#module_debug">debug</a></dt>
<dd></dd>
</dl>

<a name="module_emailConfig"></a>

## emailConfig
<p><strong>This configuration file must be completed for the <code>sendMail</code> function
to work correctly.</strong></p>
<p>Please see the documentation for <code>const config</code> below for a description of
required parameters. Please find additional information in the
[ Source Repository](https://github.com/unforswearing/gas-send-email)</p>

**Author**: unforswearing  
<a name="module_emailConfig..config"></a>

### emailConfig~config : <code>Object</code>
**Kind**: inner constant of [<code>emailConfig</code>](#module_emailConfig)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| admin | <code>string</code> | <p>admin will receive error notifications</p> |
| formName | <code>string</code> |  |
| recipient | <code>string</code> | <p>add any recipient email addresses here. these may be single addresses or an array of quoted addresses.</p> |
| emailFooter | <code>string</code> | <p><code>emailFooter</code> specifies the html string to be used in the emails that are sent from this script. Leave blank if you do not require an email footer</p> |
| sheetId | <code>string</code> | <p>Property <code>sheetID</code> is required for this script to work properly Properties <code>formName</code> and <code>sheetId</code> will be extracted from <code>const formName</code> and <code>const sheet</code></p> |
| sheetNameFilter | <code>string</code> | <p>used to extract the form name from the sheet name. the 'responses' default is typical for most forms.</p> |
| subjectFilter | <code>string</code> | <p><code>subjectFilter</code> is used to create the email subject from the sheet name. the text in the subjectFilter will be added to the sheet name to generate an email subject. if you do not want the additional text in the email title you can leave this section blank -- use '' NOTE the modifications above have not yet been tested (as of 2/16/2021)</p> |
| sheetInfo | <code>Object</code> | <p>The first column is set to 'A' by default. To use a different first column modify the <code>firstCol</code> parameter to another column in your sheet.</p> |

<a name="module_sendEmail"></a>

## sendEmail
<p>Please see the documentation for <code>const config</code> below for a description of
required parameters. Please find additional information in the
[ Source Repository](https://github.com/unforswearing/gas-send-email)</p>

**Author**: unforswearing  

* [sendEmail](#module_sendEmail)
    * [~procParams](#module_sendEmail..procParams)
    * [~sendMail(debug)](#module_sendEmail..sendMail) ⇒ <code>void</code>
        * [~data](#module_sendEmail..sendMail..data)
        * [~sheet](#module_sendEmail..sendMail..sheet)
        * [~sheetInfo](#module_sendEmail..sendMail..sheetInfo)

<a name="module_sendEmail..procParams"></a>

### sendEmail~procParams
<p>The parameters in this <code>procParams</code> object will default to the
imported config file, calculating information from the active
sheet only where necessary. Additional information about configuration [can be found in config](emailConfig)</p>

**Kind**: inner property of [<code>sendEmail</code>](#module_sendEmail)  
**Requires**: <code>module:emailConfig.config</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| data.admin | <code>string</code> | <p>admin will receive error notifications</p> |
| data.formName | <code>string</code> |  |
| data.recipient | <code>string</code> | <p>add any recipient email addresses here. these may be single addresses or an array of quoted addresses.</p> |
| data.emailFooter | <code>string</code> | <p><code>emailFooter</code> specifies the html string to be used in the emails that are sent from this script. Leave blank if you do not require an email footer</p> |
| data.sheetId | <code>string</code> | <p>Property <code>sheetID</code> is required for this script to work properly Properties <code>formName</code> and <code>sheetId</code> will be extracted from <code>const formName</code> and <code>const sheet</code></p> |
| data.sheetNameFilter | <code>string</code> | <p>used to extract the form name from the sheet name. the 'responses' default is typical for most forms.</p> |
| data.subjectFilter | <code>string</code> | <p><code>subjectFilter</code> is used to create the email subject from the sheet name. the text in the subjectFilter will be added to the sheet name to generate an email subject. if you do not want the additional text in the email title you can leave this section blank -- use '' NOTE the modifications above have not yet been tested (as of 2/16/2021)</p> |
| data.sheetInfo | <code>Object</code> | <p>The first column is set to 'A' by default. To use a different first column modify the <code>firstCol</code> parameter to another column in your sheet.</p> |

<a name="module_sendEmail..sendMail"></a>

### sendEmail~sendMail(debug) ⇒ <code>void</code>
<p>main runner function. on form submit, execute sendMail, end script.
sendEmail(true) to send all notifications to 'admin' for testing.
processing parameters specific to the needs of this form
edit this function to update required 'data' parameters and
add any helper scripts</p>

**Kind**: inner method of [<code>sendEmail</code>](#module_sendEmail)  

| Param | Type | Description |
| --- | --- | --- |
| debug | <code>boolean</code> | <p>specify whether the script should send errors to <code>admin</code></p> |


* [~sendMail(debug)](#module_sendEmail..sendMail) ⇒ <code>void</code>
    * [~data](#module_sendEmail..sendMail..data)
    * [~sheet](#module_sendEmail..sendMail..sheet)
    * [~sheetInfo](#module_sendEmail..sendMail..sheetInfo)

<a name="module_sendEmail..sendMail..data"></a>

#### sendMail~data
<p>extract helper code and info from procParams (var parameters)
assumption: parameters.helper contains an object of helper vars / funcs
var helper = parameters.helper;</p>

**Kind**: inner property of [<code>sendMail</code>](#module_sendEmail..sendMail)  
<a name="module_sendEmail..sendMail..sheet"></a>

#### sendMail~sheet
<p>open the sheet for parsing</p>

**Kind**: inner property of [<code>sendMail</code>](#module_sendEmail..sendMail)  
<a name="module_sendEmail..sendMail..sheetInfo"></a>

#### sendMail~sheetInfo
<p>sheetInfo = { firstCol: ..., lastCol: ... }</p>

**Kind**: inner property of [<code>sendMail</code>](#module_sendEmail..sendMail)  
<a name="module_debug"></a>

## debug
**Author**: unforswearing
[Repository](https://github.com/unforswearing/gas-send-email)  
<a name="module_debug..debugRunner"></a>

### debug~debugRunner(admin) ⇒ <code>void</code>
**Kind**: inner method of [<code>debug</code>](#module_debug)  

| Param | Type | Description |
| --- | --- | --- |
| admin | <code>string</code> | <p>The email address to send errors</p> |

