module.exports = function (sequelize, DataTypes) {
  var zcta_geos = sequelize.define(
    "zcta_geos",
    {
      zcta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      z_lng: DataTypes.FLOAT,
      z_lat: DataTypes.FLOAT,
      county: DataTypes.STRING,
      fips: DataTypes.INTEGER,
      c_lat: DataTypes.FLOAT,
      c_lng: DataTypes.FLOAT,
    },
    {
      timestamps: false,
    }
  );

  return zcta_geos;
}; 