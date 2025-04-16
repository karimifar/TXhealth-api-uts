const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { Sequelize, DataTypes } = require('sequelize');
const sqlite3 = require('sqlite3').verbose();

// Config
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const sqlFilePath = path.join(__dirname, '../data/txhealth.sql');
const dbPath = path.join(__dirname, '..', config.storage);

// Check if database already exists and delete it if it does
if (fs.existsSync(dbPath)) {
  console.log(`Removing existing database at ${dbPath}`);
  fs.unlinkSync(dbPath);
}

// Create database directory if it doesn't exist
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false
});

// Define tables schema mapping - corrected to match MySQL schema
const tableSchemas = {
  cnty_centroids: {
    fips: { type: DataTypes.INTEGER, primaryKey: true },
    county: { type: DataTypes.STRING },
    c_lng: { type: DataTypes.FLOAT },
    c_lat: { type: DataTypes.FLOAT }
  },
  CPAN_codes: {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    zip: { type: DataTypes.INTEGER },
    city: { type: DataTypes.STRING },
    county: { type: DataTypes.STRING },
    hub: { type: DataTypes.STRING },
    menu: { type: DataTypes.STRING }
  },
  maltreatment_state_vals: {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    year: { type: DataTypes.INTEGER },
    variable: { type: DataTypes.STRING },
    min_cty: { type: DataTypes.DECIMAL(10, 2) },
    median_cty: { type: DataTypes.DECIMAL(10, 2) },
    max_cty: { type: DataTypes.DECIMAL(10, 2) },
    min_zip: { type: DataTypes.DECIMAL(10, 2) },
    median_zip: { type: DataTypes.DECIMAL(10, 2) },
    max_zip: { type: DataTypes.DECIMAL(10, 2) }
  },
  maltreatment_val_cties: {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    year: { type: DataTypes.INTEGER },
    county_fips: { type: DataTypes.INTEGER },
    var_name: { type: DataTypes.STRING },
    value: { type: DataTypes.DECIMAL(10, 2) },
    lbl: { type: DataTypes.STRING },
    age: { type: DataTypes.INTEGER },
    county: { type: DataTypes.STRING }
  },
  maltreatment_val_zips: {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    year: { type: DataTypes.INTEGER },
    zip: { type: DataTypes.INTEGER },
    var_name: { type: DataTypes.STRING },
    value: { type: DataTypes.DECIMAL(10, 2) },
    lbl: { type: DataTypes.STRING },
    age: { type: DataTypes.INTEGER }
  },
  maltreatment_var_keys: {
    variable: { type: DataTypes.STRING, primaryKey: true },
    age: { type: DataTypes.INTEGER },
    right: { type: DataTypes.STRING },
    display_name: { type: DataTypes.TEXT },
    description: { type: DataTypes.TEXT },
    factor: { type: DataTypes.STRING },
    order: { type: DataTypes.INTEGER }
  },
  NAS_counties: {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    countyName: { type: DataTypes.STRING },
    fips: { type: DataTypes.INTEGER },
    year: { type: DataTypes.INTEGER },
    birth: { type: DataTypes.INTEGER },
    nas_rate: { type: DataTypes.DECIMAL(10, 1) },
    pndexp_rate: { type: DataTypes.DECIMAL(10, 1) },
    disp_yr: { type: DataTypes.INTEGER }
  },
  NAS_zips: {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    zip: { type: DataTypes.INTEGER },
    year: { type: DataTypes.STRING },
    birth: { type: DataTypes.INTEGER },
    nas_rate: { type: DataTypes.DECIMAL(10, 1) },
    pndexp_rate: { type: DataTypes.DECIMAL(10, 1) },
    disp_yr: { type: DataTypes.INTEGER }
  },
  netx_cties: {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    fips: { type: DataTypes.INTEGER },
    county: { type: DataTypes.STRING },
    acm_tx: { type: DataTypes.DECIMAL(10, 1) },
    acm: { type: DataTypes.DECIMAL(10, 1) },
    acm_diff: { type: DataTypes.DECIMAL(10, 1) },
    hea_tx: { type: DataTypes.DECIMAL(10, 1) },
    hea: { type: DataTypes.DECIMAL(10, 1) },
    hea_diff: { type: DataTypes.DECIMAL(10, 1) },
    can_tx: { type: DataTypes.DECIMAL(10, 1) },
    can: { type: DataTypes.DECIMAL(10, 1) },
    can_diff: { type: DataTypes.DECIMAL(10, 1) },
    uni_tx: { type: DataTypes.DECIMAL(10, 1) },
    uni: { type: DataTypes.DECIMAL(10, 1) },
    uni_diff: { type: DataTypes.DECIMAL(10, 1) },
    str_tx: { type: DataTypes.DECIMAL(10, 1) },
    str: { type: DataTypes.DECIMAL(10, 1) },
    str_diff: { type: DataTypes.DECIMAL(10, 1) },
    clr_tx: { type: DataTypes.DECIMAL(10, 1) },
    clr: { type: DataTypes.DECIMAL(10, 1) },
    clr_diff: { type: DataTypes.DECIMAL(10, 1) }
  },
  netx_demos: {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    cause: { type: DataTypes.STRING },
    netx_m: { type: DataTypes.DECIMAL(10, 1) },
    netx_f: { type: DataTypes.DECIMAL(10, 1) },
    netx_b: { type: DataTypes.DECIMAL(10, 1) },
    netx_h: { type: DataTypes.DECIMAL(10, 1) },
    netx_w: { type: DataTypes.DECIMAL(10, 1) },
    tx_m: { type: DataTypes.DECIMAL(10, 1) },
    tx_f: { type: DataTypes.DECIMAL(10, 1) },
    tx_b: { type: DataTypes.DECIMAL(10, 1) },
    tx_h: { type: DataTypes.DECIMAL(10, 1) },
    tx_w: { type: DataTypes.DECIMAL(10, 1) },
    us_m: { type: DataTypes.DECIMAL(10, 1) },
    us_f: { type: DataTypes.DECIMAL(10, 1) },
    us_b: { type: DataTypes.DECIMAL(10, 1) },
    us_h: { type: DataTypes.DECIMAL(10, 1) },
    us_w: { type: DataTypes.DECIMAL(10, 1) }
  },
  netx_trends: {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    year: { type: DataTypes.INTEGER },
    acm_netx: { type: DataTypes.DECIMAL(10, 1) },
    acm_tx: { type: DataTypes.DECIMAL(10, 1) },
    acm_us: { type: DataTypes.DECIMAL(10, 1) },
    can_netx: { type: DataTypes.DECIMAL(10, 1) },
    can_tx: { type: DataTypes.DECIMAL(10, 1) },
    can_us: { type: DataTypes.DECIMAL(10, 1) },
    str_netx: { type: DataTypes.DECIMAL(10, 1) },
    str_tx: { type: DataTypes.DECIMAL(10, 1) },
    str_us: { type: DataTypes.DECIMAL(10, 1) },
    clr_netx: { type: DataTypes.DECIMAL(10, 1) },
    clr_tx: { type: DataTypes.DECIMAL(10, 1) },
    clr_us: { type: DataTypes.DECIMAL(10, 1) },
    uni_netx: { type: DataTypes.DECIMAL(10, 1) },
    uni_tx: { type: DataTypes.DECIMAL(10, 1) },
    uni_us: { type: DataTypes.DECIMAL(10, 1) },
    hea_netx: { type: DataTypes.DECIMAL(10, 1) },
    hea_tx: { type: DataTypes.DECIMAL(10, 1) },
    hea_us: { type: DataTypes.DECIMAL(10, 1) }
  },
  TCHMB_nat_pcrs: {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    pcr: { type: DataTypes.STRING },
    pcr_name: { type: DataTypes.STRING },
    hospitals_t: { type: DataTypes.INTEGER },
    enrolled_n: { type: DataTypes.INTEGER },
    enrolled_p: { type: DataTypes.DECIMAL(10, 1) },
    in_progress_n: { type: DataTypes.INTEGER },
    in_progress_p: { type: DataTypes.DECIMAL(10, 1) },
    not_enrolled_n: { type: DataTypes.INTEGER },
    not_enrolled_p: { type: DataTypes.DECIMAL(10, 1) }
  },
  zcta_geos: {
    zcta: { type: DataTypes.INTEGER, primaryKey: true },
    z_lng: { type: DataTypes.FLOAT },
    z_lat: { type: DataTypes.FLOAT },
    county: { type: DataTypes.STRING },
    fips: { type: DataTypes.INTEGER },
    c_lat: { type: DataTypes.FLOAT },
    c_lng: { type: DataTypes.FLOAT }
  },
  zip_counties: {
    zipcode: { type: DataTypes.INTEGER, primaryKey: true },
    z_lng: { type: DataTypes.FLOAT },
    z_lat: { type: DataTypes.FLOAT },
    flag: { type: DataTypes.INTEGER },
    county: { type: DataTypes.STRING },
    fips: { type: DataTypes.INTEGER },
    c_lng: { type: DataTypes.FLOAT },
    c_lat: { type: DataTypes.FLOAT }
  }
};

// Function to create tables
async function createTables() {
  console.log('Creating tables...');
  
  for (const [tableName, schema] of Object.entries(tableSchemas)) {
    console.log(`Creating table: ${tableName}`);
    await sequelize.define(tableName, schema, { 
      tableName, 
      timestamps: false,
      freezeTableName: true 
    }).sync({ force: true });
  }
  
  console.log('All tables created successfully!');
}

// Function to parse SQL file line by line and execute INSERT statements
async function importData() {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('Starting database initialization...');
      
      // Initialize SQLite database connection
      await sequelize.authenticate();
      console.log('Connected to SQLite database');
      
      // Create tables
      await createTables();
      
      console.log('Now importing data from SQL file...');
      
      // Create a new SQLite connection for direct execution
      const db = new sqlite3.Database(dbPath);
      
      // Begin transaction
      db.run('BEGIN TRANSACTION');
      
      // Set up file reading stream
      const fileStream = fs.createReadStream(sqlFilePath, { encoding: 'utf8' });
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });
      
      let currentStatement = '';
      let tableCount = 0;
      let insertCount = 0;
      let currentTable = '';
      
      // Track rows per table
      const tableRowCounts = {};
      Object.keys(tableSchemas).forEach(table => {
        tableRowCounts[table] = 0;
      });
      
      // Process line by line
      for await (const line of rl) {
        // Skip comments and empty lines
        if (line.trim().startsWith('--') || line.trim().startsWith('/*') || !line.trim()) {
          continue;
        }
        
        // Check if this is a CREATE TABLE statement
        if (line.includes('CREATE TABLE')) {
          const match = line.match(/CREATE TABLE `([^`]+)`/);
          if (match) {
            currentTable = match[1];
            tableCount++;
            console.log(`Found table definition: ${currentTable}`);
          }
        }
        
        // Add line to current statement
        currentStatement += line;
        
        // If line ends with semicolon, we have a complete statement
        if (line.trim().endsWith(';')) {
          // Check if it's an INSERT statement
          if (currentStatement.includes('INSERT INTO')) {
            // Extract table name from INSERT statement
            const tableMatch = currentStatement.match(/INSERT INTO `([^`]+)`/i);
            const insertTable = tableMatch ? tableMatch[1] : null;
            
            // Process and execute the statement
            try {
              // Convert MySQL INSERT to SQLite format
              let sqliteInsert = currentStatement
                .replace(/`/g, '"')                // Replace backticks with double quotes
                .replace(/\\'/g, "''")             // Replace escaped single quotes
                .replace(/\\\\/g, '\\')            // Replace double backslashes
                .replace(/VALUES/i, 'VALUES');     // Normalize VALUES keyword
              
              // Count rows being inserted
              if (insertTable && tableRowCounts.hasOwnProperty(insertTable)) {
                // Roughly count rows by counting VALUES occurrences
                const valuesMatch = sqliteInsert.match(/\),\(/g);
                const rowCount = valuesMatch ? valuesMatch.length + 1 : 1;
                tableRowCounts[insertTable] += rowCount;
              }
              
              // Execute statement
              db.run(sqliteInsert, (err) => {
                if (err) {
                  console.error(`Error on INSERT: ${err.message}`);
                }
              });
              
              insertCount++;
              if (insertCount % 1000 === 0) {
                console.log(`Processed ${insertCount} INSERT statements...`);
              }
            } catch (err) {
              console.error(`Error processing statement: ${err.message}`);
            }
          }
          
          // Reset for next statement
          currentStatement = '';
        }
      }
      
      // Commit transaction
      db.run('COMMIT', (err) => {
        if (err) {
          console.error(`Error committing transaction: ${err.message}`);
          reject(err);
        } else {
          console.log(`Data import completed! Processed ${tableCount} tables and ${insertCount} INSERT statements.`);
          
          // Display row counts for each table
          console.log("\n--------- ROWS IMPORTED PER TABLE ---------");
          let totalRows = 0;
          Object.entries(tableRowCounts).forEach(([table, count]) => {
            console.log(`${table}: ${count.toLocaleString()} rows`);
            totalRows += count;
          });
          console.log(`Total: ${totalRows.toLocaleString()} rows`);
          console.log("-------------------------------------------\n");
          
          // Close connections
          db.close((err) => {
            if (err) {
              console.error(`Error closing database: ${err.message}`);
              reject(err);
            } else {
              console.log('Database connection closed.');
              resolve();
            }
          });
        }
      });
      
    } catch (error) {
      console.error('Error during database initialization:', error);
      reject(error);
    }
  });
}

// Run the import
importData()
  .then(() => {
    console.log('Database initialization completed successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Database initialization failed:', err);
    process.exit(1);
  }); 