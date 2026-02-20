import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
import { BoleroWines } from "@/app/[lang]/(products)/products/components/BoleroWines/BoleroWines";
import { NextPage } from "next";
import {getDictionary} from "@/app/dictionaries/dictionaries";
import { getProductItem, getRandomProductItems } from "@/lib/data/queries";
import { notFound } from "next/navigation";

const SingleWinePage: NextPage<{ params: any }> = async ({ params }) => {
  const { id, lang } = await params;

  const wine = await getProductItem(Number(id));
  if (!wine) return notFound();
  const similarItems = await getRandomProductItems(Number(id));
  const dictionary = await getDictionary(lang) as any;

  return (
    <>
      <ContentWrapper>
        <BoleroWines locale={lang} item={wine} similarItems={similarItems} dictionary={JSON.parse(JSON.stringify(dictionary))} />
      </ContentWrapper>
    </>
  );
};

export default SingleWinePage;
