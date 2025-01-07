package mapdb;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import org.json.JSONArray;
import org.json.JSONObject;

import abcMon.DatabaseDAO;

import javax.sql.DataSource;


public class Mapdb implements DatabaseDAO {

    private DataSource dataSource;
    //Initialize the datasource in construktor
    public Mapdb(DataSource dataSource) {
        this.dataSource = dataSource;
        System.out.println("Mapdb: DataSource initialized");
    }

    //Listing the database table data
    @Override
    public String listDatabase(String dbName, String tableName, String dbShema, int page, int pageSize) {
        int offset = (page - 1) * pageSize;
        // DB query with pagination
        String query = "SELECT * FROM " + dbShema + "." + tableName + " LIMIT ? OFFSET ?";
        // Query for counting all records
        String countQuery = "SELECT COUNT(*) AS total FROM " + dbShema + "." + tableName;
        // Query for counting statuses across the entire table
        String statusCountQuery = "SELECT "
                + "SUM(CASE WHEN RECA_STATUS = 'TBD' THEN 1 ELSE 0 END) AS recaTbdCount, "
                + "SUM(CASE WHEN RECA_STATUS = 'DONE' THEN 1 ELSE 0 END) AS recaDoneCount, "
                + "SUM(CASE WHEN RECA_STATUS = 'WORK' THEN 1 ELSE 0 END) AS recaWorkCount, "
                + "SUM(CASE WHEN RECA_STATUS = 'ERR' THEN 1 ELSE 0 END) AS recaErrCount, "
                + "SUM(CASE WHEN CPY1_STATUS = 'TBD' THEN 1 ELSE 0 END) AS copy1TbdCount, "
                + "SUM(CASE WHEN CPY1_STATUS = 'DONE' THEN 1 ELSE 0 END) AS copy1DoneCount, "
                + "SUM(CASE WHEN CPY1_STATUS = 'WORK' THEN 1 ELSE 0 END) AS copy1WorkCount, "
                + "SUM(CASE WHEN CPY1_STATUS = 'ERR' THEN 1 ELSE 0 END) AS copy1ErrCount, "
                + "SUM(CASE WHEN CPY2_STATUS = 'TBD' THEN 1 ELSE 0 END) AS copy2TbdCount, "
                + "SUM(CASE WHEN CPY2_STATUS = 'DONE' THEN 1 ELSE 0 END) AS copy2DoneCount, "
                + "SUM(CASE WHEN CPY2_STATUS = 'WORK' THEN 1 ELSE 0 END) AS copy2WorkCount, "
                + "SUM(CASE WHEN CPY2_STATUS = 'ERR' THEN 1 ELSE 0 END) AS copy2ErrCount "
                + "FROM " + dbShema + "." + tableName;

        JSONArray jsonArray = new JSONArray();
        JSONObject resultObject = new JSONObject();
        
        try (Connection connection = dataSource.getConnection();
             PreparedStatement countStmt = connection.prepareStatement(countQuery);
             PreparedStatement stmt = connection.prepareStatement(query);
             PreparedStatement statusCountStmt = connection.prepareStatement(statusCountQuery)) {
        	System.out.println("Mapdb: Successful connection");

            // Total record count query
            try (ResultSet rsCount = countStmt.executeQuery()) {
                if (rsCount.next()) {
                    int totalItems = rsCount.getInt("total");
                    resultObject.put("totalItems", totalItems);
                    resultObject.put("totalPages", Math.ceil((double) totalItems / pageSize));
                }
            }

            // Status count query for the entire table
            try (ResultSet rsStatus = statusCountStmt.executeQuery()) {
                if (rsStatus.next()) {
                    JSONObject statusCounts = new JSONObject();
                    statusCounts.put("RECA_STATUS", new JSONObject()
                            .put("TBD", rsStatus.getInt("recaTbdCount"))
                            .put("DONE", rsStatus.getInt("recaDoneCount"))
                            .put("WORK", rsStatus.getInt("recaWorkCount"))
                            .put("ERR", rsStatus.getInt("recaErrCount")));
                    statusCounts.put("CPY1_STATUS", new JSONObject()
                            .put("TBD", rsStatus.getInt("copy1TbdCount"))
                            .put("DONE", rsStatus.getInt("copy1DoneCount"))
                            .put("WORK", rsStatus.getInt("copy1WorkCount"))
                            .put("ERR", rsStatus.getInt("copy1ErrCount")));
                    statusCounts.put("CPY2_STATUS", new JSONObject()
                            .put("TBD", rsStatus.getInt("copy2TbdCount"))
                            .put("DONE", rsStatus.getInt("copy2DoneCount"))
                            .put("WORK", rsStatus.getInt("copy2WorkCount"))
                            .put("ERR", rsStatus.getInt("copy2ErrCount")));
                    resultObject.put("statusCounts", statusCounts);
                }
            }

            // Data query with pagination
            stmt.setInt(1, pageSize);
            stmt.setInt(2, offset);
            try (ResultSet rs = stmt.executeQuery()) {
                ResultSetMetaData metaData = rs.getMetaData();
                int columnCount = metaData.getColumnCount();
                while (rs.next()) {
                    JSONObject jsonObject = new JSONObject();
                    for (int i = 1; i <= columnCount; i++) {
                        String columnName = metaData.getColumnName(i);
                        Object columnValue = rs.getObject(i);
                        jsonObject.put(columnName, columnValue);
                    }
                    jsonArray.put(jsonObject);
                }
            }

            resultObject.put("items", jsonArray);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return resultObject.toString();
    }


 // Searching in table
    @Override
    public String searchDatabase(String selectedDropdown, String searchInput, String shema, String table, String db, int page, int pageSize) {
        int offset = (page - 1) * pageSize;
        //DB query
        StringBuilder sql = new StringBuilder("SELECT * FROM " + shema + "." + table + " WHERE 1=1");
        StringBuilder countQuery = new StringBuilder("SELECT COUNT(*) AS total FROM " + shema + "." + table + " WHERE 1=1");
        JSONArray jsonArray = new JSONArray();
        JSONObject resultObject = new JSONObject();
        
        //If selectedDropdown and searchInput not empty and null append an "AND" parameter to query
        if (selectedDropdown != null && !selectedDropdown.isEmpty() && searchInput != null && !searchInput.isEmpty()) {
            sql.append(" AND ").append(selectedDropdown).append(" = ?");
            countQuery.append(" AND ").append(selectedDropdown).append(" = ?");
        }
        // append limit and offset at the end
        sql.append(" LIMIT ? OFFSET ?");

        try (Connection connection = dataSource.getConnection();
             PreparedStatement countStmt = connection.prepareStatement(countQuery.toString());
             PreparedStatement stmt = connection.prepareStatement(sql.toString())) {

            int totalItems = 0;

            if (selectedDropdown != null && !selectedDropdown.isEmpty() && searchInput != null && !searchInput.isEmpty()) {
                countStmt.setString(1, searchInput);
            }
            try (ResultSet rsCount = countStmt.executeQuery()) {
                if (rsCount.next()) {
                    totalItems = rsCount.getInt("total");
                }
            }

            int paramIndex = 1;
            if (selectedDropdown != null && !selectedDropdown.isEmpty() && searchInput != null && !searchInput.isEmpty()) {
                stmt.setString(paramIndex++, searchInput);
            }
            stmt.setInt(paramIndex++, pageSize);
            stmt.setInt(paramIndex, offset);

            // Fetch paginated data
            try (ResultSet rs = stmt.executeQuery()) {
                ResultSetMetaData metaData = rs.getMetaData();
                int columnCount = metaData.getColumnCount();
                while (rs.next()) {
                    JSONObject jsonObject = new JSONObject();
                    for (int i = 1; i <= columnCount; i++) {
                        String columnName = metaData.getColumnName(i);
                        Object columnValue = rs.getObject(i);
                        jsonObject.put(columnName, columnValue);
                    }
                    jsonArray.put(jsonObject);
                }
            }

            resultObject.put("items", jsonArray);
            resultObject.put("totalItems", totalItems);
            resultObject.put("totalPages", Math.ceil((double) totalItems / pageSize));

        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return resultObject.toString();
    }
}
