module.exports = function (sequelize, DataTypes) {
  var cnty_centroid = sequelize.define(
    "cnty_centroid",
    {
      fips: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      county: DataTypes.STRING,
      c_lng: DataTypes.FLOAT,
      c_lat: DataTypes.FLOAT,
    },
    {
      timestamps: false,
    }
  );

  return cnty_centroid;
};
