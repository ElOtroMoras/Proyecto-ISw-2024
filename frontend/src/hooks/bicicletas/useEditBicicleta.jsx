import { useState } from "react";
import { updateBicicletas } from "@services/bicicletas.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";
import { formatPostBicicletas } from "@helpers/formatBicicletas.js";

const useEditBicicleta = (setBicicletas) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataBicicleta, setDataBicicleta] = useState([]);

    const handleClickUpdate = () => {
        if (dataBicicleta.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedBicicletaData) => {
        if(updatedBicicletaData){
            try{
                const dataUpdate = { ...updatedBicicletaData };
                const updatedBicicleta = await updateBicicletas(dataUpdate, dataBicicleta[0].id);
                if(updatedBicicleta.error || updatedBicicleta.status === 'Client error'){
                    showErrorAlert(updatedBicicleta.message, updatedBicicleta.details);
                }else{
                    showSuccessAlert('¡Actualizado!', 'La bicicleta ha sido actualizada correctamente.');
                    setIsPopupOpen(false);
                    const formattedBicicleta = formatPostBicicletas(updatedBicicleta);
                    setBicicletas(prevBicicletas => prevBicicletas.map(bicicleta =>
                        bicicleta.id === formattedBicicleta.id ? formattedBicicleta : bicicleta
                    ));
                    setDataBicicleta([]);
                }
            }catch(error){
                console.error('Error al actualizar la bicicleta:', error);
                showErrorAlert('Cancelado','Ocurrió un error al actualizar la bicicleta.');
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataBicicleta,
        setDataBicicleta
    };
};

export default useEditBicicleta;