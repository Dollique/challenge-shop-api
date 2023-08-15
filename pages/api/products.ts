import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const response = await fetch(`https://${process.env.API_HOST}${process.env.API_PATH}`);
    const data = await response.json();

    res.status(200).json(data);
}
