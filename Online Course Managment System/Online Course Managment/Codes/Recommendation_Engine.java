import java.util.ArrayList;

public class Recommendation_Engine {
    private int recommendationID;
    private int studentID;
    private ArrayList<String> recommendedCourses;

    public Recommendation_Engine() {
        this.recommendationID = (int) (Math.random() * 1000);
        this.recommendedCourses = new ArrayList<>();
    }

    public void generateRecommendations(int studentID) {
        this.studentID = studentID;
        recommendedCourses.clear();
        recommendedCourses.add("Java Basics");
        recommendedCourses.add("Advanced Python");
        recommendedCourses.add("Web Development with React");
        System.out.println("ID: "+recommendationID+ "   Recommendations for Student ID: " + this.studentID);
        for (String course : recommendedCourses) {
            System.out.println("- " + course);
        }
    }

    public void updateRecommendations() {
        recommendedCourses.add("Machine Learning with TensorFlow");
        System.out.println("Recommendations updated!");
    }
}
