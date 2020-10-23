import React from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';

function importImages(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    pics.push(r.keys())
   // return images; */
    //console.log(images)
  }
  
const images = importImages(require.context('../../../public/images/artwork/', false, /\.(png|jpe?g|svg)$/));
  

class Component extends React.Component {
  state = { modalIsOpen: false }
  toggleModal = () => {
    this.setState(state => ({ modalIsOpen: !state.modalIsOpen }));
  }
  render() {
    const { modalIsOpen } = this.state;

    return (
      <ModalGateway>
        {modalIsOpen ? (
          <Modal onClose={this.toggleModal}>
            <Carousel views={images} />
          </Modal>
        ) : null}
      </ModalGateway>
    );
  }
}

