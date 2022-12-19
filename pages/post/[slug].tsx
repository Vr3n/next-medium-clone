import { GetStaticProps, NextPage } from "next";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import Head from "next/head";
import PortableText from "react-portable-text";

interface Props {
  post: Post;
}

const Post: NextPage<Props> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Header />
      <main>
        <img
          src={urlFor(post.mainImage).url()!}
          alt={post.title}
          className="w-full h-60 object-cover"
        />
        <article className="max-w-3xl mx-auto">
          <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
          <h2 className="text-xl font-light text-gray-500 mb-2">
            {post.description}
          </h2>
          <div className="flex items-center space-x-2">
            <img
              src={urlFor(post.author.image).url()!}
              alt={post.author.name}
              className="rounded-full h-10 w-10"
            />
            <p className="font-extralight text-sm">
              Blog post by{" "}
              <span className="text-green-600">
                {post.author.name} - Published at{" "}
              </span>
              {new Date(post._createdAt).toLocaleString()}
            </p>
          </div>
          <div>
            <PortableText
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
              content={post.body}
              className="my-5"
              serializers={{
                h1: (props: any) => {
                  <h1 className="text-2xl font-bold my-5" {...props} />;
                },
                h2: (props: any) => {
                  <h2 className="text-xl font-bold my-5" {...props} />;
                },
                li: ({ children }: any) => {
                  <li className="ml-4 list-disc">{children}</li>;
                },
                link: ({ href, children }: any) => {
                  <a href={href} className="text-blue-500 hover:underline">
                    {children}
                  </a>;
                },
              }}
            />
          </div>
        </article>
      </main>
    </>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
        _id,
        slug {
          current
        }
    }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
        *[_type == "post" && slug.current == $slug][0]{
            _id,
            _createdAt,
            title,
            author -> {
                name,
                image,
            },
            description,
            mainImage,
            slug,
            body
        }
    `;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 3600,
  };
};
