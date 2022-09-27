import {initTRPC} from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import {z} from "zod";
import {prisma} from "../../../db/client";

export const t = initTRPC.create();
export const appRouter = t.router({
    newDeck: t.procedure
        .input(
            z.object({
                deckCode: z.string(),
                cards: z.string(),
            })
        )
        .query(({input}) => {
            console.log(input.deckCode);
            return {
                deckCode: `${input.deckCode}`,
            };
        }),
    addDeck: t.procedure
        .input(
            z.object({
                deckCode: z.string(),
                cards: z.string(),
            })
        )
        .mutation(async ({input}) => {
            const cards = await JSON.parse(input.cards);
            const newDeck = await prisma.decks.create({
                data: {
                    deckCode: input.deckCode,
                    selectedCards: {
                        createMany: {
                            data: [...cards],
                        },
                    },
                },
            });
            return {hello: `world`};
        }),
    relatedCards: t.procedure
        .input(
            z.object({
                relatedCards: z.string(),
            })
        )
        .query(async ({input}) => {
            const relatedCards = await prisma.cards.findMany({
                where: {
                    cardCode: {
                        in: JSON.parse(input.relatedCards),
                    },
                },
            });
            return relatedCards;
        }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
// export API handler
export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: () => ({}),
});
