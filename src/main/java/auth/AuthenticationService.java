package auth;

import javax.security.auth.callback.CallbackHandler;
import javax.security.auth.login.LoginContext;
import javax.security.auth.login.LoginException;

public class AuthenticationService {

    public boolean authenticateUser(String username, String password) {
        try {
            CallbackHandler handler = new CustomCallbackHandler(username, password);
            LoginContext context = new LoginContext("WSLogin", handler);
            context.login();
            return true; // Successful authentication
        } catch (LoginException e) {
            e.printStackTrace();
            return false; // Authentication failed
        }
    }
}
