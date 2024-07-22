// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function (app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html

  app.get("/CPAN/inst", function (req, res) {
    res.sendFile(
      path.join(__dirname, "../public/geojsons/CPAN/inst-areas.geojson")
    );
  });
  app.get("/CPAN/region", function (req, res) {
    res.sendFile(
      path.join(__dirname, "../public/geojsons/CPAN/region-areas.geojson")
    );
  });

  app.get("/Texas/counties", function (req, res) {
    res.sendFile(
      path.join(__dirname, "../public/geojsons/Texas/Counties.json")
    );
  });
  app.get("/Texas/highways", function (req, res) {
    res.sendFile(
      path.join(__dirname, "../public/geojsons/Texas/highways-all.json")
    );
  });
  app.get("/Texas/waters/lakes", function (req, res) {
    res.sendFile(
      path.join(__dirname, "../public/geojsons/Texas/waters/tx_lakes.json")
    );
  });
  app.get("/Texas/waters/bays", function (req, res) {
    res.sendFile(
      path.join(__dirname, "../public/geojsons/Texas/waters/tx_bays.json")
    );
  });
  app.get("/Texas/waters/rivers", function (req, res) {
    res.sendFile(
      path.join(__dirname, "../public/geojsons/Texas/waters/tx_rivers.json")
    );
  });
};
