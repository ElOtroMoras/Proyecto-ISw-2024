// Imports
import Form from './Form.jsx';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import QuestionIcon from '@assets/QuestionCircleIcon.svg';

// Popup para la creación de inventarios
export default function CreateInventario({ show, setShow, action }) {
    const handleSubmit = (formData) => {
        action(formData);
    };

    // Patrones para validación de campos
    const serialPattern = /^[a-zA-Z0-9]+$/
    const alphanumericPattern = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/
    const alphaPattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/

    return (
        <div>
            {show && (
                <div className="bg">
                    <div className='popup'>
                        <button className='close' onClick={() => setShow(false)}>
                            <img src={CloseIcon} />
                        </button>
                        <Form
                            title="Crear inventario"
                            fields={[
                                {
                                    label: "Número de serie",
                                    name: "numeroSerie",
                                    defaultValue: "",
                                    placeholder: '1234ABCabc',
                                    fieldType: 'input',
                                    type: "text",
                                    required: true,
                                    minLength: 5,
                                    maxLength: 50,
                                    pattern: serialPattern,
                                    patternMessage: "Debe contener sólo letras y números, sin caracteres especiales",
                                },
                                {
                                    label: "Nombre del stock",
                                    name: "nombreStock",
                                    defaultValue: "",
                                    placeholder: 'Producto',
                                    fieldType: 'input',
                                    type: 'text',
                                    required: true,
                                    minLength: 5,
                                    maxLength: 255,
                                    pattern: alphanumericPattern,
                                    patternMessage: "Debe contener sólo letras y números",
                                },
                                {
                                    label: "Cantidad en stock",
                                    name: "cantidadStock",
                                    defaultValue: "",
                                    placeholder: '10',
                                    fieldType: 'input',
                                    type: 'text',
                                    required: true
                                },
                                {
                                    label: "Descripción de la unidad",
                                    name: "descripcionUnidad",
                                    defaultValue: "",
                                    placeholder: 'Producto de calidad',
                                    fieldType: 'input',
                                    type: 'text',
                                    required: true,
                                    minLength: 3,
                                    maxLength: 100,
                                    pattern: alphaPattern,
                                    patternMessage: "Debe contener sólo letras",
                                },
                                {
                                    label: (
                                        <span>
                                            Precio por unidad
                                            <span className='tooltip-icon'>
                                                <img src={QuestionIcon} />
                                                <span className='tooltip-text'>En caso de ingresar un 0, se considerará que el producto no está en venta.</span>
                                                </span>
                                        </span>
                                    ),
                                    name: "precioUnidad",
                                    defaultValue: "",
                                    placeholder: '10000',
                                    fieldType: 'input',
                                    type: 'text',
                                    required: true
                                },
                                {
                                    label: "Marca del producto",
                                    name: "marcaUnidad",
                                    defaultValue: "",
                                    placeholder: 'Marca',
                                    fieldType: 'input',
                                    type: 'text',
                                    required: true,
                                    minLength: 3,
                                    maxLength: 50,
                                    pattern: alphanumericPattern,
                                    patternMessage: "Debe contener sólo letras y números",
                                },
                                {
                                    label: "Proveedor",
                                    name: "nombre_proveedor",
                                    defaultValue: "",
                                    placeholder: 'Aceites S.A.',
                                    fieldType: 'input',
                                    type: 'text',
                                    required: true,
                                    minLength: 3,
                                    maxLength: 50,
                                    pattern: alphanumericPattern,
                                    patternMessage: "Debe contener sólo letras y números",
                                },
                                {
                                    label: "Restock sugerido",
                                    name: "restockSugerido",
                                    placeholder: '10',
                                    fieldType: 'input',
                                    type: 'text',
                                    required: true
                                },
                                {
                                    label: "Umbral mínimo",
                                    name: "umbralMinimo",
                                    placeholder: '5',
                                    fieldType: 'input',
                                    type: 'text',
                                    required: true
                                },
                                // {
                                //     label: "¿Son materiales?",
                                //     name: "boolMateriales",
                                //     fieldType: 'select',
                                //     options: [
                                //         { value: true, label: "Sí" },
                                //         { value: false, label: "No" },
                                //     ],
                                //     required: true
                                // }
                            ]}
                            onSubmit={handleSubmit}
                            buttonText={"Crear inventario"}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}