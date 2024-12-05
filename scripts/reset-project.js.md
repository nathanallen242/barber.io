# Reset Project Script Documentation

[Linked Table of Contents](#linked-table-of-contents)

## Linked Table of Contents

* [1. Overview](#1-overview)
* [2. File Structure and Variables](#2-file-structure-and-variables)
* [3. `moveDirectories` Function](#3-movedirectories-function)
    * [3.1 Algorithm](#31-algorithm)
    * [3.2 Step-by-step Breakdown](#32-step-by-step-breakdown)


## 1. Overview

This Node.js script resets a React Native project to a blank state.  It achieves this by moving existing project directories ( `/app`, `/components`, `/hooks`, `/constants`, `/scripts` ) to a new directory (`/app-example`), and then creating a new `/app` directory with basic `index.tsx` and `_layout.tsx` files.  This script is intended to be a one-time use tool, and can be safely removed after execution.


## 2. File Structure and Variables

The script utilizes the `fs` (filesystem) and `path` modules from Node.js. Key variables define the project's root directory and paths for source and destination directories.

| Variable Name      | Description                                                                     | Value Example (relative to script location)          |
|----------------------|---------------------------------------------------------------------------------|----------------------------------------------------|
| `root`              | The root directory of the project.                                              | `/path/to/project/root`                             |
| `oldDirs`           | An array of directories to be moved.                                            | `["app", "components", "hooks", "constants", "scripts"]` |
| `newDir`            | The name of the directory where old directories will be moved.                | `"app-example"`                                      |
| `newAppDir`         | The name of the newly created app directory.                                   | `"app"`                                            |
| `newDirPath`        | The full path of the new directory (`root` + `newDir`).                       | `/path/to/project/root/app-example`                |
| `indexContent`      | The string content for the new `index.tsx` file.                            | (See code)                                         |
| `layoutContent`     | The string content for the new `_layout.tsx` file.                           | (See code)                                         |


## 3. `moveDirectories` Function

This asynchronous function orchestrates the entire reset process.


### 3.1 Algorithm

The algorithm follows these steps:

1. Create the `/app-example` directory.
2. Iterate through the list of old directories (`oldDirs`).  For each directory:
    * Check if the directory exists.
    * If it exists, move it to the `/app-example` directory.
    * If it doesn't exist, log a message and skip it.
3. Create the new `/app` directory.
4. Create `index.tsx` and `_layout.tsx` files within the new `/app` directory, populating them with predefined content.
5. Log a success message with instructions for the next steps.
6. Handle any errors that occur during the process.


### 3.2 Step-by-step Breakdown

The `moveDirectories` function uses asynchronous file system operations provided by `fs.promises`.  Each step is handled within a `try...catch` block to manage potential errors.

1. **Directory Creation:** The function first creates the `newDirPath` (`/app-example`) using `fs.promises.mkdir` with the `{ recursive: true }` option to ensure all necessary parent directories are created.

2. **Directory Moving:** It then iterates through each directory in `oldDirs`. For each directory, it constructs the source and destination paths using `path.join`.  `fs.existsSync` checks if the source directory exists before attempting to move it using `fs.promises.rename`.  Appropriate console messages are displayed for each directory, indicating success or failure.

3. **New App Directory and File Creation:** After moving the old directories, a new `/app` directory is created using `fs.promises.mkdir`. Then, `index.tsx` and `_layout.tsx` are created using `fs.promises.writeFile`, writing the content of `indexContent` and `layoutContent` respectively.

4. **Completion Message:**  The function concludes by printing a success message to the console, guiding the user on the subsequent steps (starting the development server, editing the `index.tsx` file, and deleting the `/app-example` directory).

5. **Error Handling:** The `catch` block handles any exceptions that may occur during the file system operations, logging the error message to the console.
