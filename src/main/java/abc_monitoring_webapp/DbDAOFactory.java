package abc_monitoring_webapp;

import java.sql.SQLException;

import Testdb2.Testdb2;
import mapdb.Mapdb;

public class DbDAOFactory {

    public static DatabaseDAO getDatabaseDAO(String dbConfig) throws SQLException {
        if (dbConfig.equals("MAPDB.properties")) {											// with else can add more database connection
            return new Mapdb(dbConfig);
        }else if(dbConfig.equals("TESTDB2.properties")) {
        	return new Testdb2(dbConfig);
        } else {
            throw new IllegalArgumentException("Unknown database config: " + dbConfig);
        }
    }
}
