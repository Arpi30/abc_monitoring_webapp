package abc_monitoring_webapp;

public interface  DatabaseDAO {
    String listDatabase(String dbName, String tableName, String dbShema, int page, int pageSize);
    String searchDatabase(String selectedDropdown, String searchInput, String shema, String table, String db, int page, int pageSize);
}
