# Shopify Backend Developer Intern Challenge - fall 2022

## Challenge Info

The application is hosted on [https://shopify-backend-2022-fall.herokuapp.com/](https://shopify-backend-2022-fall.herokuapp.com/). It may take ~30 seconds on the first load (Heroku automatically goes down when no one is using it).

## Endpoints

Each product has the following fields:

```ts
// When creating/editing a product, the following is required
interface RequestItem {
  name: string;
  desc?: string; // Optional
  currLocation: string;
  totalItems: number;
}
// The response includes an additional unique ID
interface ResponseItem extends RequestItem {
  id: string;
}
```

Get a list of created products (JSON):

```bash
~$ curl --location --request GET 'https://shopify-backend-2022-fall.herokuapp.com/'

[
    {
        "name": "Painting",
        "desc": "Mona Lisa",
        "currLocation": "Paris",
        "totalItems": 1,
        "id": "61d63b5ea2c85b5bd52f7a4f"
    },
    {
        "name": "Bowl",
        "currLocation": "Kitchener",
        "totalItems": 16,
        "id": "61d63f03a2c85b5bd52f7a58"
    }
]


Add a new product:

```bash
~$ curl --location --request POST 'https://shopify-backend-2022-fall.herokuapp.com/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Bowl",
    "currLocation": "Kitchener",
    "totalItems": 16
}'

{
    "name": "Bowl",
    "currLocation": "Kitchener",
    "totalItems": 16,
    "id": "61d63f03a2c85b5bd52f7a58"
}
```

Update the product.

> It takes in `https://shopify-backend-2022-fall.herokuapp.com/:id` where `:id` is the id of the product.  
> The response is the outdated product, not the updated product.

```bash
~$ curl --location --request PUT 'https://shopify-backend-2022-fall.herokuapp.com/61d63f03a2c85b5bd52f7a58' \
--header 'Content-Type: application/json' \
--data-raw '{
    "desc": "Made with copper and includes spoons",
    "currLocation": "Toronto"
}'

{
    "name": "Bowl",
    "currLocation": "Kitchener",
    "totalItems": 16,
    "id": "61d63f03a2c85b5bd52f7a58"
}
```

Delete the product.

> This also takes in `:id` like before

```bash
curl --location --request DELETE 'https://shopify-backend-2022-fall.herokuapp.com/61d63f03a2c85b5bd52f7a58'

{
    "name": "Bowl",
    "currLocation": "Toronto",
    "totalItems": 16,
    "desc": "Made with copper and includes spoons",
    "id": "61d63f03a2c85b5bd52f7a58"
}
```

## Development Info

Check out `.env.example` for environment variables needed.  
Tech stack is MongoDB, Express, Node 14.  
Deployed on Heroku.
