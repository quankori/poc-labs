# DDD + CQRS Architecture with NestJS

## **1. Introduction**

This project implements the **Domain-Driven Design (DDD)** architecture combined with **Command Query Responsibility Segregation (CQRS)** in **NestJS**. This architecture clearly separates write operations (Commands) from read operations (Queries), enhancing the scalability and maintainability of the application.

## **2. Prerequisites**

Before getting started, ensure you have the following tools installed:

- **Node.js** (>=20.x)
- **npm** or **yarn**
- **NestJS CLI**

### **a. Install NestJS CLI**

Using npm:

```bash
npm install -g @nestjs/cli
```

Or using yarn:

```bash
yarn global add @nestjs/cli
```

## **3. Installation**

### **a. Clone Repository**

```bash
git clone https://github.com/quankori/micro-lab
cd micro-lab/alarm-svc
```

### **b. Install Dependencies**

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

Using docker:

```bash
docker compose up
```

## **4. DDD + CQRS Architecture**

### **a. Project Structure**

- **Controllers**: Receive requests from the Client and forward them to the application services.
- **Application Services**: Contain the logic for handling Commands and Queries.
- **Domain**: Contains Entities, Value Objects, Aggregates, and Domain Events.
- **Infrastructure**: Interacts with the database, event store, and external services.
- **Shared**: Contains shared components such as decorators, interfaces, and utilities.

### **b. Command Flow**

1. **Client**: Sends a command via the API.
2. **Controller**: Receives the command from the Client and forwards it to the **Command Service**.
3. **Command Service**: Processes the command and dispatches it to the **Command Handler**.
4. **Command Handler**: Utilizes the **Factory (Domain)** to create or update the **Aggregate Root**.
5. **Aggregate Root**: Manages the state of the Aggregate and applies domain events.
6. **Apply Event**: Generates an event within the Aggregate.
7. **Commit Event**: Records the event to the event store.
8. **Persist Event**: Stores the event in MongoDB through the **Mongo Event Store**.
9. **Mongo Event Store**: Saves the events and notifies changes via the **Event Bridge**.
10. **Event Bridge**: Listens for new events and publishes them to the **Event Handler**.
11. **Event Handler**: Receives the event from the **Event Bridge** and processes it by interacting with the **Repository** to update data.
12. **Repository (MongoDB)**: Directly interacts with the MongoDB database to store or retrieve actual data.

### **c. Query Flow**

1. **Client**: Sends a query via the API.
2. **Controller**: Receives the query from the Client and forwards it to the **Query Service**.
3. **Query Service**: Processes the query and dispatches it to the **Query Handler**.
4. **Query Handler**: Interacts with the **Repository (MongoDB)** to retrieve data.
5. **Repository (MongoDB)**: Fetches data from MongoDB and returns it to the **Query Handler**.
6. **Controller**: Returns the queried data to the Client.

## **5. Running the Application**

### **a. Run in Development Mode**

Using npm:

```bash
npm run start:dev
```

Or using yarn:

```bash
yarn start:dev
```

Or using docker:

```bash
docker compose up
```

The application will run on `http://localhost:3000`.

### **b. Build and Run the Application**

To build the application:

```bash
npm run build
```

## **6. Conclusion**

The **DDD + CQRS** architecture in NestJS effectively separates write and read operations, enhancing the scalability and maintainability of the application. By utilizing components such as **Command Handlers**, **Event Handlers**, and **Mongo Event Store**, you can build a robust and flexible system.

### **Benefits of DDD + CQRS Architecture**

1. **Separation of Concerns**: Clearly separates commands and queries, making the system easier to scale and maintain.
2. **Enhanced Scalability**: Components can be scaled independently without affecting each other.
3. **Event Management**: Event Sourcing allows tracking historical changes and recreating the current state of Aggregates.
