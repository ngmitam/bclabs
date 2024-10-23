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
```

- cmd

```shell
docker compose -f compose-dev.yaml up --build
```

## Prod

Set Moralis API key in `.env`

```sh
MORALIS_API_KEY=#Moralis api key
```

- cmd

```shell
docker compose up --build
```
