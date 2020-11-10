import React from 'react';
import styled from '@emotion/styled';
import { Link } from "gatsby";
import { graphql, useStaticQuery } from "gatsby";
import Section from "@components/Section";

import Headings from '@components/Headings';

import mediaqueries from '@styles/media';

const image = '/sakura.jpg';

const siteQuery = graphql`
{
  allArticle(limit: 5, sort: {order: DESC, fields: date}) {
    edges {
      node {
        title
        date(formatString: "DD MMM")
        slug
      }
    }
  }
}`;


const LatestArticles: React.FC<{}> = () => {

  const result = useStaticQuery(siteQuery);
  const articlesThatArentSecret = result.allArticle.edges.filter(edge => !edge.node.secret);

  return (
    <Section narrow>
      <WriteContainer>
        <SectionTitle>Latest posts — </SectionTitle>
        {articlesThatArentSecret.map((item, index) => (
          <LatestArticle to={item.node.slug} data-a11y="false" key={index}>
              {item.node.title}
              <ArticleDate>{item.node.date}</ArticleDate>
              <Separator>/</Separator>
          </LatestArticle>
        ))}
        <LatestArticle to={`/writing`} data-a11y="false">
          <ViewAll>All posts 🤘 </ViewAll>
        </LatestArticle>
      </WriteContainer>
    </Section>
  );
};

export default LatestArticles;

const WriteContainer = styled.div`
  position: relative;
  padding: 96px 0 160px;
`;

const LatestArticle = styled(Link)`
  margin-top: 0;
  display: inline;
  position: relative;
  font-family: ${p => p.theme.fonts.title};
  font-size: 48px;
	color: ${p => p.theme.colors.secondary};
  margin-bottom: 8px;
  transition: color 0.33s var(--ease-out-quart);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  ${mediaqueries.tablet`
    font-size: 32px;
  `};

  ${mediaqueries.phablet`
    font-size: 30px;
    line-height: 40px;
  `};

  &:hover,
  &:hover sup {
    color: ${p => p.theme.colors.accent};
  }

  .span {

  }
`;

const ViewAll = styled.span`
  display: inline-block;
`;

const ArticleDate = styled.sup`
  vertical-align: super;
  font-family: ${p => p.theme.fonts.title};
  font-size: 12px;
  text-transform: uppercase;
  color: ${p => p.theme.colors.grey};
  margin-left: 4px;
  transition: color 0.33s var(--ease-out-quart);
`;

const Separator = styled.span`
  margin-left: 8px;
  margin-right: 8px;
  color: ${p => p.theme.colors.accent};
  font-size: 40px;
`;

// const ArticleTitle = styled.span`
//   font-family: ${p => p.theme.fonts.title};
//   font-size: 40px;
// 	color: ${p => p.theme.colors.secondary};
//   margin-bottom: 8px;
//   diplay: inline-block;

//   ${mediaqueries.tablet`
//     font-size: 32px;
//   `};

//   ${mediaqueries.phablet`
//     font-size: 28px;
//   `};

// `;

const SectionTitle = styled(Headings.h5)`
  // text-transform: uppercase;
  color: ${p => p.theme.colors.grey};
  margin-bottom: 8px;
`;
