import axios from 'axios';
//import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8003'; // Reemplaza con la URL de tu API de Go

//Register

export const postUser = async (name,LastName,DNI,Password,Email,Admin) => {
  try {
    const response = await axios.post(`${API_URL}/insertUser/${name}/${LastName}/${DNI}/${Password}/${Email}/0`);  
    return response;
    
  } catch (error) {
    if (error.response.status=400) {

      // El servidor respondió con un código de estado de error
      const errorMessage = error.response.data;
      // Manejar el mensaje de error, por ejemplo, mostrarlo en la interfaz de usuario
      console.error(errorMessage)
      return error.response
    } else {
      // Error de red o solicitud cancelada
      console.error('Error en la solicitud:', error.message)
    }

  }
    
  throw new Error('Error al agregar reserva');
}

