import java.util.Date;



public class Enrollment {
    private static int enrollmentCounter = 1000;
    
    private int enrollmentID;
    private int studentID;
    private int courseID;
    private Date enrollmentDate;
    private double progress;
    
    
    public Enrollment()
    {
    	// Default Constructor
    }
    
    
    
    public Enrollment(int studentID, int courseID) {
        this.enrollmentID = enrollmentCounter++;
        this.studentID = studentID;
        this.courseID = courseID;
        this.enrollmentDate = new Date();
        this.progress = 0.0;
    }
    
    // Getters
    public int getEnrollmentID() {
        return enrollmentID;
    }
    
    public int getStudentID() {
        return studentID;
    }
    
    public int getCourseID() {
        return courseID;
    }
    
    public Date getEnrollmentDate() {
        return enrollmentDate;
    }
    
    public double getProgress() {
        return progress;
    }
    
    // Method to update progress
    public void updateProgress(double newProgress) {
        if (newProgress >= 0 && newProgress <= 100) {
            this.progress = newProgress;
        }
    }
    

    @Override
    public String toString() {
        return "Enrollment{" +
               "enrollmentID=" + enrollmentID +
               ", studentID=" + studentID +
               ", courseID=" + courseID +
               ", enrollmentDate=" + enrollmentDate +
               ", progress=" + progress +
               '}';
    }
}