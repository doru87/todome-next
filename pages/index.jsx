import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { useRouter } from "next/router";
import Link from "next/link";
import { useIntl } from "react-intl";
import LanguageMenu from "../src/components/LanguageMenu";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const { language, coordinates } = GetUsersCoords();
  const { locale, locales, push } = useRouter();
  const { formatMessage } = useIntl();

  // const handleClick = (item) => () => {
  //   push(`/${item.toLowerCase()}`, undefined, { locale });
  // };

  let menuData = [
    "Rezidential",
    "Industrial",
    "Mobilier",
    "Tamplarie otel",
    "Resigilate",
  ];
  return (
    <>
      <LanguageMenu />
      {/* <div>{language}</div>
      <div>{coordinates?.lat}</div>
      <div>{coordinates?.lng}</div> */}
      {/*       
      <ul>
        {menuData.map((item) => (
          <li key={item} onClick={handleClick(item)}>
            {item}
          </li>
        ))}
      </ul> */}
      <ul>
        {menuData.map((item) => (
          <li key={item}>
            <Link href={`/${item.toLowerCase()}`} locale={locale}>
              {item}
            </Link>
          </li>
        ))}
      </ul>
      <div>{formatMessage({ id: "Search families" })}</div>
    </>
  );
}
