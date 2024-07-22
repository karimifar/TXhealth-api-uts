DROP DATABASE IF EXISTS TXHealth;
CREATE DATABASE TXHealth;


-- join county rates and centroid points
SELECT NAS_counties.`countyName`, NAS_counties.`nas_rate`, NAS_counties.`pndexp_rate`, NAS_counties.`disp_yr`, NAS_counties.`birth`, cnty_centroids.`fips`, cnty_centroids.`c_lat`, cnty_centroids.`c_lng`
FROM NAS_counties
INNER JOIN cnty_centroids
ON NAS_counties.countyName=cnty_centroids.county;

-- Join zip and zip/county crosswalk
SELECT NAS_zips.`zip`, NAS_zips.`nas_rate`, NAS_zips.`pndexp_rate`, NAS_zips.`disp_yr`, NAS_zips.`birth`, zip_counties.`z_lng`, zip_counties.`z_lat`, zip_counties.`county`, zip_counties.`c_lng`, zip_counties.`c_lat`
FROM NAS_zips
RIGHT OUTER JOIN zip_counties
ON NAS_zips.zip=zip_counties.zipcode
WHERE disp_yr = 2018