import java.util.ArrayList;
import java.util.Scanner;
import java.util.List;


				// Inheritance
public class Student extends User {
    public static List<Student> allStudents = new ArrayList<>();
    
    private ArrayList<Enrollment> enrollments;

    
    
    
    // Simple Association
    private Recommendation_Engine engine = new Recommendation_Engine();  // Engine + Student
    private Course course;  	// Use-cases are below					// Course + Student
    private Payment pay;       	// Use-case is below					// Payment + Student
    private ArrayList<Certificate> certificates;
    private ArrayList<Review> reviews;    

    // Composition
    Enrollment enroll;
    
    
    public Student(String name, String email, String password) {
        super(name, email, password, "Student", new Customer_Support());
        this.enrollments = new ArrayList<>();
        this.certificates = new ArrayList<>();
        this.reviews = new ArrayList<>();
        allStudents.add(this);
        enroll = new Enrollment();
    }
    
    public void showStudentMenu() {
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("\n--- Student Menu ---");
            System.out.println("1. Enroll In Course");
            System.out.println("2. Track Progress");
            System.out.println("3. Download Certificate");
            System.out.println("4. Manage Reviews");
            System.out.println("5. Recommend Courses");
            System.out.println("6. Customer Support");
            System.out.println("7. Logout");
            System.out.print("Enter your choice: ");

            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume the newline

            switch (choice) {
                case 1:
                    enrollInCourse(super.getUserID());
                    break;
                case 2:
                    trackProgress();
                    break;
                case 3:
                    downloadCertificate();
                    break;
                case 4:
                    manageReviews();
                    break;
                case 5:
                    engine.generateRecommendations(super.getUserID());
                    break;
                case 6:
                    super.customerSupport.CustomerSupportMenu();;
                    break;
                case 7:
                    System.out.println("Logging out...");
                    return;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }
    
    

    public void enrollInCourse(int studentID) {
    	
    	
        Scanner scanner = new Scanner(System.in);
        
        // Display all available courses
        System.out.println("\n--- Available Courses ---");
        if (Course.allCourses.isEmpty()) {
            System.out.println("No courses available at the moment.");
            return;
        }
        
        // Print all courses with details
        for (Course course : Course.allCourses) {
            System.out.println("Course ID: " + course.getCourseID() + 
                               ", Title: " + course.getCourseTitle() + 
                               ", Price: $" + course.getPrice());
        }
        
        // Prompt for course selection
        System.out.print("\nEnter the Course ID you want to enroll in: ");
        int courseID = scanner.nextInt();
        scanner.nextLine(); // Consume newline
        
        
        
    	
    	// Check if the student is already enrolled
        for (Enrollment enrollment : enrollments) {
            if (enrollment.getStudentID() == studentID && enrollment.getCourseID() == courseID) {
                System.out.println("Student is already enrolled in this course.");
                return;
            }
        }
        
        
        
        
        // Find the selected course
        Course selectedCourse = null;
        for (Course course : Course.allCourses) {
            if (course.getCourseID() == courseID) {
                selectedCourse = course;
                break;
            }
        }
        
        // Validate course selection
        if (selectedCourse == null) {
            System.out.println("Invalid Course ID. Enrollment failed.");
            return;
        }
        
      
        
        // Prompt for payment confirmation
        System.out.println("\nCourse Details:");
        System.out.println("Title: " + selectedCourse.getCourseTitle());
        System.out.println("Description: " + selectedCourse.getDescription());
        System.out.println("Price: $" + selectedCourse.getPrice());
        
        System.out.print("\nConfirm enrollment? (yes/no): ");
        String confirmation = scanner.nextLine().toLowerCase();
        
        if(confirmation.equals("yes"))
        {
        	 Payment.processPayment(selectedCourse.getPrice(), studentID, courseID);
             System.out.println("Payment Recieved");
        
             // Create enrollment
            Enrollment newEnrollment = new Enrollment(this.getUserID(), courseID);
            enroll = newEnrollment;
            enrollments.add(enroll);
            System.out.println("Successfully enrolled in the course!");
        } 
        
        else {
            System.out.println("Enrollment cancelled.");
        }
        
        
        
      //Generate a certificate for the enrolled student
      Certificate certificate = new Certificate();
      certificate.generateCertificate(studentID, courseID);
      certificates.add(certificate);
      System.out.println("Certificate generated for student.");
    }
    

    public void trackProgress() {
        System.out.println("--- Your Enrolled Courses ---");
        if (enrollments.isEmpty()) {
            System.out.println("You are not enrolled in any courses.");
            return;
        }
        
        for (Enrollment enrollment : enrollments) {
            // Find the corresponding course
            for (Course course : Course.allCourses) {
                if (course.getCourseID() == enrollment.getCourseID()) {
                    System.out.println("Course: " + course.getCourseTitle());
                    // Add more progress tracking details if needed
                    break;
                }
            }
        }
    }

 
    public void downloadCertificate() {
    	
    	if(enrollments.isEmpty())
    	{
            System.out.println("\nU are not inrolled in any course");
            return;
    	}
    	
    
        Certificate certificate = new Certificate();
        certificate.downloadCertificate();
    }

    
 
    // REVIEW
    public void manageReviews() {
        Scanner scanner = new Scanner(System.in);
        
        while (true) {
            System.out.println("\n--- Review Management ---");
            System.out.println("1. Submit a Review");
            System.out.println("2. View My Reviews");
            System.out.println("3. Edit a Review");
            System.out.println("4. Delete a Review");
            System.out.println("5. Return to Main Menu");
            System.out.print("Enter your choice: ");
            
            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume newline
            
            switch (choice) {
                case 1:
                    submitReview();
                    break;
                case 2:
                    viewMyReviews();
                    break;
                case 3:
                    editReview();
                    break;
                case 4:
                    deleteReview();
                    break;
                case 5:
                    return;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }

    private void submitReview() {
        Scanner scanner = new Scanner(System.in);

        // Check if student is enrolled in any courses
        if (enrollments.isEmpty()) {
            System.out.println("You must be enrolled in a course to submit a review.");
            return;
        }

        // Display enrolled courses
        System.out.println("--- Your Enrolled Courses ---");
        for (Enrollment enrollment : enrollments) {
            for (Course course : Course.allCourses) {
                if (course.getCourseID() == enrollment.getCourseID()) {
                    System.out.println("Course ID: " + course.getCourseID() +
                                       ", Title: " + course.getCourseTitle());
                }
            }
        }

        // Prompt for course selection
        System.out.print("\nEnter the Course ID you want to review: ");
        int courseID = scanner.nextInt();
        scanner.nextLine(); // Consume newline

        // Validate course selection
        Course selectedCourse = null;
        for (Course course : Course.allCourses) {
            if (course.getCourseID() == courseID) {
                selectedCourse = course;
                break;
            }
        }

        if (selectedCourse == null) {
            System.out.println("Invalid Course ID.");
            return;
        }

        // Initialize the reviews list in the selected course if null
        if (selectedCourse.getReviews() == null) {
            selectedCourse.setReviews(new ArrayList<>());
        }

        // Prompt for review details
        System.out.print("Enter rating (1-5): ");
        int rating = scanner.nextInt();
        scanner.nextLine(); // Consume newline

        System.out.print("Enter review comment: ");
        String comment = scanner.nextLine();

        // Create and add review
        Review newReview = new Review(rating, comment, this.getUserID());
        selectedCourse.addReview(newReview); // Add review to the course's reviews list

        // Initialize the reviews list in the student if null
        if (reviews == null) {
            reviews = new ArrayList<>();
        }

        reviews.add(newReview); // Add review to the student's reviews list
        System.out.println("Review submitted successfully!");
    }

 
    private void viewMyReviews() {
        System.out.println("--- Your Reviews ---");

        if (reviews == null || reviews.isEmpty()) {
            System.out.println("You have not submitted any reviews.");
            return;
        }

        for (Review review : reviews) {
            boolean courseFound = false;

            // Find the corresponding course
            for (Course course : Course.allCourses) {
                if (course.getReviews() == null) {
                    continue; // Skip if the course reviews list is null
                }

                for (Review courseReview : course.getReviews()) {
                    if (courseReview.getReviewID() == review.getReviewID()) {
                        System.out.println("Course: " + course.getCourseTitle());
                        System.out.println(review);
                        courseFound = true;
                        break;
                    }
                }

                if (courseFound) {
                    break; // Exit outer loop if the course is found
                }
            }

            if (!courseFound) {
                System.out.println("Review ID: " + review.getReviewID() + " is not linked to any course.");
            }
        }
    }


    private void editReview() {
        Scanner scanner = new Scanner(System.in);
        
        // Display current reviews
        viewMyReviews();
        
        if (reviews.isEmpty()) {
            return;
        }
        
        System.out.print("\nEnter the Review ID to edit: ");
        int reviewID = scanner.nextInt();
        scanner.nextLine(); // Consume newline
        
        // Find the review
        Review reviewToEdit = null;
        
        for (Course course : Course.allCourses) {
            for (Review review : course.getReviews()) {
                if (review.getReviewID() == reviewID) {
                    reviewToEdit = review;
                    break;
                }
            }
            if (reviewToEdit != null) break;
        }
        
        if (reviewToEdit == null) {
            System.out.println("Review not found.");
            return;
        }
        
        System.out.print("Enter new rating (1-5): ");
        int newRating = scanner.nextInt();
        scanner.nextLine(); // Consume newline
        
        System.out.print("Enter new comment: ");
        String newComment = scanner.nextLine();
        
        try {
            reviewToEdit.setRating(newRating);
            reviewToEdit.setComment(newComment);
            System.out.println("Review updated successfully!");
        } catch (IllegalArgumentException e) {
            System.out.println("Invalid rating. Review update failed.");
        }
    }

    private void deleteReview() {
        Scanner scanner = new Scanner(System.in);
        
        // Display current reviews
        viewMyReviews();
        
        if (reviews.isEmpty()) {
            return;
        }
        
        System.out.print("\nEnter the Review ID to delete: ");
        int reviewID = scanner.nextInt();
        scanner.nextLine(); // Consume newline
        
        // Remove from student's reviews
        reviews.removeIf(review -> review.getReviewID() == reviewID);
        
        // Remove from course reviews
        for (Course course : Course.allCourses) {
            course.getReviews().removeIf(review -> review.getReviewID() == reviewID);
        }
        
        System.out.println("Review deleted successfully!");
    }

    
    // Getter methods
    public static List<Student> getAllStudents() {
        return allStudents;
    }

    public ArrayList<Review> getReviews() {
        return reviews;
    }
}