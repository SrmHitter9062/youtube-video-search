// React -> manage components
// ReactDOM -> render component
import React, {Component} from 'react'; // 'react' is literally the node_module name
import ReactDOM from 'react-dom';
import _ from 'lodash';
// import YTSearch from 'youtube-api-search';
import YTSearch from './api/YTapi';
import apiConfig from './api/apiConfig';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null,
      loader:false,
      apiInit:false
    };
  }
  componentDidMount(){}

  videoSearch(term) {
    this.setState({
      loader:true,
      videos:[],
      selectedVideo:null
    });
    let apiOptions = {
      key: apiConfig.YTApi.apiKey,
      term: term,
      maxResult:apiConfig.YTApi.maxCount
    }
    if(this.state.apiInit == false){
      this.setState({apiInit:true});
    }
    YTSearch(apiOptions, (videos) => {
      this.setState({videos: videos,
                     selectedVideo: videos[0],
                     loader:false});

    });
  }
  /**
   * sets the selected video state in store object
   */
  onSelectVideo = (selectedVideo) => {
    this.setState({selectedVideo});
    const scrollToTop = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
      }
    };
    scrollToTop();
    
  }
  render() {
    // Make a new function that can only be called once every 300 miliseconds
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    return (
      
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>

        <div>

          {this.state.loader ? (
              <div className="offset-md-5 col-md-2 loading-msg">
                    Loading...
              </div>) : (
              <div>
                    {this.state.videos.length > 0 ? (
                      <div>
                        <VideoDetail video={this.state.selectedVideo} />
                        <VideoList
                          onVideoSelect={this.onSelectVideo}
                          videos={this.state.videos} />
                      </div>
                    ) : (
                      <div>
                        {this.state.apiInit ? (
                          <div className="offset-md-5 col-md-2 no-result-msg">
                              OOPS! No Results Found
                          </div>)
                     : null}
                    
                      </div>
                    )}
              </div>   
                  
              )}
        </div>
    
    </div>
    );
  }
}

// Create a new component. This component should produce
// some HTML
// This is a factory that produceses instances (functional component, no state)
// const App = () => { // now we have fat arrows, the only difference of
  // function() {} to this new method, is the parameter "this"

  // JS that produces HTML
  //return (
  //  <div>
  //    <SearchBar />
  //  </div>
  //); // This look alike HTML inside JS is JSX (webpack and babel comes to play)

  // This gets transpiled to vanilla JS (ES5)
  // App = function App() {
  //  return React.createElement("div", null, "Hi!"); --> it creates the instance
  // }
//}

// Take this component's generated HTML and put it
// on the page (in the DOM)
// React.createElement(_temporalAssertDefined(App, ""....)
// We are making an instance of an App (self closing tag) and selecting a target
// DOM node (container - check index.html)
ReactDOM.render(<App />, document.querySelector('.container-fluid'));
