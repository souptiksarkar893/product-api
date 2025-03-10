# Product API

This project is a **Node.js, Express, and MongoDB** based API that allows managing product data uploaded via CSV. The API supports filtering, grouping, and resetting product data.

## Features
- Upload a CSV file to insert product data into MongoDB.
- Automatically generate unique **EAN_code** for each product.
- Filter products based on **style_code, option_code, MRP, Brick, and Sleeve**.
- Retrieve product data grouped by **option_code**.
- Reset the database by deleting all product data.

## Tech Stack
- **Node.js** - Backend runtime
- **Express.js** - API framework
- **MongoDB & Mongoose** - Database and ORM
- **Multer** - File upload handling
- **CSV-parser** - Parses CSV files

---

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14+ recommended)
- **MongoDB** (running locally or on cloud)

### Clone the Repository
```sh
git clone https://github.com/souptiksarkar893/product-api.git
cd product-api
```

### Install Dependencies
```sh
npm install
```

### Environment Variables
Create a `.env` file in the root directory and configure:
```
MONGO_URI=<your-mongodb-connection-string>
PORT=5000
```

### Run the Server
```sh
npm start
```
By default, the server runs on **http://localhost:5000**

---

## API Endpoints

### 1. Upload CSV File
**Endpoint:** `POST /api/products/upload`
- **Description:** Uploads a CSV file and inserts data into the database.
- **Payload:** Multipart Form-Data with `file`

### 2. Get Filtered Products
**Endpoint:** `GET /api/products/filters`
- **Description:** Retrieves products based on filters and counts unique `option_code`.
- **Query Params:**
  - `style_code`
  - `option_code`
  - `MRP`
  - `Brick` (Shirt, T-shirt, Jeans, Trouser)
  - `Sleeve` (Full Sleeve, Half Sleeve, Sleeveless)
- **Example:**
  ```sh
  GET /api/products/filters?Brick=Shirt&Sleeve=Full%20Sleeve
  ```

### 3. Get Grouped Products
**Endpoint:** `GET /api/products/grouped`
- **Description:** Retrieves products grouped by `option_code`.
- **Query Params:** (same as filter API)
- **Example:**
  ```sh
  GET /api/products/grouped?Brick=Shirt&Sleeve=Full%20Sleeve
  ```

### 4. Reset Database
**Endpoint:** `DELETE /api/products/reset`
- **Description:** Deletes all products from the database.
- **Response:**
  ```json
  { "message": "All products deleted", "deletedCount": 100 }
  ```

---

## Folder Structure
```
product-api/
│── controllers/
│   └── productController.js  # API logic
│── models/
│   └── Product.js            # Mongoose Schema
│── routes/
│   └── productRoutes.js      # API Routes
│── uploads/                  # Temporary CSV uploads
│── .env                      # Environment variables
│── app.js                 # Main entry point
│── package.json              # Dependencies
│── README.md                 # Documentation
```

---

## Testing with Postman
You can test the API using **Postman**:
1. **Upload CSV** using form-data.
2. **Filter Products** using query parameters.
3. **Get Grouped Data**.
4. **Reset the database**.

---

## License
MIT License

