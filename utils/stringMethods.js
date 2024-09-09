function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function removeNonAlphanumericAndAmpersand(str) {
  return str.replace(/[^a-zA-Z0-9&\s]/g, "");
}

module.exports = { toTitleCase, removeNonAlphanumericAndAmpersand };
