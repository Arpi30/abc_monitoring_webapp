package abcMon;

import java.sql.SQLException;
import javax.sql.DataSource;
import mapdb.Mapdb;

public class DbDAOFactory {
	//Building the connection via Datasource
    public static DatabaseDAO getDatabaseDAO(String jndiName) throws SQLException {
        System.out.println("DbDAOFactory: " + jndiName);
        
        DataSource dataSource = ConnectionFactory.getDataSource(jndiName);
        //Specify the jndiName data source. We can add a new data source with else if statement.
        if ("jdbc/sy27conn.db".equals(jndiName)) {
        	System.out.println("DbDAOFactory: Mapdb database identification with Data source => jdbc/sy27conn.db");
            return new Mapdb(dataSource);
        } else {
            throw new IllegalArgumentException("Unknown JNDI name: " + jndiName);
        }
    }
}
