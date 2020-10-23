// Contact.js

import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';

var pics = [];
var pics2 = [];

class Gallery extends Component {

  importImages(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    pics.push(r.keys())
   // return images; */
    //console.log(images)
  }

  ///console.log(pics2);
  saySomething(something) {
    console.log(something);
  }

  handleClick(e) {
      this.saySomething(this.props.album);
  }

  componentDidMount() {
      //this.saySomething("component did mount");
      //this.saySomething('ALBUM=>'+this.props.album);
      var album = this.props.album;
      var url = process.env.REACT_APP_BASE_URL;
      var imgDir = 'public/images/'+this.props.album+'/';
      console.log('ImgDir=>'+imgDir);
      // load the album images directory -- Does NOT WORK
      //this.importImages(require.context(imgDir, false, /\.(png|jpe?g|svg)$/));
      
      if (this.props.album === 'artwork') {
       this.importImages(require.context('/home/ajay/react_prod/public/images/artwork/', false, /\.(png|jpe?g|svg)$/));
      //const images2 = this.importImages(require.context(imgDir, false, /\.(png|jpe?g|svg)$/))
      } else if (this.props.album === 'general') {
         this.importImages(require.context('/home/ajay/react_prod/public/images/general/', false, /\.(png|jpe?g|svg)$/));
      } else if (this.props.album === 'garden') {
          this.importImages(require.context('/home/ajay/react_prod/public/images/garden/', false, /\.(png|jpe?g|svg)$/));
      } else if (this.props.album === 'anvika') {
         this.importImages(require.context('/home/ajay/react_prod/public/images/anvika/', false, /\.(png|jpe?g|svg)$/));
      } else { // random generated graphics...
        console.log('Display Graphics')
        this.importImages(require.context('/home/ajay/react_prod/public/images/graphics/', false, /\.(png|jpe?g|svg)$/));
      }

      for (var i=0; i<pics[0].length; i++) {
        pics2[i] = {
            original: url+'/images/'+album+'/'+pics[0][i].replace('./', ''),
            thumbnail: url+'/images/'+album+'/'+pics[0][i].replace('./', '')
        };
      }

  }
  render() {
    return (
      <div className="container">
        <div className="home-slider">
          <h4>{this.props.album}</h4>
          
          {/*  <ImageGallery items={images} />  */}
          {  <ImageGallery 
                items={pics2} 
                lazyLoad
                //showThumbnails={True}
              />  
          }
         </div>
    </div>
    );
  }
}

export default Gallery;
