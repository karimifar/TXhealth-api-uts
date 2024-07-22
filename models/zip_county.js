module.exports = function (sequelize, DataTypes) {
  var zip_county = sequelize.define(
    "zip_county",
    {
      zipcode: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      z_lng: DataTypes.FLOAT,
      z_lat: DataTypes.FLOAT,
      flag: DataTypes.INTEGER,
      county: DataTypes.STRING,
      fips: DataTypes.INTEGER,
      c_lng: DataTypes.FLOAT,
      c_lat: DataTypes.FLOAT,
    },
    {
      timestamps: false,
    }
  );

  zip_county.associate = function (models) {
    // zip_county.hasMany(models.NAS_zip,{
    //   foreignKey: "zip",
    //   onDelete: "cascade",
    // })
    zip_county.hasMany(models.CPAN_codes, {
      foreignKey: "zip",
      onDelete: "cascade",
    });
  };

  return zip_county;
};
