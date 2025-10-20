
// interface I + composant + props
import {FC} from "react";
import Head from "next/head";

interface ISeoProps {
    title: string;
    description: string;
}


// le composant

export const Seo: FC<ISeoProps> = ({title, description}) => {
    return (
        <Head>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta name="viewport" content="width=device-width initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
        </Head>
);
} // juste une balise