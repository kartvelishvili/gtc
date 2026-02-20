import PopularWines from "@/components/PopularWines/PopularWines";
import WineInfo from "@/components/WineInfo/WineInfo";
import WineSlider from "@/components/WineSlider/WineSlider";
import { NextPage } from "next";
import { BlogTypeEnum } from "@/enums/blog-type.enum";
import { getDictionary } from "@/app/dictionaries/dictionaries";
import TimeLine from "@/components/TimeLine/TimeLine";
import TimeLineBackground from "@/../public/images/timeline-background.png";
import ProductsGrid from "@/app/[lang]/(video)/components/ProductsGrid";
import { getProducts, getProductItems, getBlogs, getCompanies } from "@/lib/data/queries";

const MainPage: NextPage<{ params: any }> = async ({ params }) => {
  const { lang } = await params;
  const products = await getProducts();
  const popularWines = await getProductItems({ isPopular: true });
  const aboutUsBlogs = await getBlogs({ type: BlogTypeEnum.AboutUs, visibleOnHome: "true" });
  const companies = await getCompanies();
  const dictionary = (await getDictionary(lang)) as any;

  return (
    <>
      <ProductsGrid
        locale={lang}
        products={products.map((p) => ({
          name: (p.name as any)[lang],
          image: p.file.url || '',
          id: p.id,
        }))}
      />
      <WineInfo
        blogs={aboutUsBlogs}
        dictionary={JSON.parse(JSON.stringify(dictionary))}
        locale={lang}
      />
      <PopularWines
          items={popularWines}
          locale={lang}
          dictionary={JSON.parse(JSON.stringify(dictionary))}
      />
      <WineSlider data={companies} locale={lang} />
      <TimeLine
        backgroundImageUrl={TimeLineBackground.src}
        locale={lang}
        dictionary={JSON.parse(JSON.stringify(dictionary))}
      />
    </>
  );
};

export default MainPage;
