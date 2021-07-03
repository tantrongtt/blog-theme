import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from 'gatsby';

import Headings from '@components/Headings';
import Image, { ImagePlaceholder } from '@components/Image';

import mediaqueries from '@styles/media';
import { IArticle } from '@types';

import { GridLayoutContext } from '../articles/Articles.List.Context';

interface ArticlesListProps {
  articles: IArticle[];
  alwaysShowAllDetails?: boolean;
}

interface ArticlesListItemProps {
  article: IArticle;
  narrow?: boolean;
}

const PortfolioList: React.FC<ArticlesListProps> = ({
  articles,
  alwaysShowAllDetails,
}) => {
  if (!articles) return null;

  const hasOnlyOneArticle = articles.length === 1;
  const { gridLayout = 'tiles', hasSetGridLayout, getGridLayout } = useContext(
    GridLayoutContext,
  );

  /**
   * We're taking the flat array of articles [{}, {}, {}...]
   * and turning it into an array of pairs of articles [[{}, {}], [{}, {}], [{}, {}]...]
   * This makes it simpler to create the grid we want
   */
  const articlePairs = articles.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2));
    }
    return result;
  }, []);

  useEffect(() => getGridLayout(), []);

  return (
    <ArticlesListContainer
      style={{ opacity: hasSetGridLayout ? 1 : 0 }}
      alwaysShowAllDetails={alwaysShowAllDetails}
    >
      <List>
        {articles.map((ap, index) => {
          return (
            <ListItem key={index} article={ap} />
          );
        })}
      </List>
    </ArticlesListContainer>
  );
};

export default PortfolioList;

const ListItem: React.FC<ArticlesListItemProps> = ({ article, narrow }) => {
  if (!article) return null;

  const { gridLayout } = useContext(GridLayoutContext);
  const hasOverflow = narrow && article.title.length > 35;
  const imageSource = article.hero.full;
  const hasHeroImage =
    imageSource &&
    Object.keys(imageSource).length !== 0 &&
    imageSource.constructor === Object;

  return (
    <ArticleLink to={article.slug} data-a11y="false">
      <Item>
        <ImageContainer>
          {hasHeroImage ? <Image src={imageSource} alt={article.title} imgStyle={{ objectFit: 'cover', objectPosition: 'right bottom' }} /> : <ImagePlaceholder />}
        </ImageContainer>
        <TextContainer dark={article.dark} backgroundColor={article.backgroundColor}>
          { article.eyebrowHeadline && 
            <EyebrowHeading dark hasOverflow={hasOverflow} gridLayout={gridLayout}>
              {article.eyebrowHeadline}
            </EyebrowHeading>
          }
          <Title dark hasOverflow={hasOverflow} gridLayout={gridLayout}>
            {article.title}
          </Title>
          <Excerpt
            narrow={narrow}
            hasOverflow={hasOverflow}
            gridLayout={gridLayout}
          >
            {article.excerpt}
          </Excerpt>
          <SeeMore>Read case study →</SeeMore>
        </TextContainer>
        <ContentContainer>
        </ContentContainer>
      </Item>
    </ArticleLink>
  );
};

const limitToTwoLines = css`
  text-overflow: ellipsis;
  overflow-wrap: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  overflow: hidden;

  ${mediaqueries.phablet`
    -webkit-line-clamp: 3;
  `}
`;

const showDetails = css`
  p {
    display: -webkit-box;
  }

  h2 {
    margin-bottom: 10px;
  }
`;

const ArticlesListContainer = styled.div<{ alwaysShowAllDetails?: boolean }>`
  transition: opacity 0.25s;
  ${p => p.alwaysShowAllDetails && showDetails}
`;

const List = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 2;
  column-gap: 30px;

  &:not(:last-child) {
    margin-bottom: 75px;
  }

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
    
    &:not(:last-child) {
      margin-bottom: 0;
    }
  `}
`;

const Item = styled.div`
  position: relative;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 480px;
  transition: transform 0.3s var(--ease-out-quad),
    box-shadow 0.3s var(--ease-out-quad);

  & > div {
    height: 100%;
  }

  ${mediaqueries.desktop`
    height: 400px;
  `}

  ${mediaqueries.tablet`
    height: 280px;
  `}

  ${mediaqueries.phablet`
    margin-bottom: 0;
    box-shadow: none;
  `}
`;

const TextContainer = styled.div<{
  dark: boolean;
  backgroundColor: string;
}>`
  position: absolute;
  left: 0;
  top: 0;
  padding: 64px 40px;
  max-width: 480px;
  color: ${p => (!p.dark ? p.theme.colors.textTitle : p.theme.colors.card)};

  ${mediaqueries.desktop`
    max-width: 320px;
  `}

  ${mediaqueries.tablet`
    padding: 24px 24px;
  `}

  ${p => mediaqueries.phablet`
    position: relative;
    padding: 16px 24px 8px 24px;
    max-width: 100%;
    background-color: ${p.backgroundColor ? p.backgroundColor : p.theme.colors.card};
  `}
`;

const ContentContainer = styled.div`
  position: relative;
`;

const Title = styled(Headings.h2)`
  font-size: 28px;
  font-family: ${p => p.theme.fonts.title};
  color: inherit;
  opacity: .8;
  margin-bottom: ${p =>
    p.hasOverflow && p.gridLayout === 'tiles' ? '35px' : '8px'};
  transition: color 0.3s ease-in-out;
  ${limitToTwoLines};

  ${mediaqueries.desktop`
    margin-bottom: 15px;
  `}

  ${mediaqueries.tablet`
    font-size: 24px;  
  `}

  ${mediaqueries.phablet`
    font-size: 22px;  
    margin-bottom: 10px;
    -webkit-line-clamp: 3;
  `}
`;

const EyebrowHeading = styled(Headings.h5)`
  font-family: ${p => p.theme.fonts.title};
  color: inherit;
  opacity: .7;
  margin-bottom: 8px;

  ${mediaqueries.phablet`
    margin-bottom: 0;
  `}
`;

const Excerpt = styled.p<{
  hasOverflow: boolean;
  narrow: boolean;
  gridLayout: string;
}>`
  ${limitToTwoLines};
  font-size: 16px;
  margin-bottom: 10px;
  color: inherit;
  opacity: .7;
  font-family: ${p => p.theme.fonts.body};
  display: ${p => (p.hasOverflow && p.gridLayout === 'tiles' ? 'none' : 'box')};
  line-height: 22px;

  ${mediaqueries.desktop`
    display: -webkit-box;
  `}

  ${mediaqueries.tablet`
    margin-bottom; 15px;
    display: none;
  `}

`;

const SeeMore = styled.div`
  font-size: 14px;
  color: inherit;
  font-family: ${p => p.theme.fonts.title};
  margin-top: 8px;
  opacity: .8;

  ${mediaqueries.tablet`
    display: none;
  `}

`;

const MetaData = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: ${p => p.theme.colors.grey};
  opacity: 0.33;

  ${mediaqueries.phablet`
    max-width: 100%;
    padding:  0 20px 30px;
  `}
`;

const ArticleLink = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  top: 0;
  left: 0;
  margin-bottom: 30px;
  z-index: 1;
  transition: transform 0.33s var(--ease-out-quart);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  &::after, &::before {
    background: none repeat scroll 0 0 transparent;
    content: "";
    display: block;
    height: 4px;
    left: 50%;
    position: absolute;
    background: ${p => p.theme.colors.accent};
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
    z-index: 1;
  }

  ::after {
    top: -1px;
  }

  &:hover {
    &::after {
      width: 100%; 
      left: 0; 
    }
  }


  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -1.5%;
    top: -2%;
    width: 103%;
    height: 104%;
    border: 3px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.phablet`
    margin-bottom: 30px;

    &:hover ${ImageContainer} {
      transform: none;
      box-shadow: initial;
    }

    &:active {
      transform: scale(0.97) translateY(3px);
    }
  `}
`;
