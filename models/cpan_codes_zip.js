module.exports = function(sequelize, DataTypes) {
    var CPAN_codes = sequelize.define("CPAN_codes", {
      // Giving the zip model a name of type STRING
      zip: DataTypes.INTEGER,
  
      city: DataTypes.STRING,
      county: DataTypes.STRING,
      hub: DataTypes.STRING,
      menu: DataTypes.STRING,      
    },
    { timestamps: false });
  
    CPAN_codes.associate = function(models){
      CPAN_codes.belongsTo(models.zip_county,{
        foreignKey: "zip",
      })
    }
    // Author.associate = function(models) {
    //   // Associating Author with Posts
    //   // When an Author is deleted, also delete any associated Posts
    //   Author.hasMany(models.Post, {
    //     onDelete: "cascade"
    //   });
    // };
  
    return CPAN_codes;
  };