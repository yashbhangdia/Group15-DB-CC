insert into users (id, email, name, role) values(1, 'shivani@gmail.com', 'Shivani', 'Ops');
insert into users (id, email, name, role) values(2, 'yash@gmail.com', 'Yash', 'Ops');
insert into users(id, email, name, role) values(3, 'sakshi@gamil.com', 'Sakshi', 'Ops');
insert into users(id, email, name, role) values(4, 'satyam@yahoo.com', 'Satyam', 'Ops');
insert into users(id, email, name, role) values(5, 'shruti@gamil.com', 'Shruti', 'Ops');
insert into users(id, email, name, role) values(6, 'swarnam@yahoo.com', 'Swarnam', 'Ops');

insert into book(id, book_name, created_at, last_updated_at) values(101, 'Google', '2018-08-06','2022-08-06');
insert into book(id, book_name, created_at, last_updated_at) values(102, 'Amazon', '2020-08-05','2022-08-06');
insert into book(id, book_name, created_at, last_updated_at) values(103, 'Tesla', '2019-07-10','2022-07-31');
insert into book(id, book_name, created_at, last_updated_at) values(104, 'Deutsche Bank', '2022-08-06','2022-08-10');
insert into book(id, book_name, created_at, last_updated_at) values(105, 'Microsoft', '2021-09-05','2022-07-31');
insert into book(id, book_name, created_at, last_updated_at) values(106, 'Apple', '2022-03-01','2022-08-01');

insert into book_user(id, book_id,user_id) values(11, 101, 1);
insert into book_user(id, book_id,user_id) values(12, 102, 1);
insert into book_user(id, book_id,user_id) values(13, 102, 2);
insert into book_user(id, book_id,user_id) values(14, 103, 3);
insert into book_user(id, book_id,user_id) values(15, 105, 3);
insert into book_user(id, book_id,user_id) values(16, 101, 4);
insert into book_user(id, book_id,user_id) values(17, 106, 5);
insert into book_user(id, book_id,user_id) values(18, 105, 5);
insert into book_user(id, book_id,user_id) values(19, 106, 6);

insert into security(id, coupon, cusip, face_value, isin, issuer, maturity_date, status, type) values(1001, '1001-a', 'abc629', 10000, 'US0378331005', 'Apple', '2023-09-01', 'active', 'treasury');
insert into security(id, coupon, cusip, face_value, isin, issuer, maturity_date, status, type) values(1002, '1002-b', 'g34hd', 2500, 'US38259PAD42', 'Google', '2025-10-14', 'active', 'savings');
insert into security(id, coupon, cusip, face_value, isin, issuer, maturity_date, status, type) values(1003, '1003-c', 'shdg3fd45', 3400, 'USU8810LAA18', 'Tesla', '2022-08-31', 'active', 'gse');
insert into security(id, coupon, cusip, face_value, isin, issuer, maturity_date, status, type) values(1004, '1004-a', '355edabc', 90000, 'DE0005140008', 'Deutsche Bank', '2023-09-01', 'active', 'investment');
insert into security(id, coupon, cusip, face_value, isin, issuer, maturity_date, status, type) values(1005, '1005-b', 'gh3dbv4d', 2300, 'US0378331005', 'Apple', '2022-07-14', 'fail', 'corporate');
insert into security(id, coupon, cusip, face_value, isin, issuer, maturity_date, status, type) values(1006, '1006-c', 'triy45dfg', 13400, 'US023135BC96', 'Amazon', '2021-08-31', 'fail', 'corporate');
insert into security(id, coupon, cusip, face_value, isin, issuer, maturity_date, status, type) values(1007, '1007-a', '8945sdkfh34', 21000, 'US0378331005', 'Apple', '2021-09-01', 'fail', 'treasury');
insert into security(id, coupon, cusip, face_value, isin, issuer, maturity_date, status, type) values(1008, '1008-b', '374djsf745', 8700, 'US38259PAD42', 'Google', '2021-10-14', 'successful', 'high-yield');
insert into security(id, coupon, cusip, face_value, isin, issuer, maturity_date, status, type) values(1009, '1009-c', 'shdgfg45vs', 3490, 'US0378331005', 'Apple', '2022-07-31', 'successful', 'foreign');

insert into counterparty(id, name) values(10001, 'Tim');
insert into counterparty(id, name) values(10002, 'Sam');
insert into counterparty(id, name) values(10003, 'Rushat');
insert into counterparty(id, name) values(10004, 'Shivani');

insert into trade(id, buy_sell, price, quantity, settlement_date, status, trade_date, security_id, counterparty_id, book_id) values(1000001, 'buy', 200, 1, '2020-08-18', 'done', '2020-08-10', 1001, 10001, 106);
insert into trade(id, buy_sell, price, quantity, settlement_date, status, trade_date, security_id, counterparty_id, book_id) values(1000002, 'sell', 200, 1, '2021-08-18', 'done', '2021-07-19', 1002, 10002, 101);
insert into trade(id, buy_sell, price, quantity, settlement_date, status, trade_date, security_id, counterparty_id, book_id) values(1000003, 'sell', 200, 1, '2022-07-10', 'done', '2020-06-19', 1003, 10003, 103);
insert into trade(id, buy_sell, price, quantity, settlement_date, status, trade_date, security_id, counterparty_id, book_id) values(1000004, 'buy', 200, 1, '2022-06-18', 'done', '2021-08-19', 1004, 10004, 104);
insert into trade(id, buy_sell, price, quantity, settlement_date, status, trade_date, security_id, counterparty_id, book_id) values(1000005, 'buy', 200, 1, '2021-03-23', 'system fail', '2021-03-19', 1005, 10001, 106);
insert into trade(id, buy_sell, price, quantity, settlement_date, status, trade_date, security_id, counterparty_id, book_id) values(1000006, 'sell', 200, 1, '2018-08-28', 'trade fail', '2018-06-05', 1006, 10002, 102);
insert into trade(id, buy_sell, price, quantity, settlement_date, status, trade_date, security_id, counterparty_id, book_id) values(1000007, 'buy', 200, 1, '2022-08-18', 'mis-booking', '2022-07-19', 1007, 10003, 106);
insert into trade(id, buy_sell, price, quantity, settlement_date, status, trade_date, security_id, counterparty_id, book_id) values(1000008, 'sell', 200, 1, '2021-08-18', 'done', '2021-06-19', 1008, 10004, 101);
insert into trade(id, buy_sell, price, quantity, settlement_date, status, trade_date, security_id, counterparty_id, book_id) values(1000009, 'buy', 200, 1, '2019-08-18', 'done', '2019-09-19', 1009, 10001, 106);




