package abcMon;

import java.sql.SQLException;


public class DbService {

    private DatabaseDAO dbDAO;

     // Constructor that takes a jndiName parameter, which is the database configuration file used 
 	 // Attempts to load the appropriate database DAO object using the DbDAOFactory class 
 	 // If an error occurs when creating the DAO, SQLException is thrown
    public DbService(String jndiName) throws SQLException {
    	try {
    		System.out.println("DbService: " + jndiName);
            this.dbDAO = DbDAOFactory.getDatabaseDAO(jndiName);
            System.out.println("DbService: DbDAOFactory take the jndiName Data source");
    	}catch (SQLException e) {
            e.printStackTrace();
            // Throwing a new SQLException indicating that the configuration file failed to load
            throw new SQLException("DbService: Unable to load jndiName Datasource " + jndiName, e);
        }
        
    }
    // Calls the appropriate DAO listDatabase method to retrieve the database table data
    public String listDatabase(String dbName, String tableName, String dbShema, int page, int pageSize) {
        return dbDAO.listDatabase(dbName, tableName, dbShema, page, pageSize);
    }
    // Call the DAO's search method to query the database based on the specified criteria
    public String searchDatabase(String shema, String table, String db, String searchInput, String selectedDropdown, int page, int pageSize) {
        return dbDAO.searchDatabase(selectedDropdown, searchInput, shema, table, db, page, pageSize);
    }
}
