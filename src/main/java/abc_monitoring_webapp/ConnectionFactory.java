package abc_monitoring_webapp;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;
import java.io.InputStream;
import java.io.IOException;

public class ConnectionFactory {

    public static Connection createConnection(String dbConfig) throws SQLException {
        Properties props = new Properties();
        try (InputStream input = ConnectionFactory.class.getClassLoader().getResourceAsStream(dbConfig)) {
            if (input == null) {
                throw new IllegalArgumentException("Sorry, unable to find " + dbConfig);
            }
            // Töltsük be a properties fájlt
            props.load(input);
        } catch (IOException e) {
            e.printStackTrace();
        }

        String url = props.getProperty("db.url");
        String username = props.getProperty("db.user");
        String password = props.getProperty("db.password");
        String driver = props.getProperty("db.driver");

        try {
            // JDBC driver betöltése
            Class.forName(driver);

            // Adatbázis kapcsolat létrehozása a DriverManager-en keresztül
            return DriverManager.getConnection(url, username, password);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            throw new SQLException("JDBC Driver not found: " + driver, e);
        } catch (SQLException e) {
            e.printStackTrace();
            throw e; // Továbbdobás, ha probléma lép fel a kapcsolat létrehozásakor
        }
    }
}
