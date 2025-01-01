import java.util.ArrayList;
import java.util.List;

public class Course {
    public static List<Course> allCourses = new ArrayList<>(); // Static list to store all Course objects

    private int courseID;
    private String courseTitle;
    private String description;
    private int price;
    private int instructorID; 
    
    
    // List of Objects;
    private List<Review> reviews;
    private List<Certificate> certificates; 
    private static List<Payment> payments; 
    
    
    // Aggregations
    private Course_Content CC;			// Aggregation of Course and Course Content
    private static Payment pay;			// Aggregation of Course and Payment
    private Certificate certif;			// Aggregation of Course and Review

    // Composition
    private Review rev;

    // Default Constructor
    public Course() {
    	
        // Just storing Objects of the Aggregated and Composed Classes, for future use.
        this.reviews = new ArrayList<>();
        this.certificates = new ArrayList<>();
        Course.payments = new ArrayList<>();
        rev = new Review();
    }

    // Parameterized Constructor													   // Aggregated Objects.
    public Course(String courseTitle, String description, int price, int instructorID, Course_Content Object, Payment object, Certificate obj) {
        this();
        this.courseID = (int) (Math.random() * 1000); // Generate a random course ID
        this.courseTitle = courseTitle;
        this.description = description;
        this.price = price;
        this.instructorID = instructorID;
        CC = Object;
        pay = object;
        certif = obj;
        certif.CertificateAvailable(courseID);
        CC.uploadContent(courseID, description);
    }

    // Getters
    public int getCourseID() {
        return courseID;
    }

    public String getCourseTitle() {
        return courseTitle;
    }

    public String getDescription() {
        return description;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public static List<Course> getCourses() {
        return allCourses;
    }

    public int getPrice() {
        return price;
    }

    public int getInstructorID() {
        return instructorID;
    }

    public List<Certificate> getCertificates() {
        return certificates;
    }


    public static List<Payment> getpayments() {
        return payments;
    }
    
    
    // Setters
    public void setCourseTitle(String courseTitle) {
        this.courseTitle = courseTitle;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    
  

    // Add Review
    public void addReview(Review review) {
    	rev = review;
        if (rev == null) {
            throw new IllegalArgumentException("Review cannot be null");
        }
        reviews.add(rev);
    }

    // Calculate Average Rating
    public double getAverageRating() {
        if (reviews.isEmpty()) {
            return 0.0;
        }

        return reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);
    }



    // Static Method to Print All Courses
    public void printAllCourses() {
        System.out.println();
        System.out.println("All Courses:");
        for (Course course : allCourses) {
            System.out.println(course); // Calls the toString method for each object
        }
    }
    
    public static void addPaymentinCourse(Payment object) {
    	pay = object;
    	payments.add(pay); // Add payment to the correct course
    	return;    
    }
    


    // Override toString for Readable Output
    @Override
    public String toString() {
        return "Course{" +
                "courseID=" + courseID +
                ", courseTitle='" + courseTitle + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", instructorID=" + instructorID +
                '}';
    }
}
