package mapdb;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import org.json.JSONArray;
import org.json.JSONObject;

import abc_monitoring_webapp.ConnectionFactory;
import abc_monitoring_webapp.DatabaseDAO;

public class Mapdb implements DatabaseDAO {

    private Connection connection;
    // Constructor that creates the database connection based on the given configuration file.
    public Mapdb(String dbConfig) throws SQLException {
        this.connection = ConnectionFactory.createConnection(dbConfig);
        System.out.println("Mapdb: **** Created a JDBC connection to the data source");
    }

    // The 'listDatabase' method lists the data of a database table, with pagination.
    @Override
    public String listDatabase(String dbName, String tableName, String dbShema, int page, int pageSize) {
    	System.out.println(dbName);
    	System.out.println(dbShema);
    	System.out.println(tableName);
    	// Calculate offset based on current page (page) and page size (pageSize) .
    	int offset = (page - 1) * pageSize;
    	// SQL query that returns a limited number of rows (LIMIT) from a given starting point (OFFSET).
        String query = "SELECT * FROM " + dbShema + "." + tableName + " LIMIT ? OFFSET ?";
        // Another query that counts all rows in the table.
        String countQuery = "SELECT COUNT(*) AS total FROM " + dbShema + "." + tableName;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        // A JSON array containing the results.
        JSONArray jsonArray = new JSONArray();
        // The final result is an object that is returned.
        JSONObject resultObject = new JSONObject();

        try {
        	// Query the number of records (total number of elements).
            stmt = connection.prepareStatement(countQuery);
            System.out.println("Mapdb: **** Created JDBC Statement object");
            rs = stmt.executeQuery();
            System.out.println("Mapdb: **** Created JDBC ResultSet object");
            int totalItems = 0;
            if (rs.next()) {
            	// Sets the total number of elements.
                totalItems = rs.getInt("total");
            }
            rs.close();
            stmt.close();
            // The actual data query that limits the rows returned (using LIMIT and OFFSET).
            stmt = connection.prepareStatement(query);
            stmt.setInt(1, pageSize);
            stmt.setInt(2, offset);
            rs = stmt.executeQuery();
            
            rs.setFetchSize(Integer.MAX_VALUE);
            // Get metadata containing column names and column numbers.
            ResultSetMetaData metaData = rs.getMetaData();
            int columnCount = metaData.getColumnCount();
            // Processing the result of the query.
            while (rs.next()) {
                JSONObject jsonObject = new JSONObject();
                for (int i = 1; i <= columnCount; i++) {
                    String columnName = metaData.getColumnName(i);
                    Object columnValue = rs.getObject(i);
                    jsonObject.put(columnName, columnValue);
                }
                // Adds the object to the JSON array.
                jsonArray.put(jsonObject);
            }
            System.out.println("Mapdb: **** Fetched all rows from JDBC ResultSet");
            // The result is a JSON object containing the records and paging data.
            resultObject.put("items", jsonArray);
            resultObject.put("totalItems", totalItems);
            resultObject.put("totalPages", Math.ceil((double) totalItems / pageSize));

        } catch (SQLException e) {
            e.printStackTrace();
         // Close resources (ResultSet, PreparedStatement, Connection).
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (stmt != null) {
                    stmt.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        // Return the result JSON object in string format.
        return resultObject.toString();
    }
    
    
    
    // The 'searchDatabase' method searches the database for the given conditions.
    @Override
    public String searchDatabase(String selectedDropdown, String searchInput, String shema, String table, String db, int page, int pageSize) {
    	// Count the offset
        int offset = (page - 1) * pageSize;
        //Basic query with shema and table parameter
        String sql = "SELECT * FROM " + shema + "." + table + " WHERE 1=1";
        String countQuery = "SELECT COUNT(*) AS total FROM " + shema + "." + table + " WHERE 1=1";
        PreparedStatement stmt = null;
        ResultSet rs = null;
        //Create a Json array and object
        JSONArray jsonArray = new JSONArray();
        JSONObject resultObject = new JSONObject();
        int totalItems = 0;

        // If there is a dropdown and search input selected, it will add the condition to the query.
        if (selectedDropdown != null && !selectedDropdown.isEmpty() && searchInput != null && !searchInput.isEmpty()) {
        	// Add condition to SQL query and counting the rekord.
            sql += " AND " + selectedDropdown + " = ?";
            countQuery += " AND " + selectedDropdown + " = ?";
        }

        try {
            stmt = connection.prepareStatement(countQuery);
            if (selectedDropdown != null && !selectedDropdown.isEmpty() && searchInput != null && !searchInput.isEmpty()) {
                stmt.setString(1, searchInput);
            }
            rs = stmt.executeQuery();
            if (rs.next()) {
                totalItems = rs.getInt("total");
            }
            rs.close();
            stmt.close();
            // Adds LIMIT and OFFSET conditions to the SQL query.
            sql += " LIMIT ? OFFSET ?";
            stmt = connection.prepareStatement(sql);
            int paramIndex = 1;
            // Set the search condition value.
            if (selectedDropdown != null && !selectedDropdown.isEmpty() && searchInput != null && !searchInput.isEmpty()) {
                stmt.setString(paramIndex++, searchInput);
            }
            // Set the pageSize and offset
            stmt.setInt(paramIndex++, pageSize);
            stmt.setInt(paramIndex, offset);

            rs = stmt.executeQuery();
            //Get metadata (e.g. column name and number)
            ResultSetMetaData metaData = rs.getMetaData();
            int columnCount = metaData.getColumnCount();
            while (rs.next()) {
                JSONObject jsonObject = new JSONObject();
                for (int i = 1; i <= columnCount; i++) {
                    String columnName = metaData.getColumnName(i);
                    Object columnValue = rs.getObject(i);
                    jsonObject.put(columnName, columnValue);
                }
                // Adds the object containing the rows to the JSON array.
                jsonArray.put(jsonObject);
            }
            // Compiling a result object.
            resultObject.put("items", jsonArray);
            resultObject.put("totalItems", totalItems);
            resultObject.put("totalPages", Math.ceil((double) totalItems / pageSize));

        } catch (SQLException e) {
            e.printStackTrace();
         // Close resources (ResultSet, PreparedStatement, Connection).    
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (stmt != null) {
                    stmt.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        // Return the result JSON object in string format.
        return resultObject.toString();
    }
}
