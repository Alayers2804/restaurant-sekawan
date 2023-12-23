import Image from "next/image";
import Card from "./components/card";
import Nav from "./components/nav";
import Filter from "./sections/filter";
import ListRestaurant from "./sections/listRestaurant";

export default function Home() {
  return (
    <>
      <header className="pt-3 md:pt-3">
        <Nav />
        <main className="container mx-auto mt-10 ">
          <Filter />
          <ListRestaurant />
        </main>
      </header>
    </>
  );
}
