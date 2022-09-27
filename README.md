## Project Description

I built this app as a portfolio project, this app allows the user to create a deck from the popular online card game, Legends of Runeterra. Upon creating a deck, the user will be able to copy a deckcode which can be used in the game to import the deck they have just created.

## Main Technologies / Packages

-   React
-   Typescript
-   Next JS
-   Prisma
-   tRPC
-   lor-deckcode-ts - https://github.com/jcuker/lor-deckcode-ts

## Hightlights

I tried out NextJS, Prisma and tRPC for the first time in this project and found these technologies very fun to work with. tRPC in particular made the API routes very easy to work with and I was only scratching the surface of what it can do in this project, I look forward to working with it more in future projects.

## Challenges

The major challenge in this project was performance. The game currently has well over 1500 cards and rerendering these cards was causing major slowdown in the app. In the early stages a rerender of the cards container was taking more than 700ms which felt laggy and was very noticable for me. In addition the image load times were fairly slow as the images came in large PNG files orginally.

The cards container had to be rerendered for several reasons, for example whenever a use filters for a specific set of cards, whenever a use adds a card to the deck etc so these rerenders were happening consistently as a fundamental part of the app.

Once I noticed this issue I started looking through the react profiler and found that a major part of the performance impact was coming from the NextJS image component being rerendered. The Image component did not need any new props after its initial render so I addressed this issue using the useMemo hook on the Image components.

This change on its own drastically improved the performance of the app, reducing the rerender time by over half but I still felt it was too slow, it was at this point that I rehosted the card images via cloudinary in webp format. I found the several other performance impacts while diving into the app.

The DOM size was significant with well over 10000 DOM elements being present, the main factor causing the large size was wrapping elements, I stripped down the card componets of all unnecessary elements and used the Next Future Image component, this component is experimental but has no wrapping elements, as a result I was able to get the DOM size down to just 3000 elements while maintaining all the cards in the DOM.

I was also unmounting and remounting cards based on the filters which was negating the useMemo so I moved to a CSS approach to hide the cards rather than unmounting. I could probably continue adding more information on the tiny tweaks I made but the end result is that a rerender of the cards container now takes between 20-50ms and feels extremely snappy when filtering.
