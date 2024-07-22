var db = require("../models");

module.exports = function (app) {
  app.get("/api/test", function (req, res) {
    res.send("test");
  });

  app.get("/api/validatezcta/:zip", function (req, res) {
    var zip = req.params.zip;
    db.zcta_geo
      .findAll({
        where: {
          zcta: zip,
        },
      })
      .then(function (data) {
        res.json(data);
      });
  });
  app.get("/api/validatecty/:cty", function (req, res) {
    var cty = req.params.cty;
    db.cnty_centroid
      .findAll({
        where: {
          county: cty,
        },
      })
      .then(function (data) {
        res.json(data);
      });
  });

  app.get("/api/cpan/codebyzip/:zip", function (req, res) {
    var zip = req.params.zip;
    db.CPAN_codes.findAll({
      where: {
        zip: zip,
      },
      include: [
        {
          model: db.zip_county,
        },
      ],
    }).then(function (dbZip) {
      res.json(dbZip);
    });
  });

  app.get("/api/alltxzips", function (req, res) {
    db.zip_county
      .findAll({
        attributes: ["zipcode"],
      })
      .then(function (dbZip) {
        var zipList = [];
        for (var i = 0; i < dbZip.length; i++) {
          zipList.push(dbZip[i].zipcode.toString());
        }
        res.json(zipList);
      });
  });

  app.get("/api/alltxcounties", function (req, res) {
    db.cnty_centroid
      .findAll({
        attributes: ["county"],
      })
      .then(function (dbCty) {
        var ctyList = [];
        for (var i = 0; i < dbCty.length; i++) {
          ctyList.push(dbCty[i].county);
        }
        res.json(ctyList);
      });
  });
};
