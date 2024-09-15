import { Box, Container, Stack } from '@mui/material';
import React from "react";
import styled from "styled-components";
import { LearnMore } from "./HeroSubSections/LearnMore";
import { Navigation } from "./HeroSubSections/Navigation";
import { Cloud } from "./HeroSubSections/TagCloud/";
import { TitleTextsButton } from "./HeroSubSections/VideoSection";

const StyledHeroSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 100%;
  position: relative;

  & .play-button {
    align-items: flex-start;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.1) 100%);
    border: 1px solid;
    border-color: transparent;
    border-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.1)) 1;
    border-radius: 50px;
    display: inline-flex;
    right: 24px;
    padding: 24px;
    position: absolute;
    top: 686px;

    & .vector {
      height: 13.86px;
      position: relative;
      width: 12px;
    }
  }
`;

const FlexContainer = styled(Box)(({ theme }) => `
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 5rem;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
    gap: 24px;
  }
`);

export const HeroSection = () => {
  return (
    <StyledHeroSection>
    <Container maxWidth="lg">
        <Stack spacing={10}> {/* This adds a 5rem (40px) gap between child elements */}
          <Navigation />
          <TitleTextsButton />
          <FlexContainer>
            <Box flexBasis="60%" pr={2}>
              <LearnMore />
            </Box>
            <Box flexBasis="40%" pl={2}>
              <Cloud />
            </Box>
          </FlexContainer>
        </Stack>
      </Container>
    </StyledHeroSection>
  );
};