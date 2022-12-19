import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Image from "next/image";
import CompanyLogo from "../public/images/logo.png";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";
import Link from "next/link";

interface Props {
  posts: [Post];
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="flex justify-between items-center bg-yellow-400 border-black border py-10 lg:py-0">
        <article className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black">Medium</span> is a
            place to write, read, and connect.
          </h1>
          <h2>
            It's easy and free to post your thinking on any topic and connect
            with millions of readers.
          </h2>
        </article>
        <Image
          alt="logo"
          src={CompanyLogo}
          className="hidden h-64 w-64 md:inline-flex lg:h-full"
        />
      </main>
      <section className="grid grid-cols-1 gap-3 p-2 md:p-6 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="group rounded-lg cursor-pointer overflow-hidden">
              <img
                src={urlFor(post.mainImage).url()!}
                alt={post.title}
                className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-xs text-gray-400">
                    {post.description} by {post.author.name}
                  </p>
                </div>
                <img
                  src={urlFor(post.author.image).url()!}
                  alt=""
                  className="h-12 w-12 rounded-full"
                />
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author -> {
      name,
      image,
    },
    description,
    mainImage,
    slug
  }
  `;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};

export default Home;
