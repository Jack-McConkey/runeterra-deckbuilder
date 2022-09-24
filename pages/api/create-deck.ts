import type {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../db/client";

type Data = {
    message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const data = JSON.parse(req.body);

    const newDeck = await prisma.decks.create({
        data: {
            deckCode: data.deckCode,
            selectedCards: {
                createMany: {
                    data: [...data.cards],
                },
            },
        },
    });

    console.log(newDeck);
    res.status(200).json({message: "Deck Saved"});
}
