/* eslint-disable @next/next/no-img-element */
import MainLayout from "../../components/layouts/MainLayout";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default function Character({ data }) {
  console.log(data);

  return (
    <MainLayout>
      <h1>{data.name}</h1>
      <img src={data.image} alt="" />
    </MainLayout>
  );
}
