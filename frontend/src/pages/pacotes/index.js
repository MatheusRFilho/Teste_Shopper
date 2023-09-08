
import { useEffect, useState } from 'react';
import api from '../../config/api';
import NavBar from '../../globalComponents/NavBar/Navbar';
import './style.css';
import Modal from 'react-modal';

import { BsX } from 'react-icons/bs';

const Pacotes = () => {
  const [pacotes, setPacotes] = useState([]);

  const [modalPacksIsOpen, setmodalPacksIsOpen] = useState(false);
  const [selectedPacks, setSelectedPacks] = useState({});
  const [pack, setPack] = useState({});

  useEffect(() => {
    fetchPacotes();
  },[]);

  function openModal(item) {
    setPack(item);
    fetchPacotesById(item.pack_id);
    setmodalPacksIsOpen(true);
  }

  function closeModal() {
    setmodalPacksIsOpen(false);
  }

  const fetchPacotes = async () => {
    const { data } = await api.get('/packs');
    setPacotes(data);
  };


  const fetchPacotesById = async (id) => {
    const { data } = await api.get(`/packs/${id}`);
    setSelectedPacks(data);
  };

  return (
    <>
      <NavBar activeItem={'pacotes'}></NavBar>

      <div className="packs">
        <h2>Pacotes</h2>
      </div>

      <div className="itens">
        {pacotes.map((item) => {
          return (
            <div className="card">
              <div className="card-container">
                <h3 className="card-title">Informações sobre o Pacote</h3>
                <p className="card-text">Codigo: {item.pack_id}</p>
              </div>

              <div style={{display: 'flex', justifyContent: 'center'}}>
              <button onClick={() => openModal(item)} className='more-information' style={{marginTop: '20px'}}>
                Mais Informações
              </button>
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={modalPacksIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <div className="close-button-container">
          <button onClick={closeModal} className="close-button">
            <BsX size="20" />
          </button>
        </div>
        <div className="card-product">
              <div className="card-container">
                <h3 className="card-title">Informação sobre o Pacote</h3>
                <p className="card-text">Codigo: {pack.pack_id}</p>
                <p className="card-text">Quantidade total de itens: {pack.total_qty}</p>
                <p className="card-text">Valor total: {selectedPacks.total}</p>
              </div>
              <br />
              <hr />

              <div className="card-container">
              <h3 className="card-title">Informação sobre os Produtos</h3>
              {
                selectedPacks.products?.map((item) => {
                  return (
                    <>
                      <p className="card-text">Codigo: {item.code}</p>
                      <p className="card-text">Nome: {item.name}</p>
                      <p className="card-text">Quantidade: {item.qty}</p>
                      <p className="card-text">Preço de Custo: {item.cost_price}</p>
                      <p className="card-text">Preço de venda: {item.sales_price}</p>
                    </>
                  )
                })
              }
              
                
              </div>
              
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

export default Pacotes;
