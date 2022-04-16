# Shopify Backend Developer Intern Challenge - fall 2022

## Challenge Info

Feature chosen: Ability to create warehouses/locations and assign inventory to specific locations

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

````bash
~$ curl --location --request GET 'http://<entry>/api/'

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
~$ curl --location --request POST 'http://<entry>/api/' \
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
````

Update the product.

> It takes in `http://<entry>/:id` where `:id` is the id of the product.  
> The response is the outdated product, not the updated product.

```bash
~$ curl --location --request PUT 'http://<entry>/api/61d63f03a2c85b5bd52f7a58' \
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
curl --location --request DELETE 'http://<entry>/api/61d63f03a2c85b5bd52f7a58'

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
