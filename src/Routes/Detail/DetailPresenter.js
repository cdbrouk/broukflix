import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from 'Components/Loader';
import Helmet from 'react-helmet';
import { groupPatternsByBaseDirectory } from 'fast-glob/out/managers/tasks';

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
  margin-bottom: 10px;
`;

const ItemContainer = styled.div`
  display: flex;
  margin: 20px 0;
  flex-direction: row;
`;

const Item = styled.div``;

const Divider = styled.span`
  margin: 0 10px;
`;

const OverView = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const Production = styled.div`
  margin: 20px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductTitle = styled.p`
  font-size: 20px;
  margin-bottom: 10px;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProductItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  border: 1px solid white;
  margin-right: 5px;
`;

const PCImg = styled.img`
  width: 40px;
  height: 40px;
  background-color: white;
  padding: 2px;
  border-radius: 10px;
`;

const PCName = styled.span`
  font-size: 12px;
  opacity: 0.7;
  margin-left: 5px;
  margin-right: 5px;
`;

const SeasonImg = styled.img`
  width: 70px;
  height: 110px;
  margin-right: 5px;
`;

const Youtube = styled.p`
  font-size: 32px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{' '}
          | Broukflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require('../../assets/noPoster.png')
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            {(result.runtime || result.episode_run_time) && (
              <>
                <Divider>·</Divider>
                <Item>
                  {result.runtime ? result.runtime : result.episode_run_time[0]}
                  min
                </Item>
              </>
            )}
            <Divider>·</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `,
                )}
            </Item>
            {result.imdb_id && (
              <>
                <Divider>·</Divider>
                <Item>
                  <a
                    href={`https://www.imdb.com/title/${result.imdb_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://m.media-amazon.com/images/G/01/imdb/images/desktop-favicon-2165806970._CB484110913_.ico"
                      width="15px"
                      alt="imdb_ico"
                    />
                  </a>
                </Item>
              </>
            )}
          </ItemContainer>
          <OverView>{result.overview}</OverView>
          {result.production_companies && (
            <Production>
              <ProductTitle>Production Companies</ProductTitle>
              <ProductContainer>
                {result.production_companies.map(company => (
                  <ProductItem>
                    {company.logo_path && (
                      <PCImg
                        src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                      />
                    )}
                    <PCName>{company.name}</PCName>
                  </ProductItem>
                ))}
              </ProductContainer>
            </Production>
          )}
          {result.production_countries && (
            <Production>
              <ProductTitle>Production Countries</ProductTitle>
              <ProductContainer>
                {result.production_countries.map(country => (
                  <PCName>{country.name}</PCName>
                ))}
              </ProductContainer>
            </Production>
          )}
          {result.seasons && (
            <>
              <ProductTitle>Season</ProductTitle>
              <ProductContainer>
                {result.seasons.map(
                  season =>
                    season.poster_path && (
                      <SeasonImg
                        src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                      />
                    ),
                )}
              </ProductContainer>
            </>
          )}
          {result.videos.results && (
            <>
              <Youtube>Youtube</Youtube>
              <iframe
                title={result.id}
                id="ytplayer"
                type="text/html"
                width="480"
                height="270"
                src={`http://www.youtube.com/embed/${result.videos.results[0].key}`}
              />
            </>
          )}
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
