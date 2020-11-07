import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from '@emotion/styled';
import mediaqueries from "@styles/media";
import { Link } from 'gatsby';

import Section from "@components/Section";
import Headings from "@components/Headings";
import SEO from "@components/SEO";
import Layout from "@components/Layout";
import ArticlesGradient from "@components/ArticlesGradient";
import PageHero from "../sections/others";

const seoImage = '/trongnguyen.co-seo-little-big-grid.jpg';

const siteQuery = graphql`
{
  allArticle(sort: {order: DESC, fields: date}) {
    edges {
      node {
        title
        date(formatString: "MMM DD, YYYY")
        slug
        secret
      }
    }
  }
  allSite {
    edges {
      node {
        siteMetadata {
          description
          title
          hero {
            maxWidth
          }
        }
      }
    }
  }
}
`;

const Archive = ({ location }) => {

  const result = useStaticQuery(siteQuery);
  const siteSEO = result.allSite.edges[0].node.siteMetadata;
  const articlesThatArentSecret = result.allArticle.edges.filter(edge => !edge.node.secret);
  const reducer = (accumulator, article) => {
    const year = (new window.Date(article.node.date)).getFullYear();
    accumulator[year] = accumulator[year] ?? [];
    accumulator[year].push(article.node);
    return accumulator;
  }
  const articlesByAscYear = articlesThatArentSecret.reduce(reducer, {});
  const decsYears = Object.keys(articlesByAscYear).reverse();
  
  return (
    <Layout>
      <SEO
        pathname={location.pathname} 
        title={"Archives - " + siteSEO.title}
        description={siteSEO.description}
        image={seoImage}
      />
      <PageHero
        heading="Archives"
        subtitle={articlesThatArentSecret.length + " articles."}
        maxWidth={siteSEO.hero.maxWidth}
      />
      <Section narrow>
        <Wrapper>
          {decsYears.map((year, index) => (
            <ArticlesWrap key={index}>
              <Year>{year}</Year>
              <ArticlesInYear>
                {articlesByAscYear[year].map((item, index) => (
                  <ArticlesItem to={item.slug} data-a11y="false" key={index}>
                    <Date>{item.date}</Date>
                    <Title>{item.title}</Title>
                  </ArticlesItem>
                ))}
              </ArticlesInYear>
            </ArticlesWrap>
          ))}
        </Wrapper>
      </Section>
      <ArticlesGradient />
    </Layout>
  );
};

export default Archive;

const ArticlesWrap = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 20% 1fr;
  
  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
  `};
`;

const ArticlesInYear = styled.div`
  margin-bottom: 48px;
`;

const Year = styled(Headings.h2)`
  color: ${p => p.theme.colors.secondary};

  ${mediaqueries.tablet`
    margin-bottom: 32px;
    font-size: 48px;
  `};
`;

const ArticlesItem = styled(Link)`
  z-index: 1;
  position: relative;
  display: grid;
  grid-template-columns: 120px 1fr;
  column-gap: 16px;
  margin-bottom: 16px;

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
    margin-bottom: 56px;
  `};
`;

const Date = styled.div`
  font-size: 16px;
  color: ${p => p.theme.colors.secondary};
  margin-bottom: 4px;
  padding-top: 3px;
`;

const Title = styled.h2`
  font-size: 20px;
  color: ${p => p.theme.colors.secondary};
  font-family: ${p => p.theme.fonts.title};
  font-weight: ${p => p.theme.fontsWeight.bold};

  &:hover {
    color: ${p => p.theme.colors.accent};
  }

  ${mediaqueries.tablet`
    font-size: 26px;
    padding-top: 8px;
  `};

`;

const Wrapper = styled.div`
  margin-bottom: 120px;
`;