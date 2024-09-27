package abc_monitoring_webapp;

import java.sql.SQLException;

public class DbService {

    private DatabaseDAO dbDAO;

    public DbService(String dbConfig) {
        try {
            this.dbDAO = DbDAOFactory.getDatabaseDAO(dbConfig);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    //DB tábla listázása
    public String listDatabase(String dbName, String tableName, String dbShema, int page, int pageSize) {
        return dbDAO.listDatabase(dbName, tableName, dbShema, page, pageSize);
    }
    
  //Keresési funkció
    public String searchDatabase(String selectedDropdown, String searchInput, String shema, String table, String db, int page, int pageSize) {
    	return dbDAO.searchDatabase(selectedDropdown, searchInput, shema, table, db, page, pageSize);
    }
}
