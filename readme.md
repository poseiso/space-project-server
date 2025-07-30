# Pi Calculator API for Space Project

A simple but robust backend API that continuously calculates digits of π (Pi) using **Machin's formula** with arbitrary precision, stores the latest value in a database, and exposes a few REST endpoints to monitor and control the calculation.

Built with:
- [Fastify](https://www.fastify.io/) – for lean http framework
- [Prisma](https://www.prisma.io/) – for type-safe DB operations
- [Vitest](https://vitest.dev/) – for unit testing
- Pure BigInt-based algorithm for precision control


## Project Structure

```
src/
├── controllers/        # API handlers for HTTP endpoints
├── routes/             # Route registration
├── services/           # Pi business logic and DB access
├── utils/              # Constants and Machin's formula calculator
├── state.ts            # Simple in-memory pause/resume control
├── db.ts               # Prisma client instance
├── server.ts           # Main entry point
└── **tests**/          # Sample unit test
````


## How to Run Locally

### 1. Clone & Install

```bash
git clone https://github.com/poseiso/space-project-server.git
cd space-project-backend
npm install
````

### 2. Configure Environment

Create a `.env` file from cloning `.env.example`

```env
DATABASE_URL="file:./dev.db" # SQLite db url
PORT=4000
COUNT_INTERVAL=1000 # interval for each calculation
MAX_DIGITS=100000 # max digits, delete this to uncap the limitation
```

> Default fallback values exist if `.env` is not found.

### 3. Initialize the Database

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run seed
```


### 4. Start Server

```bash
npm run dev
```

Or, for production:

```bash
npm run build
node dist/server.js
```


## Run Tests

```bash
npx vitest run
```

Tested with [`vitest`](https://vitest.dev/). Tests include:

* Correctness for several Pi digit levels (2, 10, 100, 1000)
* Precision checking against known values


## API Endpoints

| Method | Path         | Description                |
| ------ | ------------ | -------------------------- |
| GET    | `/pi`        | Returns the latest π value |
| POST   | `/pi/pause`  | Pauses the computation     |
| POST   | `/pi/resume` | Resumes the computation    |
| POST   | `/pi/reset`  | Resets value to 3.1        |
| GET    | `/health`    | Simple health check        |

Example response:

```json
{
  "pi": "3.1415926535",
  "digits": 10,
  "updatedAt": "2025-07-30T10:21:05.232Z"
}
```


## Caveats & Limitations

* **Not parallelized**: All computation is single-threaded and synchronous.
* **Precision limit**: Though using `BigInt`, extremely high digit counts will degrade performance and precision due to JS limits.
* **Shared State**: Every user share a single state, meaning if a user paused the calculation it pauses for everyone.


## Future Improvements

* [ ] **Use worker thread / job queue** for non-blocking digit calculation
* [ ] **Add authentication and authorization**
* [ ] **Containerize using Docker** for ease of deployment


## Contact

For further questions or inquiry feel free to reach out to:
[Posei / @fajar.firdaus](mailto:contact@posei.me)


## License

MIT

