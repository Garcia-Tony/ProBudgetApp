INSERT INTO "users" ("username", "passwordHash", "createdAt", "updatedAt")
VALUES
('Anthony', '1234', '2025-02-05', '2025-02-05'),
('Larry', '0000', '2025-02-05', '2025-02-05');

INSERT INTO "expenses" ("userId", "category", "amount", "expenseDate", "recurringDate")
VALUES
(1, 'Rent', 1200, '01-01-2025', '2025-02-01'),
(1, 'Food', 30, '01-10-2025', NULL),
(2, 'Rent', 2000, '01-01-2025', '2025-02-01');
