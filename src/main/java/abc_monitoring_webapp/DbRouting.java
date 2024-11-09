package abc_monitoring_webapp;

import java.sql.SQLException;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.JSONObject;

@Path("/db")
public class DbRouting {

	// Listing of table data
	// Connected to /list with POST method
    @POST
    @Path("/list")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response listDatabase(String jsonInput) throws SQLException {
    	System.out.println("Successful connected to /api/db/list route");
    	//Create a new json object to append the json data
        JSONObject jsonObject = new JSONObject(jsonInput);
        String jndiName = jsonObject.getString("jndiName");
        //Create a new DbService object
        DbService dbService = new DbService(jndiName);
        String dbData = dbService.listDatabase(
                jsonObject.getString("dbName"),
                jsonObject.getString("tableName"),
                jsonObject.getString("dbShema"),
                jsonObject.getInt("page"),
                jsonObject.getInt("pageSize")
        );

        System.out.println("DbRouting: " + jsonObject);
        return Response.ok(dbData).build();
    }

    
    // Search function
    // The Method is the same as for the previous route
    @POST
    @Path("/search")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchDatabase(String jsonInput) throws SQLException {
    	System.out.println("Successful connected to /db/search route");
    	JSONObject jsonObject = new JSONObject(jsonInput);
        String jndiName = jsonObject.getString("jndiName");
        DbService dbService = new DbService(jndiName);

        
        String searchDbData = dbService.searchDatabase(
                jsonObject.getString("shema"),
                jsonObject.getString("table"),
                jsonObject.getString("db"),
                jsonObject.getString("searchInput"),
                jsonObject.getString("selectedDropdown"),
                jsonObject.getInt("page"),
                jsonObject.getInt("pageSize")
        );

        System.out.println(searchDbData);
        return Response.ok(searchDbData).build();
    }
}
