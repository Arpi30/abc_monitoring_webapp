package abc_monitoring_webapp;

import java.sql.SQLException;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.JSONObject;

//This will be the URL of the endpoint on /db
@Path("/db")
public class DbRouting {

	// Listing of table data
	// Connected to /list with POST method
    @POST
    @Path("/list")
    // The format of the response will be JSON
    @Produces(MediaType.APPLICATION_JSON)
    public Response listDatabase(String jsonInput) throws SQLException {
    	// Convert the input JSON string to JSONObject
        JSONObject jsonObject = new JSONObject(jsonInput);
        // Load configuration file based on database (e.g. dbName.properties)
        String dbConfig = jsonObject.getString("dbName") + ".properties";
        // instantiate the DbService class based on the specified configuration
        DbService dbService = new DbService(dbConfig);
        // Get database and table data via the dbService class
        String dbData = dbService.listDatabase(jsonObject.getString("dbName"), jsonObject.getString("tableName"),jsonObject.getString("dbShema"), jsonObject.getInt("page"), jsonObject.getInt("pageSize"));
        System.out.println(jsonObject);
        // Returns the queried data in JSON format
        return Response.ok(dbData).build();
    }
    
    // Search function
    // The Method is the same as for the previous route
    @POST
    @Path("/search")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchDatabase(String jsonInput) throws SQLException {
    	JSONObject jsonObject = new JSONObject(jsonInput);
    	String dbConfig = jsonObject.getString("db") + ".properties";
    	String shema = jsonObject.getString("shema");
    	String table = jsonObject.getString("table");
    	String db = jsonObject.getString("db");
    	String searchInput = jsonObject.getString("searchInput");
    	String selectedDropdown = jsonObject.getString("selectedDropdown");
    	int page = jsonObject.getInt("page");
    	int pageSize = jsonObject.getInt("pageSize");
    	DbService dbService = new DbService(dbConfig);
    	
    	
    	String searchDbData = dbService.searchDatabase(selectedDropdown, searchInput, shema, table, db, page, pageSize);
    	System.out.println(searchDbData);
    	return Response.ok(searchDbData).build();
    }
}
