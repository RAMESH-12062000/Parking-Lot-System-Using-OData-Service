## Application Details
|               |
| ------------- |
|**Generation Date and Time**<br>Sat Aug 10 2024 10:38:31 GMT+0000 (Coordinated Universal Time)|
|**App Generator**<br>@sap/generator-fiori-freestyle|
|**App Generator Version**<br>1.14.3|
|**Generation Platform**<br>SAP Business Application Studio|
|**Template Used**<br>simple|
|**Service Type**<br>OData Url|
|**Service URL**<br>http://vhcalakeci.artihcus.com:50600/sap/opu/odata/sap/ZEWM_PARKING_LOT_SYSTEM_SRV_01/|
|**Module Name**<br>parkinglotodatasys|
|**Application Title**<br>Parking Lot System|
|**Namespace**<br>com.app|
|**UI5 Theme**<br>sap_horizon|
|**UI5 Version**<br>1.102.2|
|**Enable Code Assist Libraries**<br>False|
|**Enable TypeScript**<br>False|
|**Add Eslint configuration**<br>False|

## parkinglotodatasys

An SAP Fiori application.

### Starting the generated app

-   This app has been generated using the SAP Fiori tools - App Generator, as part of the SAP Fiori tools suite.  In order to launch the generated app, simply run the following from the generated app root folder:

```
    npm start
```

- It is also possible to run the application using mock data that reflects the OData Service URL supplied during application generation.  In order to run the application with Mock Data, run the following from the generated app root folder:

```
    npm run start-mock
```

#### Pre-requisites:

1. Active NodeJS LTS (Long Term Support) version and associated supported NPM version.  (See https://nodejs.org)

//for getting presend date..
var currentDate = new Date();
var day = currentDate.getDate(); // Day of the month (1-31)
var year = currentDate.getFullYear(); // Year (e.g., 2024)
// Get month name
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
var month = monthNames[currentDate.getMonth()]; // Get the month name from the array
// Get hours and minutes
var hours = currentDate.getHours();
var minutes = currentDate.getMinutes();
minutes = minutes < 10 ? '0' + minutes : minutes; // Add leading zero if necessary
// Determine AM or PM
var ampm = hours >= 12 ? 'PM' : 'AM';
// Convert hours to 12-hour format
hours = hours % 12;
hours = hours ? hours : 12; // If hour is 0 (midnight), change it to 12
// Combine them into the desired format
var FinalDate = `${day} ${month} ${year} ${hours}:${minutes} ${ampm}`;
