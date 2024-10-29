package abc_monitoring_webapp;

import java.sql.SQLException;

import Testdb2.Testdb2;
import mapdb.Mapdb;

public class DbDAOFactory {
	//building a connection via the properties file
    public static DatabaseDAO getDatabaseDAO(String dbConfig) throws SQLException {
    	System.out.println("DbDAOFactory: " + dbConfig);
    	// with else statement can add more database connection
        if (dbConfig.equals("MAPDB.properties")) {											
            return new Mapdb(dbConfig);
        }else if(dbConfig.equals("TESTDB2.properties")) {
        	return new Testdb2(dbConfig);
        } else {
            throw new IllegalArgumentException("Unknown database config: " + dbConfig);
        }
    }
}
