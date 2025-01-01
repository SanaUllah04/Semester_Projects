import java.util.ArrayList;
import java.util.Scanner;
import java.util.List;


					// Inheritance
public class Instructor extends User {
    public static List<Instructor> allInstructor = new ArrayList<>();
    private int createdCourses = 0;
    private static int studentEngagementMetrics = 0;
    
    
    // Simple Association
    private Course course;		
    private Analytics_Dashboard board = new Analytics_Dashboard();

    
    public Instructor(String name, String email, String password) {
        super(name, email, password, "Instructor", new Customer_Support());
        
        studentEngagementMetrics += 1;
        allInstructor.add(this);
    }

    
    public void showInstructorMenu() {
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("\n--- Instructor Menu ---");
            System.out.println("1. Create Course");
            System.out.println("2. Manage Course");
            System.out.println("3. View Engagement");
            System.out.println("4. My Courses");
            System.out.println("5. View Course Reviews");
            System.out.println("6. Customer Support");
            System.out.println("7. Sold Courses");
            System.out.println("8. Logout");
            System.out.print("Enter your choice: ");

            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume the newline

            switch (choice) {
                case 1:
                    createCourse();
                    break;
                case 2:
                    manageCourse();
                    break;
                case 3:
                    viewEngagementMetrics();
                    break;
                case 4:
                    viewMyCourses(super.getUserID());
                    break;
                case 5:
                    viewCourseReviews();
                    break;
                case 6:
                    super.customerSupport.CustomerSupportMenu();
                    break;
                case 7:
                	viewPayment(super.getUserID());
                    break;
                case 8:
                    System.out.println("Logging out...");
                    return;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }
     
    
    public void viewCourseReviews() {
        // Find courses created by this instructor
        List<Course> instructorCourses = new ArrayList<>();
        for (Course course : Course.allCourses) {
            if (course.getInstructorID() == super.getUserID()) {
                instructorCourses.add(course);
            }
        }

        // Check if instructor has any courses
        if (instructorCourses.isEmpty()) {
            System.out.println("You have not created any courses yet.");
            return;
        }

        // Display courses and their reviews
        System.out.println("\n--- Reviews for Your Courses ---");
        for (Course course : instructorCourses) {
            System.out.println("\nCourse: " + course.getCourseTitle());

            // Get reviews for this course
            List<Review> courseReviews = course.getReviews();

            // Ensure courseReviews is not null before proceeding
            if (courseReviews == null || courseReviews.isEmpty()) {
                System.out.println("No reviews for this course yet.");
                continue;
            }

            // Display course statistics
            System.out.printf("Average Rating: %.2f (Total Reviews: %d)\n", 
                              course.getAverageRating(), 
                              courseReviews.size());

            // Display individual reviews
            for (Review review : courseReviews) {
                System.out.println("\nReview ID: " + review.getReviewID());
                System.out.println("Rating: " + review.getRating());
                System.out.println("Comment: " + review.getComment());
                System.out.println("User ID: " + review.getUserID());
            }
        }
    }

     
    public void createCourse() {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter course title: ");
        String title = scanner.nextLine();

        System.out.print("Enter course description: ");
        String description = scanner.nextLine();
        
        System.out.print("Set Price: ");
        int price = scanner.nextInt();

        course = new Course(title, description, price, super.getUserID(), new Course_Content(), new Payment(), new Certificate()); 
        Course.allCourses.add(course);

        System.out.println("Course created successfully!");
        System.out.println(course); // Display course details
        createdCourses = createdCourses+1;
        studentEngagementMetrics = studentEngagementMetrics +1;
    }

    
    public static void manageCourse() {
        Scanner scanner = new Scanner(System.in);
        
        // Presenting a menu to choose what action to perform
        System.out.println("\n--- Manage Course Menu ---");
        System.out.println("1. Update Course");
        System.out.println("2. Delete Course");
        System.out.println("3. Go Back");
        System.out.print("Enter your choice: ");

        int choice = scanner.nextInt();
        scanner.nextLine(); // Consume the newline
        
        switch (choice) {
            case 1:
                updateCourse();  // Call the update course method
                break;
            case 2:
                deleteCourse();  // Call the delete course method
                break;
            case 3:
                System.out.println("Going back to the previous menu.");
                return;  // Go back to the previous menu
            default:
                System.out.println("Invalid choice. Please try again.");
                manageCourse();  // Re-call manageCourse() if invalid choice
                break;
        }
    }

    // Method to update course details
    public static void updateCourse() {
        Scanner scanner = new Scanner(System.in);

        // Prompt instructor to select a course to update
        System.out.print("Enter the Course ID to update: ");
        int courseID = scanner.nextInt();
        scanner.nextLine();  // Consume the newline
        
        // Search for the course
        Course courseToUpdate = null;
        for (Course course : Course.allCourses) {
            if (course.getCourseID() == courseID) {
                courseToUpdate = course;
                break;
            }
        }
        
        if (courseToUpdate == null) {
            System.out.println("Course not found. Please try again.");
            return;
        }

        // Display options for updating the course
        System.out.println("\n--- Update Course ---");
        System.out.println("1. Update Title");
        System.out.println("2. Update Description");
        System.out.println("3. Update Price");
        System.out.println("4. Go Back");
        System.out.print("Enter your choice: ");
        
        int updateChoice = scanner.nextInt();
        scanner.nextLine();  // Consume the newline
        
        switch (updateChoice) {
            case 1:
                System.out.print("Enter new course title: ");
                String newTitle = scanner.nextLine();
                courseToUpdate.setCourseTitle(newTitle);  // Update title
                System.out.println("Course title updated successfully.");
                break;
            case 2:
                System.out.print("Enter new course description: ");
                String newDescription = scanner.nextLine();
                courseToUpdate.setDescription(newDescription);  // Update description
                System.out.println("Course description updated successfully.");
                break;
            case 3:
                System.out.print("Enter new course price: ");
                int newPrice = scanner.nextInt();
                courseToUpdate.setPrice(newPrice);  // Update price
                System.out.println("Course price updated successfully.");
                break;
            case 4:
                System.out.println("Going back to the previous menu.");
                return;
            default:
                System.out.println("Invalid choice. Please try again.");
                updateCourse();  // Re-call updateCourse() if invalid choice
                break;
        }
    }

  
    // Method to delete a course
    public static void deleteCourse() {
        Scanner scanner = new Scanner(System.in);

        // Prompt instructor to enter the course ID to delete
        System.out.print("Enter the Course ID to delete: ");
        int courseID = scanner.nextInt();
        scanner.nextLine();  // Consume the newline

        // Search and delete the course
        Course courseToDelete = null;
        for (Course course : Course.allCourses) {
            if (course.getCourseID() == courseID) {
                courseToDelete = course;
                break;
            }
        }

        if (courseToDelete == null) {
            System.out.println("Course not found. Please try again.");
            return;
        }

        // Remove course from the list
        Course.allCourses.remove(courseToDelete);
        System.out.println("Course deleted successfully.");
    }

    
    public  void viewEngagementMetrics() {
    		board.viewEngagementStats();
    }
    
    public void viewMyCourses(int instructorID) {
        System.out.println("\n--- My Created Courses ---");
        boolean foundCourse = false;

        for (Course course : Course.allCourses) {
            if (course.getInstructorID() == instructorID) {  // Check if the course was created by this instructor
                System.out.println(course);  // Calls the toString() method of Course
                foundCourse = true;
            }
        }

        if (!foundCourse) {
            System.out.println("No courses created by you yet.");
        }
    }
    

    public void viewPayment(int instructorID) {
        System.out.println("\n--- Payments for Your Courses ---");

        for (Course course : Course.allCourses) {
            if (course.getInstructorID() == instructorID) {  // Check if the course was created by this instructor
                break;
            } 
            else {
            	System.out.println("You have not created any course");
            	return;
            }
        }
		        List<Payment> payments = Course.getpayments();  // Assuming `getPayments()` returns the payment list for the course
                
                if (payments != null && !payments.isEmpty()) 
                {
		                    for (Payment payment : payments) 
		                    {
		                    		System.out.println();
		                    		System.out.println();
		                    		System.out.println("Course  ID: " + payment.getCourseID());
			                        System.out.println("Payment ID: " + payment.getPaymentID());
			                        System.out.println("Amount    : " + payment.getAmount());
			                        System.out.println("Date      : " + payment.getPaymentDate());
			                        System.out.println("Student ID: " + payment.getStudentID());
			                        System.out.println("-----------------------");
		                    }
                    }
                
                else {
                	System.out.println("No Courses Sold");
                }
    }


    // Getter methods
    public static List<Instructor> getAllInstructors() {
        return allInstructor;
    }
}