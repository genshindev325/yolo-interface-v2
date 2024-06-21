import React, { useEffect } from 'react'
import Layout from 'components/Layouts/general'
import styled from 'styled-components'
import { images } from 'common'
import { Typography } from 'components/Atoms/Typography'
import { articles } from 'datasource/press'

export const PressPage = () => {
  useEffect(() => {
    window.mediumWidget()

    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    document.getElementsByClassName('twitter-embed')[0].appendChild(script)
  }, [])
  return (
    <Layout>
      <script src='https://medium-widget.pixelpoint.io/widget.js'></script>
      <Main>
        <Container>
          <Heading>
            <Typography variant='headline' size='2.8' weight='900' spacing='-.01' height='110'>
              PRESS
            </Typography>
          </Heading>
          <Content>
            <Article>
              <Typography variant='caption' size='1.4' weight='700'>
                ARTICLES
              </Typography>
              <ArticleList>
                {articles.map((article, index) => (
                  <ul key={index}>
                    <li className='when'>{article.date}</li>
                    {article?.data?.map((item, index) => (
                      <React.Fragment key={index}>
                        <li>
                          <strong>
                            <LabelIcon src={item.iconUrl} />
                            {item.title}
                          </strong>
                          <a href={item.link} target='blank' data-nsfw-filter-status='swf'>
                            {item.description}
                          </a>
                        </li>
                      </React.Fragment>
                    ))}
                  </ul>
                ))}
              </ArticleList>
            </Article>
            <Medium>
              <Typography variant='title' size='1.4' weight='700'>
                MEDIUM
              </Typography>
              <MediumWidget id='medium-widget' />
            </Medium>
            <Twitter>
              <Typography variant='title' size='1.4' weight='700'>
                TWITTER
              </Typography>
              <div className='twitter-embed'>
                <a className='twitter-timeline' href='https://twitter.com/playyolorekt' data-nsfw-filter-status='swf' />
              </div>
            </Twitter>
          </Content>
        </Container>
      </Main>
    </Layout>
  )
}

const Main = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  height: 100%;
  min-height: 70vh;
  padding: 90px 0 0 0;
  z-index: 2;
  &::before {
    backdrop-filter: blur(20px);
    background: rgba(18, 52, 124, 0.63);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    z-index: -1;
    opacity: 1;
  }
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background: url(${images.HomePageBgImg});
    background-repeat: no-repeat;
    background-position: top center;
    background-size: auto 100%;
    opacity: 0.4;
    z-index: -2;
    @-moz-document url-prefix() {
      background: url(${images.HomePageBgImgBlur});
      background-repeat: no-repeat;
      background-position: center center;
      background-size: auto 250%;
    }
  }
  ${({ theme }) => theme.breakPoints['lg']} {
    height: 815px;
  }
  ${({ theme }) => theme.breakPoints['md']} {
    height: auto;
    padding-top: 100px;
    min-height: 650px;
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0;
  ${({ theme }) => theme.breakPoints['lg']} {
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 60px;
  }
`
const Heading = styled.div`
  width: 100%;
  padding: 30px 0 15px 40px;
  h1 {
    text-align: left;
  }
  ${({ theme }) => theme.breakPoints['lg']} {
    h1 {
      text-align: center;
    }
    padding-left: 0;
  }
  ${({ theme }) => theme.breakPoints['md']} {
    padding-top: 0;
  }
`
const Content = styled.div`
  display: flex;
  padding: 0 40px;
  width: 100vw;
  height: calc(100vh - 253px);
  overflow-y: auto;
  @media (max-width: 980px) {
    flex-direction: column;
  }
  ${({ theme }) => theme.breakPoints['lg']} {
    width: 100%;
    padding: 0;
  }
`
const Article = styled.div`
  padding: 20px 15px 0 0;
  text-align: left;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 0;
  width: 33.33%;
  height: 100%;
  min-width: 300px;
  h3 {
    padding: 0 0 15px 0;
    text-align: left;
    ${({ theme }) => theme.breakPoints['xs']} {
      text-align: center;
    }
  }
  @media (max-width: 980px) {
    max-width: 100%;
    width: 100%;
    height: auto;
    display: block;
  }
  ${({ theme }) => theme.breakPoints['md']} {
    width: 100%;
    min-width: auto;
    padding-left: 15px;
    padding-right: 15px;
    border-bottom: 1px dotted rgba(255, 255, 255, 0.3);
  }
`
const ArticleList = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-top-right-radius: 10px;
  height: calc(100% - 47px);
  width: 100%;
  padding: 30px;
  .when {
    font-weight: 600;
    font-size: 1.3rem;
    padding: 0 0 10px 0;
    list-style: none;
    margin-left: 0;
  }
  li {
    list-style: none;
    margin: 15px 0 15px 15px;
    padding: 0 0 15px 0;
    border-bottom: 1px dotted rgba(255, 255, 255, 0.2);
    &:first-child,
    &:last-child {
      border-bottom: 0;
    }
    strong {
      font-weight: 700;
      display: flex;
      font-size: 1.2rem;
      ${({ theme }) => theme.breakPoints['xs']} {
        text-align: center;
        justify-content: center;
        align-items: center;
      }
    }
    a {
      padding: 0 0 7px 40px;
      font-size: 1rem;
      display: inline-block;
      ${({ theme }) => theme.breakPoints['xs']} {
        padding: 0 0 7px 0;
        margin-top: 7px;
      }
    }
    ${({ theme }) => theme.breakPoints['xs']} {
      list-style: none;
      margin-left: 0;
      border-bottom: 0;
    }
  }

  @media (max-width: 980px) {
    background: transparent;
    padding-left: 0;
  }
  ${({ theme }) => theme.breakPoints['xs']} {
    text-align: center;
    padding: 0 0 30px 0;
  }
`
const LabelIcon = styled.div`
  background: url(${({ src }) => src}) center center/auto 26px no-repeat;
  width: 30px;
  height: 30px;
  margin: 0 10px 0 0;
`
const Medium = styled.div`
  width: 33.33%;
  min-width: 300px;
  margin: 0 0 0 0;
  padding: 20px 0 0 0;
  overflow: auto;
  height: 100%;
  h3 {
    text-align: left;
    padding: 0 0 15px 20px;
  }
  @media (max-width: 980px) {
    max-width: 100%;
    width: 100%;
    height: 50vh;
    min-height: 400px;
  }
  ${({ theme }) => theme.breakPoints['md']} {
    min-height: 450px;
  }
`
const MediumWidget = styled.div`
  .medium-widget-article__row {
    ${({ theme }) => theme.breakPoints['lg']} {
      padding: 0;
    }
  }
  a.medium-widget-article__title {
    color: ${({ theme }) => theme.themeColors.white};
    text-align: left;
  }
  .medium-widget-article__content {
    text-align: left;
  }
  .medium-widget-article__description {
    color: ${({ theme }) => theme.themeColors.white};
    text-align: left;
  }
  .medium-widget-article__clap {
    color: ${({ theme }) => theme.themeColors.white};
    text-align: left;
  }
  .medium-widget-article__info {
    justify-content: flex-start;
  }
  .medium-widget-article__info > div {
    height: auto;
    margin-top: 5px;
    text-align: left;
  }
  .medium-widget-article__date {
    color: ${({ theme }) => theme.themeColors.white};
    text-align: left;
  }
  .medium-widget-article__row .medium-widget-article__item {
    border-bottom: 1px dotted rgba(255, 255, 255, 0.3);
  }
  .medium-widget-article__row:last-child .medium-widget-article__item {
    border-bottom: 0;
  }
`
const Twitter = styled.div`
  width: 33.33%;
  min-width: 300px;
  margin: 0 0 0 0;
  padding: 20px 0 0 15px;
  overflow: auto;
  height: 100%;
  h3 {
    text-align: left;
    padding: 0 0 15px 20px;
  }
  @media (max-width: 980px) {
    padding: 50px 0 0 0;
    max-width: 100%;
    width: 100%;
    height: 50vh;
    min-height: 400px;
  }
  ${({ theme }) => theme.breakPoints['md']} {
    height: 450px;
  }
`
