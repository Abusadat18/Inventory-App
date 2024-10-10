# Inventory-App

Your planned routes look solid for an inventory management system. Below is a refined list of your routes along with the suggested routes for modifying (MOD) and deleting (DEL) resources, specifically focusing on books and suppliers.

### Refined Routes

#### Home Routes
- **GET /** - Homepage
  - Displays all books from all categories.
  - Contains logo (left) and navigation (top right).

#### Category Routes
- **GET /categories** - List Books in a Single Category
  - Displays all books belonging to a selected category.

- **GET /categories/:bookname** - Detailed View of a Book
  - Displays detailed information for the book specified by `bookname`, accessible from the homepage or category page.

- **GET /categories/addCategory** - Add Category Form
  - Displays a form for adding a new category.

- **POST /categories/addCategory** - Submit New Category
  - Processes the form submission to add a new category.

- **GET /categories/addBook** - Add Book Form
  - Displays a form for adding a new book.

- **POST /categories/addBook** - Submit New Book
  - Processes the form submission to add a new book.

#### Supplier Routes
- **GET /suppliers** - List All Suppliers
  - Displays all suppliers with associated books and their information.

- **GET /suppliers/addSupplier** - Add Supplier Form
  - Displays a form for adding a new supplier.

- **POST /suppliers/addSupplier** - Submit New Supplier
  - Processes the form submission to add a new supplier.

### Modify (MOD) Routes
- **PUT /categories/:bookname** - Update Book Information
  - Processes updates to the specified book's information.

- **PUT /categories/editCategory/:categoryId** - Update Category Information
  - Processes updates to the specified category's information.

- **PUT /suppliers/:supplierId** - Update Supplier Information
  - Processes updates to the specified supplier's information.

### Delete (DEL) Routes
- **DELETE /categories/:bookname** - Delete a Book
  - Processes the deletion of the specified book.

- **DELETE /categories/deleteCategory/:categoryId** - Delete a Category
  - Processes the deletion of the specified category.

- **DELETE /suppliers/:supplierId** - Delete a Supplier
  - Processes the deletion of the specified supplier.

### Summary of Routes
Here’s the complete list of your routes, including GET, POST, PUT, and DELETE methods:

#### Homepage
- `GET /` (DONE)

#### Categories
- `GET /categories`
- `GET /categories/:bookname`
- `GET /categories/addCategory` (DONE)
- `POST /categories/addCategory` (DONE)
- `GET /categories/addBook` (DONE)
- `POST /categories/addBook` (DONE)
- `PUT /categories/:bookname`
- `PUT /categories/editCategory/:categoryId`
- `DELETE /categories/:bookname`
- `DELETE /categories/deleteCategory/:categoryId`

#### Suppliers
- `GET /suppliers`
- `GET /suppliers/addSupplier`
- `POST /suppliers/addSupplier`
- `PUT /suppliers/:supplierId`
- `DELETE /suppliers/:supplierId`

This structured route organization should help you implement the backend functionality for your inventory management project effectively. If you have any further questions or need additional modifications, feel free to ask!

