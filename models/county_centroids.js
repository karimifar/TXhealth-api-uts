module.exports = function(sequelize, DataTypes) {
    var cnty_centroid = sequelize.define("cnty_centroid", {
      fips: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      county: DataTypes.STRING,
      c_lng: DataTypes.FLOAT,
      c_lat: DataTypes.FLOAT,
    },
    { 
      timestamps: false 
    });

    cnty_centroid.associate = function(models){
      cnty_centroid.hasMany(models.NAS_county,{
        foreignKey: "fips",
        onDelete: "cascade",
      })
      cnty_centroid.hasMany(models.maltreatment_val_cty,{
        foreignKey: "county_fips",
        onDelete: "cascade",
      })
      cnty_centroid.hasMany(models.netx_cty,{
        foreignKey: "fips",
        onDelete: "cascade",
      })
    }
    
    return cnty_centroid;
  };
  