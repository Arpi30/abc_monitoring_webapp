package abcMon;

// Interface, amely meghatározza azokat a metódusokat, amelyeket az adatbázissal kapcsolatos műveletekhez kell implementálni
//Interface that defines the methods to be implemented for database operations
public interface DatabaseDAO {

	// List database tables
    // Parameters:
    // dbName - Database name
    // tableName - Table name
    // dbShema - Schema name
    // page - The page number used for pagination in the query
    // pageSize - The page size, i.e. how many records to display per page
    // Return value: A String containing the query data
    String listDatabase(String dbName, String tableName, String dbShema, int page, int pageSize);

    // Database search function
    // Parameters:
    // selectedDropdown - The value of the selected dropdown (e.g. a specific column or filter condition)
    // searchInput - The search expression specified by the user
    // shema - Schema name
    // table - Table name
    // db - Database name
    // page - Number of pages used in pagination
    // pageSize - Page size, i.e. how many records are displayed on a page
    // Return value: A String containing the retrieved data
    String searchDatabase(String selectedDropdown, String searchInput, String shema, String table, String db, int page, int pageSize);
}
