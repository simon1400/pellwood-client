import { useState, useEffect } from "react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../lib/sanity.js";
import { useRouter } from "next/router";
import Link from "next/link";

const imageBuilder = imageUrlBuilder(sanityClient);
const urlFor = (source) => imageBuilder.image(source);

const Article = ({ lang, data }) => {
  const router = useRouter();

  return (
    <div className="uk-width-1-1 uk-width-1-2@s">
      <Link
        href={`/clanek/${router.query.category || data.categorySlug.current}/${
          data.slug.current
        }`}
      >
        <a className="big_category">
          <div className="category_wrap">
            <div className="uk-inline uk-height-1-1 uk-width-1-1">
              <div
                className="blanded-mix uk-width-1-1 uk-height-1-1 uk-background-cover"
                style={{
                  backgroundImage: `url(${urlFor(data.image)
                    .width(1200)
                    .auto("format")
                    .url()})`,
                }}
                data-src={urlFor(data.image).width(1200).auto("format").url()}
                uk-img=""
              ></div>
              <div className="overlay uk-position-center uk-flex uk-flex-center uk-flex-middle">
                <h2 className="category_short_name">{data.title}</h2>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Article;
