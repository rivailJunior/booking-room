# Booking Room


## Stack

* [Nextjs v14](https://nextjs.org/docs)
* [Prisma](https://www.prisma.io/docs/getting-started)
* Typescript
* [Tailwindcss](https://tailwindcss.com/)
* [Vitest (unit and integration tests)](https://vitest.dev/)
* [Cypress (End To End Tests)](https://www.cypress.io/)

## Architecture
* Clean Arc (Domain folder contains all the booking logic)
* Api Rest (for some routes such as Booking and Room)
* SSR for pages
* Server actions
* Client components

## Getting Started

```bash
# install
npm run install

# create .env file based on .env.example file
touch .env

# prisma
npx prisma generate

npx prisma migrate dev --name init

npm prisma seed

# run dev
npm run dev

# localhost:3000
```

## Login

It's necessary to create the booking, cancel booking, manage booking.

* email: jhondoe@gmail.com
* password: #Test123

