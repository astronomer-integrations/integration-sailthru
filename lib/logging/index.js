const _ = require('lodash');
const GoogleSpreadsheet = require('google-spreadsheet');
const async = require('async');

const credentials = require('./config/credentials');

class Logger {
  constructor(options) {
    this.options = options;
    this.doc = null;
    this.sheet = null;
    if (options.loggingSentRequests) {
      this.doc = new GoogleSpreadsheet(credentials.SPREADSHEET_ID);
    }
  }

  logEvent(details) {
    if (this.doc && this.options.loggingSentRequests) {
      async.series({
        authenticate: (step) => {
          const creds = {
            client_email: credentials.CLIENT_EMAIL,
            private_key: credentials.PRIVATE_KEY,
          };
          this.doc.useServiceAccountAuth(creds, step);
        },
        getWorksheets: (step) => {
          this.doc.getInfo((getInfoErr, info) => {
            if (info.worksheets) {
              this.sheet = _.find(info.worksheets, { title: this.options.loggingSentRequests });
            }
            step();
          });
        },
        addWorksheet: (step) => {
          if (this.sheet) {
            step();
          } else {
            this.doc.addWorksheet({
              title: this.options.loggingSentRequests,
            }, (addWorksheetErr, sheet) => {
              async.series({
                setTitle: (innerStep) => {
                  sheet.setTitle(this.options.loggingSentRequests, () => {
                    innerStep();
                  });
                },
                setHeaderRow: (innerStep) => {
                  sheet.setHeaderRow(Object.keys(details), () => {
                    innerStep();
                  });
                },
                setSheet: (innerStep) => {
                  this.sheet = sheet;
                  innerStep();
                  step();
                },
              }, (err) => {
                if (err) {
                  console.error(`Error logging event: ${err}`); // eslint-disable-line
                }
              });
            });
          }
        },
        addRow: (step) => {
          let sheetId = 0;
          if (this.sheet && this.sheet.id) {
            sheetId = this.sheet.id;
          }
          this.doc.addRow(sheetId, details, () => {
            console.info(`Event logged to https://docs.google.com/spreadsheets/d/${credentials.SPREADSHEET_ID}/ sheet ${this.options.loggingSentRequests}`); // eslint-disable-line
            step();
          });
        },
      }, (err) => {
        if (err) {
          console.error(`Error logging event: ${err}`); // eslint-disable-line
        }
      });
    } else {
      console.error('Logging deactivated'); // eslint-disable-line
    }
  }
}

module.exports = options => new Logger(options);
