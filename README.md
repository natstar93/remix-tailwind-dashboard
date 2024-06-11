# Remix Tailwind Dashboard
https://remix-tailwind-dashboard.onrender.com (free plan, takes a long time to load)

## How to Run
Run production build
```sh
npm i
npm run build
npm run start 
```
Run development build
```sh
npm run dev
```
Run unit tests:
```sh
npm test
```

## Assumptions
- When the application first renders, all patient records should be shown.
- The application will be used by health surgeries i.e. users with low latency therefore front end sorting shouldn't be an issue.
- The brief stated that names should be sortable by the patient's last name; I haven't implemented a step to additionally sort patients with the same last name by first name because it wasn't a requirement. This is something I would usually bring up in sprint refinement since it is likely a missed requirement.
- The mock API fetch result is a comparable size to the data the call would be receiving in production. In the real world I would discuss with a Product person whether we would be expecting the same amount of records; if we would be looking to use e.g. the entire NHS trust/country's patient data then that would affect decisions around performance optimisations.

## Development

### How did you approach solving the problem? Include any decision making around libraries used, tooling choices

I approached the problem by first calling the mock API with different search terms such as `?lastName=` and having a quick read about the available parameters in the mockAPI docs. I noticed that annoyingly it returns a string 'Not found' rather than an empty array if the query term isn't matched. I then re-read the requirements and considered the wireframe design when deciding how to structure the flow of data through the application. Using a state management tool such as Redux seemed like overkill for a tiny app that only handles a set of records, so I opted to used a Context and Provider to share the data between components.

When building the sort function I used TDD to drive the development and updated the tests and then code as the function progressed into a HoF. I decided it would be better to return a new array rather than mutate the original array. I think it's a bit clearer to read and fits with the modern React & JS approaches. The trade off is that it creates an extra object in memory.  

I was tempted to use the stack I've used in the past (Express server, BFF routes for the server-side API fetch, React Typescript client side) but I've recently started learning RemixJS and have been impressed by its speed and the way it uses nesting, the assset manifest and form handling to only fetch what is required from the server. I quite like the fact that you can write the server side (loader) and client side code in the same file too. Although the Dashboard task didn't need a lot of different requests I was interested to see if Remix could 'scale down' as promised in the docs and what that would look like. I used Typescript rather than Javascript because I really like the type safety and the readability.

I spent some time building the UI and functions and a lot of time configuring Jest and Typescript and getting the tests to work. I used semantic elements that conform to a11y standards and used `getByRole` a lot in my tests because it can only be used to query elements that are exposed in the accessibility tree.

### How did you verify your solution works correctly?

I wrote unit tests, tested locally in the browser at different screen widths and deployed the solution to [Render](https://render.com/) to check it on my mobile device.

### How long did you spend on the exercise?

I spent around a day on this task. The unit tests took a while and I had to make several changes to the jest config which didn't exactly work out of the box with my Remix Typescript setup.

### What would you add if you had more time and how?

I was having an issue to do with the error boundary conflicting with the loaderData call in the root component; this occurs when there is an error fetching and would be my priority to fix. The solution might involve moving the loader fetch to another component so that the root component does less; I would like to look into doing this anyway since the root component is getting a bit too big. Smaller components are better for readability, testability and the single responsibility principle and I am uncomfortable with how much the root component is doing. Perhaps the data loading is the concern of the patients page? The root component currently defines a layout and uses an `<Outlet>` to nest other roots' rendered components inside the layout; I would use this approach in another route component and define a new 'parent' component to the nested UI components. I'd also like to split the patient details out into a `<PatientRecord>` component.

Most of the important functionality has a couple of unit tests which mock the external service and imports from other files within the project. I would like to add a couple more scenarios, such as for the sorting feature. I would also add integration tests to make sure the integrations between components are working ok and would likely use RTL for this since it's very good at simulating actual browser and user behaviour. I would perhaps a single 'happy path' e2e test that runs through the main sorting and filtering actions and uses the real API endpoint. For this I would either use Playwright or Cypress.

I would improve the styling which is fairly basic especially at the smaller breakpoints. I'd like to include dark mode support; this is straighforward using Tailwind; you can just prepend `dark:` to classes that should only appear in dark mode. I'd improve the error messages and make them more user friendly.

If I had a lot of time and wasn't just keeping to the requirements I'd quite like to implement a dark mode toggle and multi-language support. 

