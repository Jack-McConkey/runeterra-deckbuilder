import type {NextApiRequest, NextApiResponse} from "next";
import {RuneterraCard} from "../../Components/DeckBuilder/types";
import {prisma} from "../../db/client";

type Data = {
    name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const cards = await prisma.cards.findMany({
        where: {
            NOT: {
                card: {
                    path: "$.rarity",
                    equals: "Champion",
                },
            },
        },
    });
    res.status(200).json(cards as any);
}
