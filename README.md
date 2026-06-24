# Goldin
This project is an online gold buying and selling platform called Goldin, which is designed with a private front-end and back-end architecture. The back-end is implemented with Django and Django REST Framework, and its main task is to manage users, rial and gold wallets, buy and sell orders, internal accounting (ledger), and gold moment pricing. The front-end is also built with React (Vite) and its role is to provide a simple and fast user interface for the user with the financial system.

<img width="1536" height="1024" alt="ChatGPT Image Jun 24, 2026, 06_31_41 PM" src="https://github.com/user-attachments/assets/fae7bc25-1024-4441-bbb9-565493eb9868" />

# Account Opening Process

The Goldin platform uses a controlled account opening workflow to ensure that every customer is properly verified before gaining access to financial services such as deposits, withdrawals, and gold trading.

When a user registers on the platform, only a basic user account is created. The user must then complete their profile information and submit an account opening request. This request enters a pending state and awaits review by the platform administrators or an automated KYC (Know Your Customer) system.

<img width="2534" height="1742" alt="mermaid-diagram" src="https://github.com/user-attachments/assets/e64e4936-752a-41d7-863f-3c2b95986915" />

Once the request is approved, the system automatically provisions all required financial resources for the customer. These resources include a fiat wallet (IRT wallet), a gold wallet, and the corresponding ledger accounts used by the double-entry accounting engine. Only after this approval process is completed can the user perform financial operations such as depositing funds, withdrawing funds, buying gold, or selling gold.

This design separates user registration from financial account activation, improving security, regulatory compliance, auditability, and scalability.

<img width="2604" height="328" alt="mermaid-diagram (1)" src="https://github.com/user-attachments/assets/4d73b6c1-6671-4722-a21d-c678041a3ff8" />

