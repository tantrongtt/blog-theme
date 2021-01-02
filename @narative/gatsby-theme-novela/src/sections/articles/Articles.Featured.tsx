import React from 'react';
import { graphql, useStaticQuery } from "gatsby";
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from "gatsby";
import Headings from '@components/Headings';

import mediaqueries from '@styles/media';

const siteQuery = graphql`
{
  allArticle(sort: {order: DESC, fields: date}) {
    edges {
      node {
        title
        date(formatString: "MMM DD, YYYY")
        slug
        featured
        categories
      }
    }
  }
}
`;

const FeaturedArticles: React.FC<{}> = () => {

  const result = useStaticQuery(siteQuery);
  const featuredArticles = result.allArticle.edges.filter(edge => edge.node.featured);


  return (
    <SectionWrapper>
      <SectionTitle>Featured Posts</SectionTitle>
      <List>
        {featuredArticles.map((article, index) =>(
          <FeaturedCard to={article.node.slug} data-a11y="false" key={index}>
            <DatePost>{article.node.date}</DatePost>
            <Title>{article.node.title}</Title>
            <Categoriest>{article.node.categories}</Categoriest>
          </FeaturedCard>

        ))
        }
      </List>
    </SectionWrapper>
  );
};

export default FeaturedArticles;

const SectionWrapper = styled.div`
  margin-bottom: 48px;
`;

const List = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  overflow-x: scroll;
  padding: 32px 48px 48px 8px;
  margin: -16px 0 24px 0;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
 
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255,255,255,.4);
    border-radius: 8px;

  &:hover {
    background: rgba(255,255,255,.7);
  }

  }

`;

const FeaturedCard = styled(Link)`
  min-width: 230px;
  min-height: 320px;
  background: linear-gradient(191.98deg, rgba(255, 255, 255, 0.3) 3.8%, rgba(255, 255, 255, 0) 95.58%);
  box-shadow: inset 0px 0px 0px 1px rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(16px);
  border-radius: 32px 0px 32px 32px;
  padding: 32px 24px;
  transition: transform 0.33s var(--ease-out-quart);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  display: flex;
  flex-direction: column;

  ${mediaqueries.phablet`
    min-width: 190px;
  `}

  &:not(:first-child) {
    margin-left: -80px;
    box-shadow: -16px 24px 32px rgba(152, 176, 180, 0.3), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.6);

  }

  &:hover {
    transform: translateY(-1rem) rotate(3deg);

    & + a {
      transform: translateX(48px);
    }
  }
`;

const Title = styled(Headings.h4)`
  margin-top: 8px;
`;

const DatePost = styled.div`
  font-weight: ${p => p.theme.fontsWeight.normal};
  font-family: ${p => p.theme.fonts.body};
  font-size: 12px;
  color: ${p => p.theme.colors.secondary};
`;

const Categoriest = styled.div`
  font-weight: ${p => p.theme.fontsWeight.bold};
  font-family: ${p => p.theme.fonts.title};
  font-size: 12px;
  color: ${p => p.theme.colors.accent};
  text-transform: uppercase;
  margin-top: 8px;

`;

const SectionTitle = styled.div`
  font-weight: ${p => p.theme.fontsWeight.bold};
  font-family: ${p => p.theme.fonts.title};
  font-size: 16px;
  color: ${p => p.theme.colors.primary};
`;
