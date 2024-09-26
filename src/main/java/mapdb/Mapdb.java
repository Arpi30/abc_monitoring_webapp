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

    public Mapdb(String dbConfig) throws SQLException {
        this.connection = ConnectionFactory.createConnection(dbConfig);
    }

    @Override
    public String listDatabase(String dbName, String tableName, String dbShema, int page, int pageSize) {
    	int offset = (page - 1) * pageSize;
        String query = "SELECT * FROM " + dbShema + "." + tableName + " LIMIT ? OFFSET ?";
        String countQuery = "SELECT COUNT(*) AS total FROM " + dbShema + "." + tableName;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        JSONArray jsonArray = new JSONArray();
        JSONObject resultObject = new JSONObject(); // Eredmény JSON objektum a visszaadásra

        try {

            // Első lekérdezés: összes rekord számának lekérése
            stmt = connection.prepareStatement(countQuery);
            rs = stmt.executeQuery();
            int totalItems = 0;
            if (rs.next()) {
                totalItems = rs.getInt("total");
            }
            rs.close();
            stmt.close();

            // Második lekérdezés: lapozott adatok lekérése
            stmt = connection.prepareStatement(query);
            stmt.setInt(1, pageSize);
            stmt.setInt(2, offset);
            rs = stmt.executeQuery();

            // Automatikusan bejárjuk a ResultSet sorokat és JSON formába rakjuk
            rs.setFetchSize(Integer.MAX_VALUE); // Opció, beállítjuk a fetch méretet maximumra
            ResultSetMetaData metaData = rs.getMetaData();
            int columnCount = metaData.getColumnCount();

            // ResultSet feldolgozása JSONArray-be
            while (rs.next()) {
                JSONObject jsonObject = new JSONObject();
                for (int i = 1; i <= columnCount; i++) {
                    String columnName = metaData.getColumnName(i);
                    Object columnValue = rs.getObject(i);
                    jsonObject.put(columnName, columnValue);
                }
                jsonArray.put(jsonObject); // Minden sort hozzáadunk a JSON tömbhöz. Eredetileg ezt kell vissza adni!!!!!
            }

            // Eredmény objektum feltöltése
            resultObject.put("items", jsonArray); // Lapozott adatok
            resultObject.put("totalItems", totalItems); // Összes rekord száma
            resultObject.put("totalPages", Math.ceil((double) totalItems / pageSize));

        } catch (SQLException e) {
            e.printStackTrace();
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

        return resultObject.toString(); // Visszatérünk a lapozott adatokkal és az összes rekord számával
    }
    
    @Override
    public String searchDatabase(String selectedDropdown, String searchInput, String shema, String table, String db) {
    	String sql = "SELECT * FROM " + shema + "." + table + " WHERE 1=1";
        PreparedStatement stmt = null;
        ResultSet rs = null;
        JSONArray jsonArray = new JSONArray();
    	
        if (selectedDropdown != null && !selectedDropdown.isEmpty() && searchInput != null && !searchInput.isEmpty()) {
            sql += " AND " + selectedDropdown + " = ?";
        }

        // Paraméterek hozzáadása PreparedStatement-ben
        try {
            stmt = connection.prepareStatement(sql);
            int paramIndex = 1;

            if (selectedDropdown != null && !selectedDropdown.isEmpty() && searchInput != null && !searchInput.isEmpty()) {
                stmt.setString(paramIndex++, searchInput);
            }

            rs = stmt.executeQuery();

            // Automatically iterate over ResultSet rows and put them in JSON
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

        } catch (SQLException e) {
            e.printStackTrace();
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

        return jsonArray.toString();
    }
}
