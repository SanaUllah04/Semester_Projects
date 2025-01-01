import java.util.ArrayList;
import java.util.Scanner;
import java.util.List;

				// Inheritance
public class Admin extends User {
			// Simple Association
    private static Analytics_Dashboard board;
    public static List<Admin> allAdmins = new ArrayList<>();
    
    
    public Admin(String name, String email, String password) {
        super(name, email, password, "Admin", new Customer_Support());
        allAdmins.add(this);
    }

    public void showAdminMenu() {
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("\n--- Admin Menu ---");
            System.out.println("1. Monitor Platform");
            System.out.println("2. Manage Users");
            System.out.println("3. Generate Reports");
            System.out.println("4. View All Users");
            System.out.println("5. Customer Support");
            System.out.println("6. LogOut");
            System.out.print("Enter your choice: ");

            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume the newline

            switch (choice) {
                case 1:
                    monitorPlatform();
                    break;
                case 2:
                    manageUsers();
                    break;
                case 3:
                    generateReports();
                    break;
                case 4:
                    viewAllUsers();
                    break;
                case 5:
                    super.customerSupport.CustomerSupportMenu();
                    break;
                case 6:
                    System.out.println("Logging out...");
                    return; // Return to main menu
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }

    public static void manageUsers() {
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("\n--- User Management Menu ---");
            System.out.println("1. Add User");
            System.out.println("2. Delete User");
            System.out.println("3. Update User");
            System.out.println("4. Go Back");
            System.out.print("Enter your choice: ");

            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume the newline

            switch (choice) {
                case 1:
                    addUser();
                    break;
                case 2:
                    deleteUser();
                    break;
                case 3:
                    updateUser();
                    break;
                case 4:
                    return; // Go back to the main admin menu
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }

    public static void addUser() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("\n--- Add User ---");
        System.out.println("Enter User Type (Student/Instructor/Admin): ");
        String userType = scanner.nextLine();

        System.out.print("Enter Name: ");
        String name = scanner.nextLine();
        System.out.print("Enter Email: ");
        String email = scanner.nextLine();
        System.out.print("Enter Password: ");
        String password = scanner.nextLine();

        // Centralized user addition method
        addUserByType(userType, name, email, password);
    }

    private static void addUserByType(String userType, String name, String email, String password) {
        switch (userType.toLowerCase()) {
            case "student":
                User userStudent = new Student(name, email, password);
                System.out.println("Student ["+userStudent.getName()+"] Registered");
                break;
            case "instructor":
            	User userInstructor = new Instructor(name, email, password);
                System.out.println("Instructor ["+userInstructor.getName()+"] Registered");
                break;
            case "admin":
            	User userAdmin = new Admin(name, email, password);
                System.out.println("Admin ["+userAdmin.getName()+"] Registered");
                break;
            default:
                System.out.println("Invalid user type.");
        }
    }

    public static void deleteUser() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("\n--- Delete User ---");
        System.out.print("Enter User Type (Student/Instructor/Admin): ");
        String userType = scanner.nextLine();
        System.out.print("Enter User Email to Delete: ");
        String email = scanner.nextLine();

        // Centralized user deletion method
        boolean userDeleted = deleteUserByType(userType, email);

        if (!userDeleted) {
            System.out.println("No user found with the provided email.");
        }
    }

    private static boolean deleteUserByType(String userType, String email) {
        switch (userType.toLowerCase()) {
            case "student":
                return deleteSpecificUser(Student.getAllStudents(), email);
            case "instructor":
                return deleteSpecificUser(Instructor.getAllInstructors(), email);
            case "admin":
                return deleteSpecificUser(allAdmins, email);
            default:
                System.out.println("Invalid user type.");
                return false;
        }
    }

    private static <T extends User> boolean deleteSpecificUser(List<T> userList, String email) {
        for (T user : userList) {
            if (user.getEmail().equalsIgnoreCase(email)) {
                userList.remove(user);
                System.out.println("Deletion successfully.");
                return true;
            }
        }
        return false;
    }
    
    public static void updateUser() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("\n--- Update User ---");
        System.out.print("Enter User Type (Student/Instructor/Admin): ");
        String userType = scanner.nextLine();
        System.out.print("Enter User Email to Update: ");
        String email = scanner.nextLine();

        // Centralized user update method
        boolean userUpdated = updateUserByType(userType, email);

        if (!userUpdated) {
            System.out.println("No user found with the provided email.");
        }
    }

    private static boolean updateUserByType(String userType, String email) {

        switch (userType.toLowerCase()) {
            case "student":
                return updateSpecificUser(Student.getAllStudents(), email);
            case "instructor":
                return updateSpecificUser(Instructor.getAllInstructors(), email);
            case "admin":
                return updateSpecificUser(allAdmins, email);
            default:
                System.out.println("Invalid user type.");
                return false;
        }
    }

    private static <T extends User> boolean updateSpecificUser(List<T> userList, String email) {
        Scanner scanner = new Scanner(System.in);

        for (T user : userList) {
            if (user.getEmail().equalsIgnoreCase(email)) {
                System.out.print("Enter New Name: ");
                user.setName(scanner.nextLine());
                System.out.print("Enter New Password: ");
                user.setPassword(scanner.nextLine());
                System.out.println("Updation successfull.");
                return true;
            }
        }
        return false;
    }

    public static void generateReports() {
        System.out.println("Admin is generating revenue reports...");
        board.generateReports();
    }

    public static void monitorPlatform() {
        System.out.println("Opening Analytical DashBoard");
        board = new Analytics_Dashboard();
        board.viewEngagementStats();
    }

    public static void viewAllUsers() {
        System.out.println("\n--- View All Users ---");

        // Display all students
        System.out.println("\n--- All Students ---");
        printUserList(Student.getAllStudents());

        // Display all instructors
        System.out.println("\n--- All Instructors ---");
        printUserList(Instructor.getAllInstructors());

        // Display all admins
        System.out.println("\n--- All Admins ---");
        printUserList(allAdmins);
    }

    private static <T extends User> void printUserList(List<T> userList) {
        if (userList.isEmpty()) {
            System.out.println("No users available.");
        } else {
            for (T user : userList) {
                System.out.println("Name: " + user.getName() + ", Email: " + user.getEmail());
            }
        }
    }
}