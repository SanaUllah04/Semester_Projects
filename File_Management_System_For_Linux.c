#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <dirent.h>
#include <sys/stat.h>
#include <string.h>
#include <time.h>

void listAllFilesAndDirectories() {
    printf("\n\nListing all files and directories:\n");
    system("ls -l");
}

void createNewFile(int fileChoice) {
    char fileName[50], command[100], ext[5];

    switch (fileChoice) {
        case 1:
            strcpy(ext, ".c");
            printf("Enter the name of the .c file: ");
            break;
        case 2:
            strcpy(ext, ".sh");
            printf("Enter the name of the .sh file: ");
            break;
        case 3:
            strcpy(ext, ".txt");
            printf("Enter the name of the .txt file: ");
            break;
        default:
            printf("Invalid choice.\n");
            return;
    }

    scanf("%s", fileName);
    strcat(fileName, ext); // Append the file extension to the file name

    snprintf(command, sizeof(command), "touch %s", fileName);

    printf("Creating %s file...\n", fileName);
    system(command);
}

void deleteExistingFile() {
    char fileName[50];
    printf("Enter the name of the file to delete: ");
    scanf("%s", fileName);

    if (remove(fileName) == 0) {
        printf("File %s deleted successfully.\n", fileName);
    } else {
        printf("Error: Unable to delete %s file.\n", fileName);
    }
}

void renameFile() {
    char oldName[50], newName[50];
    printf("Enter the name of the file to rename: ");
    scanf("%s", oldName);
    printf("Enter the new name for the file: ");
    scanf("%s", newName);

    if (rename(oldName, newName) == 0) {
        printf("File %s renamed to %s successfully.\n", oldName, newName);
    } else {
        printf("Error: Unable to rename the file.\n");
    }
}

void editFile() {
    char fileName[50];
    printf("Enter the name of the file to edit: ");
    scanf("%s", fileName);

    if (access(fileName, F_OK) == 0) {
        char command[100];
        snprintf(command, sizeof(command), "nano %s", fileName);
        system(command);
    } else {
        printf("Error: File %s does not exist.\n", fileName);
    }
}

void searchFile() {
    char fileName[50];
    printf("Enter the name of the file to search: ");
    scanf("%s", fileName);

    char command[200];
    snprintf(command, sizeof(command), "find /home -name '%s'", fileName);
    system(command);
}

void fileDetails() {
    char fileName[50];
    printf("Enter the name of the file to see details: ");
    scanf("%s", fileName);

    struct stat st;
    if (stat(fileName, &st) == 0) {
        printf("File: %s\n", fileName);
        printf("Size: %ld bytes\n", st.st_size);
        printf("Permissions: %o\n", st.st_mode & 0777);
        printf("Last accessed: %s", ctime(&st.st_atime));
        printf("Last modified: %s", ctime(&st.st_mtime));
    } else {
        printf("Error: File %s does not exist.\n", fileName);
    }
}

void viewFileContent() {
    char fileName[50];
    printf("Enter the name of the file to view its content: ");
    scanf("%s", fileName);

    FILE *file = fopen(fileName, "r");

    if (file != NULL) {
        char ch;
        printf("Content of file %s:\n", fileName);
        while ((ch = fgetc(file)) != EOF) {
            putchar(ch);
        }
        fclose(file);
    } else {
        printf("Error: File %s does not exist.\n", fileName);
    }
}

void sortFileContent() {
    char fileName[50];
    printf("Enter the name of the file to sort its content: ");
    scanf("%s", fileName);

    char command[100];
    snprintf(command, sizeof(command), "sort %s", fileName);
    system(command);
}

void copyFile() {
    char sourceFile[50], destinationFile[50];
    printf("Enter the name of the source file: ");
    scanf("%s", sourceFile);
    printf("Enter the name of the destination file: ");
    scanf("%s", destinationFile);

    char *command = malloc(strlen(sourceFile) + strlen(destinationFile) + 10);
    sprintf(command, "cp %s %s", sourceFile, destinationFile);
    system(command);
    free(command);
}

void moveFile() {
    char sourceFile[50], destinationFile[50];
    printf("Enter the name of the source file: ");
    scanf("%s", sourceFile);
    printf("Enter the name of the destination file: ");
    scanf("%s", destinationFile);

    char *command = malloc(strlen(sourceFile) + strlen(destinationFile) + 10);
    sprintf(command, "mv %s %s", sourceFile, destinationFile);
    system(command);
    free(command);
}

void changeFilePermissions() {
    char fileName[50];
    int permissions;
    printf("Enter the name of the file: ");
    scanf("%s", fileName);
    printf("Enter the new permissions (in octal): ");
    scanf("%o", &permissions);

    char *command = malloc(strlen(fileName) + 20);
    sprintf(command, "chmod %o %s", permissions, fileName);
    system(command);
    free(command);
}

void changeFileOwner() {
    char fileName[50], owner[50];
    printf("Enter the name of the file: ");
    scanf("%s", fileName);
    printf("Enter the new owner: ");
    scanf("%s", owner);

    char *command = malloc(strlen(fileName) + strlen(owner) + 20);
    sprintf(command, "chown %s %s", owner, fileName);
    system(command);
    free(command);
}

void changeFileGroup() {
    char fileName[50], group[50];
    printf("Enter the name of the file: ");
    scanf("%s", fileName);
    printf("Enter the new group: ");
    scanf("%s", group);

    char *command = malloc(strlen(fileName) + strlen(group) + 20);
    sprintf(command, "chgrp %s %s", group, fileName);
    system(command);
    free(command);
}

void compressFile() {
    char fileName[50];
    printf("Enter the name of the file to compress: ");
    scanf("%s", fileName);

    char *command = malloc(strlen(fileName) + 20);
    sprintf(command, "zip %s.zip %s", fileName, fileName);
    system(command);
    free(command);
}

void decompressFile() {
    char fileName[50];
    printf("Enter the name of the file to decompress: ");
    scanf("%s", fileName);

    char *command = malloc(strlen(fileName) + 20);
    sprintf(command, "unzip %s", fileName);
    system(command);
    free(command);
}

void createDirectory() {
    char dirName[50];
    printf("Enter the name of the directory to create: ");
    scanf("%s", dirName);

    char *command = malloc(strlen(dirName) + 20);
    sprintf(command, "mkdir %s", dirName);
    system(command);
    free(command);
}

void deleteDirectory() {
    char dirName[50];
    printf("Enter the name of the directory to delete: ");
    scanf("%s", dirName);

    char *command = malloc(strlen(dirName) + 20);
    sprintf(command, "rmdir %s", dirName);
    system(command);
    free(command);
}

void listDirectoryContents() {
    char dirName[50];
    printf("Enter the name of the directory to list: ");
    scanf("%s", dirName);

    char *command = malloc(strlen(dirName) + 20);
    sprintf(command, "ls -l %s", dirName);
    system(command);
    free(command);
}

void recursiveDirectorySearch() {
    char fileName[50], directory[50];
    printf("Enter the name of the file to search: ");
    scanf("%s", fileName);
    printf("Enter the directory to start the search from: ");
    scanf("%s", directory);

    char *command = malloc(strlen(fileName) + strlen(directory) + 30);
    sprintf(command, "find %s -name '%s'", directory, fileName);
    system(command);
    free(command);
}

int main() {
    int i = 0;
    while (i < 100) {
        int opt;
        printf("------------Operating System Project-------------\n");
        printf("Menu:\n");
        printf("1. List all files and directories\n");
        printf("2. Create new file\n");
        printf("3. Delete existing file\n");
        printf("4. Rename file\n");
        printf("5. Edit file\n");
        printf("6. Search file\n");
        printf("7. File details\n");
        printf("8. View file content\n");
        printf("9. Sort file content\n");
        printf("10. Copy file\n");
        printf("11. Move file\n");
        printf("12. Change file permissions\n");
        printf("13. Change file owner\n");
        printf("14. Change file group\n");
        printf("15. Compress file\n");
        printf("16. Decompress file\n");
        printf("17. Create directory\n");
        printf("18. Delete directory\n");
        printf("19. List directory contents\n");
        printf("20. Recursive directory search\n");
        printf("0. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &opt);

        switch (opt) {
            case 1:
                listAllFilesAndDirectories();
                break;
            case 2:
                printf("Which type of file you want to create?\n");
                printf("1. .c\n");
                printf("2. .sh\n");
                printf("3. .txt\n");
                printf("Enter your choice: ");
                int fileChoice;
                scanf("%d", &fileChoice);
                createNewFile(fileChoice);
                break;
            case 3:
                deleteExistingFile();
                break;
            case 4:
                renameFile();
                break;
            case 5:
                editFile();
                break;
            case 6:
                searchFile();
                break;
            case 7:
                fileDetails();
                break;
            case 8:
                viewFileContent();
                break;
            case 9:
                sortFileContent();
                break;
            case 10:
                copyFile();
                break;
            case 11:
                moveFile();
                break;
            case 12:
                changeFilePermissions();
                break;
            case 13:
                changeFileOwner();
                break;
            case 14:
                changeFileGroup();
                break;
            case 15:
                compressFile();
                break;
            case 16:
                decompressFile();
                break;
            case 17:
                createDirectory();
                break;
            case 18:
                deleteDirectory();
                break;
            case 19:
                listDirectoryContents();
                break;
            case 20:
                recursiveDirectorySearch();
                break;
            case 0:
                printf("Goodbye!\n");
                exit(0);
            default:
                printf("Invalid choice. Try again.\n");
        }
        i++;
    }
    return 0;
}
