import java.util.ArrayList;
import java.util.Scanner;

public class Customer_Support {
    private int ticketID;
    private String queryDescription;
    private boolean resolved;
    private ArrayList<Customer_Support> queries; // Now instance-specific

    public Customer_Support() {
        this.ticketID = 0;
        this.queryDescription = "";
        this.resolved = false;
        this.queries = new ArrayList<>(); // Initialize the instance-specific list
    }

    public void CustomerSupportMenu() {
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("\n--- Customer Support Menu ---");
            System.out.println("1. Submit a Query");
            System.out.println("2. Resolve Query");
            System.out.println("3. View Query Status");
            System.out.println("4. Exit");
            System.out.print("Enter your choice: ");

            int choice = scanner.nextInt();

            switch (choice) {
                case 1:
                    submitQuery();
                    break;
                case 2:
                    resolveQuery();
                    break;
                case 3:
                    viewQueryStatus();
                    break;
                case 4:
                    System.out.println("Exiting Customer Support System.");
                    return;
                default:
                    System.out.println("Invalid option. Please try again.");
            }
        }
    }

    public void submitQuery() {
        Scanner scanner = new Scanner(System.in);
        System.out.println();
        System.out.println("Select your query type:");
        System.out.println("1. Technical Support");
        System.out.println("2. Billing Inquiry");
        System.out.println("3. Product Information");
        System.out.println("4. Refund Request");
        System.out.println("5. Other");

        int choice = scanner.nextInt();
        scanner.nextLine(); // Consume newline

        String queryType;
        switch (choice) {
            case 1:
                queryType = "Technical Support";
                break;
            case 2:
                queryType = "Billing Inquiry";
                break;
            case 3:
                queryType = "Product Information";
                break;
            case 4:
                queryType = "Refund Request";
                break;
            case 5:
                queryType = "Other";
                break;
            default:
                System.out.println("Invalid option. Query not submitted.");
                return;
        }

        // Create a new Customer_Support object for each query
        Customer_Support newQuery = new Customer_Support();
        newQuery.ticketID = this.queries.size() + 1; // Assign a unique ticket ID
        newQuery.queryDescription = queryType;

        // Add the new query to the list
        this.queries.add(newQuery);

        System.out.println("Query submitted successfully. Your Ticket ID is: " + newQuery.ticketID);
    }

    public void resolveQuery() {
        if (this.queries.isEmpty()) {
            System.out.println("Nothing to see here.");
            return;
        }

        System.out.println("Select a query to resolve:");
        for (int i = 0; i < this.queries.size(); i++) {
            Customer_Support query = this.queries.get(i);
            System.out.println((i + 1) + ". Ticket ID: " + query.ticketID +
                               ", Type: " + query.queryDescription);
        }

        Scanner scanner = new Scanner(System.in);
        int choice = scanner.nextInt();

        if (choice > 0 && choice <= this.queries.size()) {
            Customer_Support resolvedQuery = this.queries.get(choice - 1);
            resolvedQuery.resolved = true;
            System.out.println("Query resolved:");
            System.out.println("Ticket ID: " + resolvedQuery.ticketID);
            System.out.println("Query Type: " + resolvedQuery.queryDescription);
            System.out.println("Status: " +resolvedQuery.resolved);

            this.queries.remove(choice - 1);
        } else {
            System.out.println("Invalid selection.");
        }
    }

    public void viewQueryStatus() {
        if (this.queries.isEmpty()) {
            System.out.println("Nothing to see here.");
            return;
        }

        System.out.println("Your Submitted Queries:");
        for (Customer_Support query : this.queries) {
            System.out.println("Ticket ID: " + query.ticketID +
                               ", Type: " + query.queryDescription);
        }
    }
}
