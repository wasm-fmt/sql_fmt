SELECT customer_id.from, COUNT(order_id) AS total FROM customers
INNER JOIN orders ON customers.customer_id = orders.customer_id;