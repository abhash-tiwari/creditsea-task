
# CreditSea Fullstack Assignment

## Introduction

CreditSea Fullstack Engineer Assignment is a MERN stack application that processes XML files containing soft credit pull data from Experian. It provides:

A backend API for XML file upload and data extraction.

A MongoDB database for storing processed credit reports.

A React frontend for viewing credit report summaries.




## Tech Stack

**Frontend:** React.js, React Router, CSS Modules

**Backend:** Node.js, Express.js, Multer

**Database:** MongoDB, Mongoose

**Other:** XML Parsing, dotenv, axios
## Installation and Setup

### Prerequisites

Node.js (v16+ recommended)

MongoDB installed locally or a cloud database (e.g., MongoDB Atlas)

#### Steps
Clone the Repository
```bash
$ git clone https://github.com/abhash-tiwari/creditsea-task
$ cd creditsea-project
```
    
Setup Backend
```bash
$ cd backend
$ npm install
$ touch .env  # Add environment variables
$ npm start   # Starts the backend server
```
    
Setup Frontend
```bash
$ cd frontend
$ npm install
$ npm run dev  # Runs the React Vite frontend
```
    
    
## Backend

### Features

File Upload: Handles XML file uploads using Multer.

Data Extraction: Parses XML to extract credit report details.

Database Storage: Stores extracted data into MongoDB.

API Endpoints: RESTful API for frontend communication.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGODB_URI`


## Frontend

### Features

File Upload UI: Upload XML files via a user-friendly form.

Report Display: Shows extracted credit report data in sections.

Responsive Design: Mobile-friendly UI.
## API Endpoints

#### Upload XML File

```http
  GET /api/upload
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `file` | `file(xml)` | **Required** |

file (required): XML file to be uploaded.

Request: Multipart form-data (XML file)

Response: { message: "File uploaded successfully" }

#### Fetch Processed Report

```http
  GET /api/reports
```

Response: JSON containing extracted report details

#### Fetch Processed Report by id

```http
  GET /api/reports/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Report ID to retrieve details. |


Response: JSON containing extracted report details


## Frontend

### Features

File Upload UI: Upload XML files via a user-friendly form.

Report Display: Shows extracted credit report data in sections.

Responsive Design: Mobile-friendly UI.
## Backend

### Features

File Upload: Handles XML file uploads using Multer.

Data Extraction: Parses XML to extract credit report details.

Database Storage: Stores extracted data into MongoDB.

API Endpoints: RESTful API for frontend communication.
## Running Tests

Unit tests are located in /backend/tests

Run tests using:

```bash
$ cd backend
$ npm test
```

## Live URL

https://credit-sea-one.vercel.app/

