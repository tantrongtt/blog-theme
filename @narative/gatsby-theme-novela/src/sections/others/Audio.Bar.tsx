import React from 'react';
import styled from '@emotion/styled';
import { graphql, useStaticQuery } from "gatsby";

import Image from '@components/Image';
import mediaqueries from '@styles/media';

const siteQuery = graphql`
{
  file(relativePath: {eq: "audio-recodrding-project.png"}) {
    id
    childImageSharp {
      fluid(maxWidth: 120, quality: 100, base64Width: 1) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`;

interface AudioProps {
    title: string;
    audioURL: string;
  }

const AudioBar: React.FC<AudioProps> = ({ title, audioURL }) => {

  const result = useStaticQuery(siteQuery);

  return (
    <AudioWrapper>
      <AudioThumbnail>
        <Image src={result.file.childImageSharp.fluid} />
      </AudioThumbnail>
      <AudioBarPlayer>
        <AudioTitle>{title}</AudioTitle>
        <audio controls src={audioURL}></audio>
      </AudioBarPlayer>
    </AudioWrapper>
    );
};

export default AudioBar;


const AudioWrapper = styled.div`
  display: grid;
  grid-gap: 24px;
  position: relative;
  grid-template-columns: 160px 1fr;
  margin: 40px auto 0 auto;
  align-items: center;
  box-shadow: ${p => p.theme.colors.neumorphismShadown};
  padding-right: 24px;
  max-width: 680px;

  ${mediaqueries.tablet`
    grid-template-columns: 120px 1fr;
  `}

`;

const AudioThumbnail = styled.div`

`;

const AudioBarPlayer  = styled.div`
  audio {
    width: 100%;
  }
`;

const AudioTitle = styled.p`
  margin-bottom: 8px;
  color: ${p => p.theme.colors.secondary};
`;