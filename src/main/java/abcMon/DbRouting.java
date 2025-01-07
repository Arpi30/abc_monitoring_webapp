package abcMon;

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
    
 // Login method
    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(String jsonInput) {
        System.out.println("Successful connected to /db/login route");

        // Parse the incoming JSON input
        JSONObject jsonObject = new JSONObject(jsonInput);
        String username = jsonObject.getString("user");
        String password = jsonObject.getString("password");

        try {
            // Authenticate the user (WebSphere's JAAS, LDAP, or custom logic can be used here)
            if (authenticateUser(username, password)) {
                // Return success message
                JSONObject successResponse = new JSONObject();
                successResponse.put("message", "Login successful");
                return Response.ok(successResponse.toString()).build();
            } else {
                // Return failure message for incorrect credentials
                JSONObject errorResponse = new JSONObject();
                errorResponse.put("message", "Invalid username or password");
                return Response.status(Response.Status.UNAUTHORIZED).entity(errorResponse.toString()).build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            // Return server error if any exception occurs
            JSONObject errorResponse = new JSONObject();
            errorResponse.put("message", "An error occurred during login");
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorResponse.toString()).build();
        }
    }

    // Helper method for user authentication
    private boolean authenticateUser(String username, String password) {
        // Placeholder for WebSphere authentication or custom logic
        // Example: Use WebSphere's JAAS or a standalone mechanism
        // Here, we'll use a simple hardcoded check for demonstration
        return "adminUser".equals(username) && "admin".equals(password);
    }

}
