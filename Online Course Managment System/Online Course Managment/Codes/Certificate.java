import java.time.LocalDate;


public class Certificate {
    private int certificateID;
    private int studentID;
    private int courseID;
    private LocalDate issueDate;

    public Certificate() {
        this.certificateID = (int) (Math.random() * 1000);
        this.issueDate = LocalDate.now();
    }

    public void generateCertificate(int studentID, int courseID) {
        this.studentID = studentID;
        this.courseID = courseID;
        System.out.println("Certificate generated: Certificate ID: " + certificateID + 
                           ", Student ID: " + studentID + 
                           ", Course ID: " + courseID);
    }

 
    public void downloadCertificate() {
        
            System.out.println("Certificate downloaded" );    
    	}
    
    
    public void CertificateAvailable(int crsID)
    {
    	System.out.println("Certificate Generated for Course: "+ crsID );
    }
    
    
    @Override
    public String toString() {
        return "Certificate{" +
               "certificateID=" + certificateID +
               ", studentID=" + studentID +
               ", courseID=" + courseID +
               ", issueDate=" + issueDate +
               '}';
    }
}
