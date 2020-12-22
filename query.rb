require "sqlite3"
db = SQLite3::Database.new("er.sqlite")


# Given the ER model above, write an SQL query that reports the id of all customers
# who have placed at least one product order with sku X_Y_Z.

SELECT * FROM orders o JOIN customers c ON c.id = p.customers_id JOIN line_items l ON


# Given the ER model above, write an SQL query that reports the id of all orders containing
# at least two products whose sku starts with G.
