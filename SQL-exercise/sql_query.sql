#MYSQL Codes
# Given the ER model above, write an SQL query that reports the id of all customers
# who have placed at least one product order with sku X_Y_Z.

SELECT o.customers_id FROM line_items l JOIN orders o ON o.id = l.order_id JOIN products p ON p.id = l.product_id WHERE p.sku LIKE 'X_Y_Z%' ORDER BY o.customers_id ASC


# Given the ER model above, write an SQL query that reports the id of all orders containing
# at least two products whose sku starts with G.
# First trial = SELECT COUNT(*), p.sku, order_id FROM products p JOIN line_items l ON p.id = l.product_id WHERE p.sku LIKE 'G%' GROUP BY order_id HAVING COUNT(*)>=2
SELECT l.order_id FROM products p JOIN line_items l ON p.id = l.product_id WHERE p.sku LIKE 'G%' GROUP BY order_id HAVING COUNT(*)>=2
