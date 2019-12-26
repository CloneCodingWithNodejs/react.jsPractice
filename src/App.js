import React from 'react';
import axios from 'axios';
import propTypes from "prop-types";
import Movie from './Movie';

// 이제까지 만든건 fuction 컴포넌트인데 이제부터 class Component를 만들거임 이걸 왜 쓰는거임? 동적데이터 처리를 위한
// state 때문임, state는 동적 데이터 바인딩을 위한 객체임 state는 직접변경하면 안되고 setState로 조작해줘야됨 왜?
// 안그러면  변형된 새 state랑 함께 render()가 실행되지않거든
class App extends React.Component {

    state = {
        //처음에는 로딩중이니까 무조건 true임
        isLoading: true,
        movies: []
    };

    getMovives = async () => {
        const { 
          data : {
            data : {movies}
          }
        } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
      

        //movies 를 axios부터 먼저 얻어오고 isLoading이 false 로 바뀐다 
        this.setState({movies, isLoading : false });

    }

    //rendering 된 후에 실행됨
    componentDidMount() {
        this.getMovives();
    }

    render() {

        const {isLoading, movies} = this.state;

        return (
            <section className="container">
                { isLoading ? (<div className="loader">
                    <span className="loader__text">Loading...</span>
                </div>) : (

                <div className="movies">
                { movies.map(movie => (
                
                  <Movie 
                  key={movie.id}
                  id={movie.id} 
                  year={movie.year} 
                  title={movie.title}
                  summary={movie.summary} 
                  poster={movie.medium_cover_image}
                  trailer={movie.yt_trailer_code} 
                  genres ={movie.genres}
                  />
                  

                ))} 

                </div>
                )}
            </section> 
                
        );
    }

}

export default App;
