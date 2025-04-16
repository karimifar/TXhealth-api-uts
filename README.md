# TXHealth API

This is the TXHealth API server using SQLite for data storage.

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Initialize SQLite database (this parses the MySQL dump):
   ```
   npm run init-db
   ```

3. Start the server:
   ```
   npm start
   ```

The server will be available at http://localhost:3306 by default.

## Database Structure

The application uses SQLite to store data in a single file (`data/txhealth.sqlite`). This includes all the tables from the original MySQL database:

- cnty_centroids
- CPAN_codes
- maltreatment_state_vals
- maltreatment_val_cties
- maltreatment_val_zips
- maltreatment_var_keys
- NAS_counties
- NAS_zips
- netx_cties
- netx_demos
- netx_trends
- TCHMB_nat_pcrs
- zcta_geos
- zip_counties

The database is initialized from the MySQL dump file in `data/txhealth.sql`.

## Deployment

Since SQLite is a file-based database, you can deploy this application as a monolith by simply transferring all files, including the SQLite database file. No separate database server is required.