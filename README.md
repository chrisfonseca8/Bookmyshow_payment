# BookMyShow Booking Microservice

A scalable movie ticket booking microservice designed to safely handle concurrent seat reservations using database transactions and row-level locking.

The service prevents double booking by leveraging ACID-compliant transactions (`SELECT ... FOR UPDATE`) to ensure that only one user can reserve a particular seat at any given time. Seats are temporarily reserved during the payment process and are automatically released if the reservation expires or the payment fails.

The payment module follows the Strategy and Proxy design patterns, making it easy to integrate multiple payment gateways while supporting retry mechanisms and fault-tolerant payment handling.

## Features

- Concurrent seat booking support
- Row-level locking for race condition prevention
- ACID-compliant database transactions
- Temporary seat reservation mechanism
- Automatic reservation expiry
- Payment gateway abstraction using Strategy Pattern
- Payment retry mechanism using Proxy Pattern
- Transaction rollback support
- Fault-tolerant booking workflow
- Extensible and scalable microservice architecture

## Booking Flow

```text
Select Seats
      ↓
Begin Transaction
      ↓
Acquire Row Locks
      ↓
Reserve Seats (INITIATED)
      ↓
Commit Transaction
      ↓
Process Payment
      ↓
Payment Successful?
      ↓
Begin Transaction
      ↓
Validate Reservation
      ↓
Acquire Row Locks
      ↓
Mark Seats as BOOKED
      ↓
Commit Transaction
      ↓
Generate Ticket
```

## Concurrency Handling

- Uses row-level locks (`SELECT ... FOR UPDATE`) to prevent multiple users from reserving the same seat.
- Ensures that concurrent booking requests are safely serialized at the database level.
- Prevents race conditions and guarantees seat exclusivity during the booking process.

## ACID Guarantees

- **Atomicity** – Seat reservations are completed entirely or rolled back.
- **Consistency** – The database always remains in a valid state.
- **Isolation** – Concurrent transactions do not interfere with one another.
- **Durability** – Successfully committed bookings are permanently stored.

## Tech Stack

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- Database Transactions
- Row-Level Locks
- Strategy Pattern
- Proxy Pattern
