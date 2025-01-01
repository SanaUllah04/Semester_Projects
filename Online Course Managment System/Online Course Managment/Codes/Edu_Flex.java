
import java.util.Scanner;
import java.util.InputMismatchException;


public class Edu_Flex {
    private static String platformName = "EduFlex Online Learning";
    private static long registeredUsers = 0;
    
    // Simple Association
    private static User users = new User(); 			
    private static Course course = new Course();
 
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("Hello and Welcome to " + platformName + " :)");

        while (true) {
            // Display the menu options
            System.out.println("\nChoose an option:");
            System.out.println("1. Register");
            System.out.println("2. Login");
            System.out.println("3. Course Catalog");
            System.out.println("4. Exit");
            System.out.print("Enter your choice (1, 2, or 3): ");
            System.out.println(); // Outputs a new line

            int choice = 0;
            boolean validChoice = false;
            
            // Ensure only valid integers are accepted
            while (!validChoice) {
                try {
                    choice = scanner.nextInt(); // This may throw InputMismatchException
                    scanner.nextLine(); // Consume the newline
                    if (choice < 1 || choice > 4) {
                        System.out.println("Invalid choice. Please enter a number between 1 and 4.");
                    } else {
                        validChoice = true; // Valid input, exit loop
                    }
                } catch (InputMismatchException e) {
                    System.out.println("Invalid input. Please enter a valid number.");
                    scanner.nextLine(); // Consume the invalid input to avoid infinite loop
                }
            }

            // Process the valid choice
            switch (choice) {
                case 1:
                    registerUser(); // Call the register method
                    break;
                case 2:
                    loginUser(); // Call the login method
                    break;
                case 3:
                    course.printAllCourses(); // Print all courses
                    break;
                case 4:
                    System.out.println("Exiting the system. Goodbye!");
                    scanner.close();
                    return; // Exit the program
                default:
                    System.out.println("Invalid choice. Please try again.");
            
            	}
	
        }
    }

    
    
    
    public static void registerUser() {
        Scanner scanner = new Scanner(System.in);
        
        try {
            System.out.print("Enter Name: ");
            String name = scanner.nextLine();
            System.out.println(); // Outputs a new line

            System.out.print("Enter Email: ");
            String email = scanner.nextLine();
            System.out.println(); // Outputs a new line

            System.out.print("Enter Password: ");
            String password = scanner.nextLine();
            System.out.println(); // Outputs a new line

            // Step 2: Display role options and collect role input
            System.out.println(); // Outputs a new line
            System.out.println(); // Outputs a new line
            System.out.println("Select Role:");
            System.out.println("1. Admin");
            System.out.println("2. Student");
            System.out.println("3. Instructor");

            int roleChoice = 0;
            boolean validRoleChoice = false;

            // Collecting role input with exception handling
            while (!validRoleChoice) {
                System.out.print("Enter your choice (1, 2, or 3): ");
                try {
                    roleChoice = scanner.nextInt();  // This can throw InputMismatchException
                    if (roleChoice < 1 || roleChoice > 3) {
                        System.out.println("Invalid input. Please select 1, 2, or 3.");
                    } else {
                        validRoleChoice = true; // If input is valid, exit the loop
                    }
                } catch (InputMismatchException e) {
                    System.out.println("Invalid input. Please enter a valid number (1, 2, or 3).");
                    scanner.nextLine(); // Consume the invalid input to prevent infinite loop
                }
            }

            // Step 3: Create an object of the respective class based on the role
            switch (roleChoice) {
                case 1:
                    users = new Admin(name, email, password);
                    System.out.println("Admin ["+users.getName()+"] Registered");
                    setRegisteredUsers(getRegisteredUsers() + 1);
                    break;
                case 2:
                    users = new Student(name, email, password);
                    System.out.println("Student ["+users.getName()+"] Registered");
                    setRegisteredUsers(getRegisteredUsers() + 1);
                    break;
                case 3:
                    users = new Instructor(name, email, password);
                    System.out.println("Instructor ["+users.getName()+"] Registered");
                    setRegisteredUsers(getRegisteredUsers() + 1);
                    break;
                default:
                    System.out.println("Registration failed due to invalid role choice.");
                    break;
            }
        } catch (Exception e) {
            System.out.println("An error occurred during registration: " + e.getMessage());
        } finally {
            System.out.println("Registration process completed.");
        }
    }

    
    
    
    public static void loginUser() {
        Scanner scanner = new Scanner(System.in);

        try {
            // Ask for role
            System.out.println(); // Outputs a new line
            System.out.println(); // Outputs a new line
            System.out.println("Select Role:");
            System.out.println("1. Admin");
            System.out.println("2. Student");
            System.out.println("3. Instructor");

            int roleChoice = 0;
            boolean validRoleChoice = false;

            // Collecting role input with exception handling
            while (!validRoleChoice) {
                System.out.print("Enter your choice (1, 2, or 3): ");
                try {
                    roleChoice = scanner.nextInt();  // This can throw InputMismatchException
                    if (roleChoice < 1 || roleChoice > 3) {
                        System.out.println("Invalid input. Please select a valid role.");
                    } else {
                        validRoleChoice = true;
                    }
                } catch (InputMismatchException e) {
                    System.out.println("Invalid input. Please enter a number (1, 2, or 3).");
                    scanner.nextLine(); // Consume the invalid input
                }
            }

            scanner.nextLine(); // Consume the newline

            // Ask for login credentials
            System.out.print("Enter Email: ");
            String email = scanner.nextLine();

            System.out.print("Enter Password: ");
            String password = scanner.nextLine();

            boolean loginSuccess = false;

            // Authenticate based on role
            switch (roleChoice) {
                case 1: // Administrator
                    for (Admin admin : Admin.allAdmins) {
                        if (admin.getEmail().equals(email) && admin.getPassword().equals(password)) {
                            loginSuccess = true;
                            System.out.println("Admin login successful. Welcome, " + admin.getName() + "!");
                            admin.showAdminMenu();
                            break;
                        }
                    }
                    break;
                case 2: // Student
                    for (Student student : Student.allStudents) {
                        if (student.getEmail().equals(email) && student.getPassword().equals(password)) {
                            loginSuccess = true;
                            System.out.println("Student login successful. Welcome, " + student.getName() + "!");
                            student.showStudentMenu();
                            break;
                        }
                    }
                    break;
                case 3: // Instructor
                    for (Instructor instructor : Instructor.allInstructor) {
                        if (instructor.getEmail().equals(email) && instructor.getPassword().equals(password)) {
                            loginSuccess = true;
                            System.out.println("Instructor login successful. Welcome, " + instructor.getName() + "!");
                            instructor.showInstructorMenu();
                            break;
                        }
                    }
                    break;
                default:
                    System.out.println("Invalid role selected.");
                    return;
            }

            if (!loginSuccess) {
                System.out.println("Login failed. Incorrect email or password.");
            }

        } catch (Exception e) {
            System.out.println("An error occurred: " + e.getMessage());
        }
    }


	public static long getRegisteredUsers() {
		return registeredUsers;
	}

	public static void setRegisteredUsers(long registeredUsers) {
		Edu_Flex.registeredUsers = registeredUsers;
	}
}
