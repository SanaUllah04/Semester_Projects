
public class User {
    private int userID;
    private String name;
    private String email;
    private String password;
    private String role; // "Student" or "Instructor" or "Administrator"
    
    protected Customer_Support customerSupport; // Customer and User Aggregation.

    
    public User()
    {
    	// Default Constructor
    }
    
    
    public User(String name, String email, String password, String role, Customer_Support Object ) {
        this.userID = userID+1;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.customerSupport = Object; // Initialize a new Customer_Support instance
    }

    public int getUserID() {
        return userID;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }

    public String getRole() {
        return role;
    }

    public void updateProfile(String newName, String newEmail, String newPassword) {
        this.name = newName;
        this.email = newEmail;
        this.password = newPassword;
        System.out.println("Profile updated successfully!");
    }

    public void changePassword(String newPassword) {
        this.password = newPassword;
        System.out.println("Password updated successfully!");
    }

    public void deactivateAccount() {
    	// The object deletion code is here...
        System.out.println("Account deactivated.");
    }
 
    
    // Setters
    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
