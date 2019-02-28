const {
  getDetails,
  getAdjustments,
  getPropertiesAfterRemovingPII,
  getCustomProperties,
  getUpdatedChart,
  getReminderTemplate,
  getReminderTime,
  getSendTemplate,
} = require('./helpers');

const {
  getUserChart,
  getEmailFromUserID,
} = require('./api');

module.exports = async (track, facadeOptions) => {
  const data = {};
  const reminderTemplate = getReminderTemplate(track, facadeOptions);
  const reminderTime = getReminderTime(track, facadeOptions);
  const sendTemplate = getSendTemplate(track, facadeOptions);

  // get reminder time and template
  if (reminderTemplate && reminderTime) {
    Object.assign(data, {
      reminder_time: reminderTime,
      reminder_template: reminderTemplate,
    });
  }

  if (sendTemplate) {
    Object.assign(data, {
      send_template: sendTemplate,
    });
  }

  const email = await getEmailFromUserID(track, facadeOptions);

  if (email && email.error) {
    return email;
  }

  if (facadeOptions.options && !facadeOptions.options.productOnly) {
    Object.assign(data, {
      email,
      items: getDetails(track, facadeOptions),
      adjustments: getAdjustments(track),
      incomplete: facadeOptions.options.incomplete,
      date: track.timestamp(),
      userAgent: track.userAgent(),
      vars: getCustomProperties(getPropertiesAfterRemovingPII(track, facadeOptions)),
    });
  } else {
    const userChart = await getUserChart(track, facadeOptions);
    if (userChart.error) {
      return userChart;
    }
    Object.assign(data, getUpdatedChart(track, facadeOptions, userChart));

    Object.assign(data, {
      email,
      incomplete: 1,
      date: track.timestamp(),
      userAgent: track.userAgent(),
    });
  }

  return data;
};
