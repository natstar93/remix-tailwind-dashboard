# AccuBook Dashboard

## Task

## Assumptions
The application will be used by health surgeries i.e. users with low latency therefore front end sorting shouldn't be an issue

## Development

- How did you approach solving the problem?
    - Include any decision making around libraries used, tooling choices

https://61ba219448df2f0017e5a929.mockapi.io/api/patients?sortby=lastName is case sensitive. Better to sort on the front end anyway

- How did you verify your solution works correctly?

- How long did you spend on the exercise?

- What would you add if you had more time and how?

Configure moduleNameMapper to use absolute paths

📖 See the [Remix docs](https://remix.run/docs) and the [Remix Vite docs](https://remix.run/docs/en/main/guides/vite) for details on supported features.

## Development

Run the Vite dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`
