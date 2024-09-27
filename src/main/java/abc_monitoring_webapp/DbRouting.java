package abc_monitoring_webapp;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.JSONObject;

@Path("/db")
public class DbRouting {

	//Kilistázza egy tábla adatait
    @POST
    @Path("/list")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listDatabase(String jsonInput) {
        JSONObject jsonObject = new JSONObject(jsonInput);
        String dbConfig = jsonObject.getString("dbName") + ".properties";
        DbService dbService = new DbService(dbConfig);
        String dbData = dbService.listDatabase(jsonObject.getString("dbName"), jsonObject.getString("tableName"),jsonObject.getString("dbShema"), jsonObject.getInt("page"), jsonObject.getInt("pageSize"));
        return Response.ok(dbData).build();
    }
    
  //3. /Saerch - Keresési funkció
    @POST
    @Path("/search")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchDatabase(String jsonInput) {
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
