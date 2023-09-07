// import moment from 'moment';
import { useEffect, useState } from 'react';
import api from '../../config/api';
import NavBar from '../../globalComponents/NavBar/Navbar';
import './style.css';
import Modal from 'react-modal';

import { BsX } from 'react-icons/bs';
import FileUpload from '../../globalComponents/FileUpload';

const Products = () => {
  const [produtos, setProdutos] = useState([]);

  const [modalUpdateIsOpen, setmodalUpdateIsOpen] = useState(false);
  // const [selectedProduct, setSelectedProduct] = useState({});

  // const [value, setValue] = useState('');
  // const [date, setDate] = useState('');
  useEffect(() => {
    fetchProdutos();
  },[]);

  function openModal(item) {
    // setSelectedProduct(item);
    setmodalUpdateIsOpen(true);
  }

  function closeModal() {
    setmodalUpdateIsOpen(false);
  }

  const fetchProdutos = async () => {
    const { data } = await api.get('/products');
    setProdutos(data);
  };

  return (
    <>
      <NavBar activeItem={'produtos'}></NavBar>

      <div className="products">
        <button onClick={() => openModal()} className="update-button">
          Atualizar
        </button>
        <h2>Produtos</h2>
      </div>

      <div className="itens">
        {produtos.map((item) => {
          return (
            <div className="card">
              <div className="card-container">
                <h3 className="card-title">Informações sobre o Produto</h3>
                <p className="card-text">Codigo: {item.code}</p>
                <p className="card-text">Nome: {item.name}</p>
                <p className="card-text">Preço de custo: {item.cost_price}</p>
                <p className="card-text">Preço de venda: {item.sales_price}</p>
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={modalUpdateIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <div className="close-button-container">
          <button onClick={closeModal} className="close-button">
            <BsX size="20" />
          </button>
        </div>
        <div>
          <FileUpload />
        </div>
        
      </Modal>
    </>
  );
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default Products;
