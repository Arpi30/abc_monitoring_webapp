package abc_monitoring_webapp;

import java.sql.SQLException;

public class DbService {

    private DatabaseDAO dbDAO;
    // Konstruktor, ami egy dbConfig paramétert kap, ami a használt adatbázis konfigurációs fájl
    // Megpróbálja a DbDAOFactory osztály segítségével betölteni a megfelelő adatbázis DAO objektumot
    // Ha hiba történik a DAO létrehozásakor, SQLException kivételt dob
    
	 // Constructor that takes a dbConfig parameter, which is the database configuration file used 
	 // Attempts to load the appropriate database DAO object using the DbDAOFactory class 
	 // If an error occurs when creating the DAO, SQLException is thrown
    public DbService(String dbConfig) throws SQLException {
    	System.out.println("DbService: " + dbConfig);
        try {
        	// DbDAOFactory segítségével inicializálja a dbDAO-t a megadott dbConfig alapján
        	// use DbDAOFactory to initialize dbDAO based on the specified dbConfig
            this.dbDAO = DbDAOFactory.getDatabaseDAO(dbConfig);
        } catch (SQLException e) {
            e.printStackTrace();
            // Új SQLException dobása, amely jelzi, hogy a konfigurációs fájl betöltése nem sikerült
            // Throwing a new SQLException indicating that the configuration file failed to load
            throw new SQLException("Unable to load database properties file: " + dbConfig, e);
        }
    }


    // Meghívja a DAO megfelelő listDatabase metódusát, hogy visszakapja az adatbázis táblák adatait
    // Calls the appropriate DAO listDatabase method to retrieve the database table data
    public String listDatabase(String dbName, String tableName, String dbShema, int page, int pageSize) {
        return dbDAO.listDatabase(dbName, tableName, dbShema, page, pageSize);
    }
    
    // A DAO keresési metódusát hívja meg, hogy lekérdezéseket végezzen az adatbázisban a megadott feltételek alapján
    // Call the DAO's search method to query the database based on the specified criteria
    public String searchDatabase(String selectedDropdown, String searchInput, String shema, String table, String db, int page, int pageSize) {
    	return dbDAO.searchDatabase(selectedDropdown, searchInput, shema, table, db, page, pageSize);
    }
}
