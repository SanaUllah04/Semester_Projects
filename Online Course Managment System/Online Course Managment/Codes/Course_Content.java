import java.time.LocalDate;

public class Course_Content {
    private int contentID;
    private String contentType;
    private int courseID;
    private LocalDate uploadDate;
    private int size;
    private int duration;

    public Course_Content() {
        this.contentID = (int) (Math.random() * 1000);
        this.contentType = "Default Content";
        this.courseID = 0;
        this.uploadDate = LocalDate.now();
        this.size = 10; 				
        this.duration = 1;  			
    }

    
    public void uploadContent(int courseID, String contentType) {
        this.courseID = courseID;
        this.contentType = contentType;
        this.uploadDate = LocalDate.now();
        System.out.println("Content uploaded: Content ID: " + contentID + ", Course ID: " + courseID + ", Type: " + contentType);
    }

    public void previewContent() {
        System.out.println("Previewing content: Content ID: " + contentID + ", Course ID: " + courseID + ", Type: " + contentType);
    }

    public void deleteContent() {
        System.out.println("Deleting content: Content ID: " + contentID);
    }
    
    // Getters
    public LocalDate getUploadDate()
    {
    	return uploadDate;
    }


    public int getSize()
    {
    	return size;
    }
    
    
    public int getDuration()
    {
    	return duration;
    }
}
