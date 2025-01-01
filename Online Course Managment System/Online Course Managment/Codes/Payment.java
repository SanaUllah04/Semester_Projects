import java.time.LocalDate;

public class Payment {
    private int paymentID;
    public int studentID;
    public int courseID;
    public int amount;
    private boolean paymentStatus;
    private LocalDate paymentDate;
    
 
    public Payment()
    {
    	// Default Constructor	
    }
    

    public Payment(int amount, int studentID, int courseID) {
        this.paymentID = (int) (Math.random() * 1000);
        this.amount = amount;
        this.studentID = studentID;
        this.courseID = courseID;
        this.paymentStatus = true;
        this.paymentDate = LocalDate.now();
    }

    public int getPaymentID() {
        return paymentID;
    }

    public int getStudentID() {
        return studentID;
    }

    public int getCourseID() {
        return courseID;
    }
    
    public int getAmount()
    {
    	return amount;
    }
    
    public LocalDate getPaymentDate()
    {
    	return paymentDate;
    }
    
    public boolean getPaymentStatus() {
        return paymentStatus;
    }
    
    public static void processPayment(int amt, int StdID, int crsID)
    {
    	Payment object = new Payment(amt, StdID, crsID);
    	Course.addPaymentinCourse(object);
    	return;
    }


}
