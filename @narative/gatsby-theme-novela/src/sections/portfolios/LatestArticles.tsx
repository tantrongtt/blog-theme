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
    <Section>
      <WriteContainer>
        {articlesThatArentSecret.map((item, index) => (
          <LatestArticle to={item.node.slug} data-a11y="false" key={index}>
            <ArticleTitle>
              {item.node.title}
              <ArticleDate>{item.node.date}</ArticleDate>
              <Separator>/</Separator>
            </ArticleTitle>
          </LatestArticle>
        ))}
      </WriteContainer>
    </Section>
  );
};

export default LatestArticles;

const WriteContainer = styled.div`
  position: relative;
`;

const LatestArticle = styled(Link)`
  margin-top: 0;
  display: inline-block;
`;

const ArticleDate = styled.sup`
  vertical-align: super;
  font-family: ${p => p.theme.fonts.title};
  font-size: 12px;
  text-transform: uppercase;
  color: ${p => p.theme.colors.grey};
  margin-left: 4px;
`;

const Separator = styled.span`
  margin-left: 8px;
  margin-right: 8px;
  color: ${p => p.theme.colors.accent};
  font-size: 40px;

`;


const ArticleTitle = styled(Headings.h3)`
  font-size: 40px;
	color: ${p => p.theme.colors.secondary};
  margin-bottom: 8px;
  diplay: inline-block;
`;
