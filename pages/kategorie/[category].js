import Page from '../../layout/page';
import SubMenu from '../../components/SubMenu';
import Article from '../../components/ArticleShort';
import localize from '../../data/localize'
import sanityClient from "../../lib/sanity.js";

export async function getServerSideProps({params, locale}) {

  const {lang} = localize(locale)

  const archive = `*[_type == "archive" && '${params.category}' == ${lang}.slug.current] {
    _id,
    "titleHead": ${lang}.titleHead,
    "descriptionHead": ${lang}.descriptionHead
  } | order(sort asc)`;


  const query = `*[_type == "article" && $id == ${lang}.category._ref] {
    "title": ${lang}.title,
    "image": ${lang}.image,
    "slug": ${lang}.slug,
    "sort": ${lang}.sort
  } | order(sort asc)`;

  const data = await sanityClient.fetch(archive)

  if(!data.length){
    window.location.href = '/not-found'
  }

  const articles = await sanityClient.fetch(query, {id: data[0]._id})


  return {
    props: {
      articles,
      archives: data[0],
      lang
    }
  }
}

const BlogShort = ({articles, archives, lang}) => {

  return (
    <Page id="blog" description={archives.descriptionHead} title={archives.titleHead}>
      <section className="head_category head_category_articles">
        <div className="uk-container uk-container-expand">
           <SubMenu data={articles} articles />
        </div>
      </section>

      <section className="category grey">
        <div className="uk-container uk-container-expand">
          <div className="uk-grid uk-child-width-1-1 uk-child-width-1-2@s" uk-grid="" uk-scrollspy="target: > div > a; cls: uk-animation-slide-top-small; delay: 500">
            {(articles || []).map((item, index) => <Article key={index} lang={lang} data={item}/>)}
          </div>
        </div>
      </section>
    </Page>
  )
}


export default BlogShort
