# Blockchain price tracker

## Environment

```
NodeJs: 22
Docker: 25
```

## Dev

### Use docker

Set Moralis API key in `.env`

```sh
MORALIS_API_KEY=#Moralis api key
EMAIL_HOST=#
EMAIL_PORT=#
EMAIL_USER=#
EMAIL_PASS=#
ADMIN_EMAIL_ADDRESS=noreply@bclabs.co.kr
```

- cmd

```shell
docker compose -f compose-dev.yaml up --build
```

## Prod

Set Moralis API key in `.env`

```sh
MORALIS_API_KEY=#Moralis api key
EMAIL_HOST=#
EMAIL_PORT=#
EMAIL_USER=#
EMAIL_PASS=#
ADMIN_EMAIL_ADDRESS=noreply@bclabs.co.kr
```

- cmd

```shell
docker compose up --build
```

## Document

```shell
http://localhost:3000/docs
```
