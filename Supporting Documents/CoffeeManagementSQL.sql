use CoffeeManagement

select * from Users
select * from UserCredentials

select * from CoffeeSauces
select * from Sauces
select * from Carts
select * from CartItems
select * from Toppings

select * from orders
select * from OrderDetails
select * from OrderDetailStatuses

select * from employees
select * from employeeCredentials


insert into carts (UserId, Total) Values (4,0)
Delete from Users;


select * from Coffees

UPDATE coffees 
SET Description = 'Dark, Rich in flavour espresso lies in wait under a smoothed and stretched layer of thick foam. It''s truly the height of our baristas'' craft.' 
WHERE id = 2;

UPDATE coffees 
SET ImageURL = 'https://senablobstorage.blob.core.windows.net/sena-blob-container/product-10.webp' 
WHERE id = 2;