package abc_monitoring_webapp;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;
import java.io.InputStream;
import java.io.IOException;

public class ConnectionFactory {

    public static Connection createConnection(String dbConfig) throws SQLException {
    	System.out.println("ConnectionFactory: " + dbConfig);
        Properties props = new Properties();
        try (InputStream input = ConnectionFactory.class.getClassLoader().getResourceAsStream(dbConfig)) {
            if (input == null) {
                throw new IllegalArgumentException("Sorry, unable to find " + dbConfig);
            }
            // Töltsük be a properties fájlt
            // Load the prop files
            props.load(input);
        } catch (IOException e) {
            e.printStackTrace();
            throw new SQLException("Unable to load database properties file: " + dbConfig, e);
        }
        //Get the properties parameters from the properties file
        String url = props.getProperty("db.url");
        String username = props.getProperty("db.user");
        String password = props.getProperty("db.password");
        String driver = props.getProperty("db.driver");
        String sslpath = props.getProperty("db.sslpath");
        String sslpass = props.getProperty("db.sslpass");
        

        System.out.println(url);
        try {
            // Load JDBC driver
            Class.forName(driver);
            System.out.println("ConnectionFactory: **** Loaded the JDBC driver");
            
            Properties connectionProps = new Properties();
            connectionProps.put("user", username);
            connectionProps.put("password", password);
            connectionProps.put("sslConnection", "true");
            connectionProps.put("sslTrustStoreLocation", sslpath);
            connectionProps.put("sslTrustStorePassword", sslpass);

            // display properties
            System.getProperties().list(System.out);
            
            // Adatbázis kapcsolat létrehozása a DriverManager-en keresztül
            //Create the Database connection via Drivermanager
            return DriverManager.getConnection(url, connectionProps);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            throw new SQLException("JDBC Driver not found: " + driver, e);
        } catch (SQLException e) {
            e.printStackTrace();
            throw e; // Továbbdobás, ha probléma lép fel a kapcsolat létrehozásakor
            		 //By the problem throw sqlexpetion	
        }
    }
}
