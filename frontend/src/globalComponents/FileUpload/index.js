import React, { useState } from 'react';
import api from '../../config/api';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [success,setSuccess] = useState(false);
  const [data,setData] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        alert('Por favor, selecione um arquivo CSV.');
        return;
      }
  
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await api.post('validate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setSuccess(true);
      setData(response.data);
  
      alert('Arquivo enviado com sucesso!');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        let errorMessage = 'Erro ao enviar o arquivo:\n';
  
        if (typeof error.response.data === 'string') {
          errorMessage += error.response.data;
        } else if (typeof error.response.data === 'object') {
          errorMessage += JSON.stringify(error.response.data.errors, null, 2);
        } else {
          errorMessage += 'Erro desconhecido';
        }
  
        alert(errorMessage);
      } else {
        alert('Ocorreu um erro ao enviar o arquivo.');
      }
    }
  };


  const updateFieldsInDatabase = async () => {
    try {
      const response = await api.post('/update-products', data);
      alert('Campos atualizados com sucesso!');
      window.location.reload();
    } catch (error) {
      alert('Erro ao atualizar os campos.');
      console.error(error);
    }
  };
  
  
  return (
    <div>
      <h2>Envio de Arquivo CSV</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Verificar</button>
      {success ? <button onClick={updateFieldsInDatabase}>Atualizar</button> : null}

      {success ? <div>
        <h3>Informações sobre os produtos que serão atualizados:</h3>
        {data.map((e) => {
          return (
            <>
              <p>Codigo: {e.code}</p>
              <p>Nome: {e.name}</p>
              <p>Preço de Custo: {e.cost_price}</p>
              <p>Preço de venda antigo: {e.sales_price}</p>
              <p>Preço de venda novo: {e.new_price}</p>
            </>
          )
        })}
      </div> : null}
    </div>
  );
}

export default FileUpload;
