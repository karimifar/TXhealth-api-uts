module.exports = function (sequelize, DataTypes) {
  var zcta_geo = sequelize.define(
    "zcta_geo",
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

  zcta_geo.associate = function (models) {
    // zcta_geo.hasMany(models.maltreatment_val_zip,{
    //   foreignKey: "zip",
    //   onDelete: "cascade",
    // })
  };

  return zcta_geo;
};
