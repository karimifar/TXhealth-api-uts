var expressValidator = require("express-validator");

var db = require("../models");

module.exports = function (app) {
  app.get("/api/test", function (req, res) {
    res.send("test");
  });

  app.get(
    "/api/validatezcta/:zip",
    [
      expressValidator
        .check("zip")
        .isNumeric()
        .isLength({ min: 5, max: 5 })
        .withMessage("Zip code must be a 5-digit number"),
    ],
    function (req, res) {
      var errors = expressValidator.validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      var zip = req.params.zip;
      db.zcta_geo
        .findAll({
          where: {
            zcta: zip,
          },
        })
        .then(function (data) {
          res.json(data);
        })
        .catch(function (err) {
          res.status(500).json({ error: err.message });
        });
    }
  );
  app.get(
    "/api/validatecty/:cty",
    [
      expressValidator
        .check("cty")
        .isString()
        .trim()
        .withMessage("Invalid county name"),
    ],
    function (req, res) {
      var errors = expressValidator.validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      var cty = req.params.cty;
      db.cnty_centroid
        .findAll({
          where: {
            county: cty,
          },
        })
        .then(function (data) {
          res.json(data);
        })
        .catch(function (err) {
          res.status(500).json({ error: err.message });
        });
    }
  );

  app.get(
    "/api/cpan/codebyzip/:zip",
    [
      expressValidator
        .check("zip")
        .isNumeric()
        .isLength({ min: 5, max: 5 })
        .withMessage("Zip code must be a 5-digit number"),
    ],
    function (req, res) {
      var errors = expressValidator.validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
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
      })
        .then(function (dbZip) {
          res.json(dbZip);
        })
        .catch(function (err) {
          res.status(500).json({ error: err.message });
        });
    }
  );

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
