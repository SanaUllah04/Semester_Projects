
public class Review {
    private int reviewID;
    private int rating; // Rating from 1 to 5
    private String comment;
    private int userID; // ID of the user who wrote the review

    public Review()
    {
    	// Default Constructor
    }
      
    // Constructor
    public Review(int rating, String comment, int userID) {
        this.reviewID = (int) (Math.random() * 1000); // Generate a random review ID
        setRating(rating);
        this.comment = comment;
        this.userID = userID;
    }

    // Getters
    public int getReviewID() {
        return reviewID;
    }

    public int getRating() {
        return rating;
    }

    public String getComment() {
        return comment;
    }

    public int getUserID() {
        return userID;
    }

    // Setter 
    public void setRating(int rating) {
        if (rating < 1 || rating > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }
        this.rating = rating;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @Override
    public String toString() {
        return "Review{" +
                "reviewID=" + reviewID +
                ", rating=" + rating +
                ", comment='" + comment + '\'' +
                ", userID=" + userID +
                '}';
    }
}