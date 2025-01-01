public class Analytics_Dashboard {
    private int dashboardID;
    private int userEngagementMetrics;
    private int revenueStatistics;

    public Analytics_Dashboard() {
        this.dashboardID = (int) (Math.random() * 1000);
        this.userEngagementMetrics = 50; // Example static value for demonstration
        this.revenueStatistics = 5000;  // Example static value for demonstration
    }

    public void viewEngagementStats() {
        System.out.println("--------------------------------------------------");
        System.out.println("                User Engagement Stats             ");
        System.out.println("--------------------------------------------------");
        System.out.println("Engagement: " + userEngagementMetrics + "%");
        System.out.println("Revenue: $" + revenueStatistics);
        System.out.println("\n--------------------------------------------------");
        System.out.println("                  Graph (Example)                 ");
        System.out.println("--------------------------------------------------");
        System.out.println("[**************] 50% Engagement");
        System.out.println("[************* ] $5000 Revenue");
        System.out.println("\n--------------------------------------------------");
    }

    public void generateReports() {
        System.out.println("--------------------------------------------------");
        System.out.println("                  Report Dashboard            "+dashboardID);
        System.out.println("--------------------------------------------------");
        System.out.println("Current Revenue: $" + revenueStatistics);
        System.out.println("\n--------------------------------------------------");
        System.out.println("                  Graph (Example)                 ");
        System.out.println("--------------------------------------------------");
        System.out.println("[************* ] $5000 Revenue");
        System.out.println("\n--------------------------------------------------");
    }


}
