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
# node 18
npm run install

# create .env file based on .env.example file
touch .env

# run dev
npm run dev

# localhost:3000

# IF these commands do not work. 

# prisma
npx prisma generate

npx prisma migrate dev --name init

npm prisma seed
```

## Login

It's necessary to create the booking, cancel booking, manage booking.

* email: jhondoe@gmail.com
* password: #Test123

