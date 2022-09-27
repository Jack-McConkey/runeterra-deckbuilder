import type {NextApiRequest, NextApiResponse} from "next";
import {RuneterraCard} from "../../Components/DeckBuilder/types";
import {prisma} from "../../db/client";

type Data = {
    cards: {
        id: string;
        cardCode: string;
        card: RuneterraCard;
    };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const prepareQuery = req.query;
    const cards = await prisma.cards.findMany({
        where: {
            cardCode: {in: ""},
        },
    });
    res.status(200).json(cards as any);
}
