package abcMon;

import java.sql.SQLException;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;


public class ConnectionFactory {

    public static DataSource getDataSource(String jndiName) throws SQLException {
    	//Create a new Context and looking up for a jndiName Datasource
        try {
            InitialContext ctx = new InitialContext();
            System.out.println("Attempting to look up JNDI DataSource with name: " + jndiName);
            //Need to use on localhost
            //DataSource dataSource = (DataSource) ctx.lookup("java:comp/env/" + jndiName);
            //Need to use when the APP hosten on websphere
            DataSource dataSource = (DataSource) ctx.lookup(jndiName);
            System.out.println("JNDI lookup successful for: " + jndiName);

            return dataSource;
          //By the problem throw sqlexpetion
        } catch (NamingException e) {
            e.printStackTrace();
            throw new SQLException("Error in looking up JNDI DataSource: " + jndiName, e);
        }
    }
}
