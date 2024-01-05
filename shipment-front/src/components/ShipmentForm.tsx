import { ChangeEvent, FormEvent, useState } from "react";
import { useShipments } from "../context/useShipments";
import jsonData from "../data/cities.json";

function ShipmentForm() {
  const [shipment, setShipment] = useState({
    title: "",
    description: "",
    done: false,
  });
  const { createShipment } = useShipments();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setShipment({ ...shipment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createShipment(shipment);
  };

  const cities = jsonData.cities;  
  const dataCalculate = { lon1: 0, lat1: 0, lon2: 0, lat2: 0 }
  const data = { distance: 0, tarifa: 0 }

  const numberChangeHandler1 = (event: { target: { value: any; }; }) => {
    const id = event.target.value;
    buscarCity(id, 1);
    calculateDistancia();
  };

  const numberChangeHandler2 = (event: { target: { value: any; }; }) => {
    const id = event.target.value;
    buscarCity(id, 2);
    calculateDistancia();
  };

  function buscarCity(idNumber: string, opcion: number) {
    var index = cities.find(obj => obj.id==idNumber);  
    if (index != undefined) {
      if (opcion == 1) {
        console.log("Validate");
        dataCalculate.lat1 = index.latitud;
        dataCalculate.lon1 = index.longitud;
      } else {
        dataCalculate.lat2 = index.latitud;
        dataCalculate.lon2 = index.longitud;
      }
    }
    return index;
  }

  function calculateDistancia() {
    const RADIO_TIERRA_EN_KILOMETROS = 6371;
    let diferenciaEntreLongitudes = (dataCalculate.lon2 - dataCalculate.lon1);
    let diferenciaEntreLatitudes = (dataCalculate.lat2 - dataCalculate.lat1);
    let a = Math.pow(Math.sin(diferenciaEntreLatitudes / 2.0), 2) + Math.cos(dataCalculate.lat1) * Math.cos(dataCalculate.lat2) * Math.pow(Math.sin(diferenciaEntreLongitudes / 2.0), 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    data.distance = RADIO_TIERRA_EN_KILOMETROS * c;
  } 

  return (
    
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-4 gap-6">
      <span>Ingrese el Destinatario</span>
      <input
        name="destinatario"
        type="text"
        placeholder="DESTINATARIO"
        onChange={handleChange}
        className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
      />
      <span>Ingrese el Remitente</span>
      <input
        name="remitente"
        type="text"
        placeholder="REMITENTE"
        onChange={handleChange}
        className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
      />
      <span>Ingrese el Contenido</span>
      <textarea
        name="contenido"
        rows={3}
        onChange={handleChange}
        className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
        placeholder="Write a description"
      ></textarea>
      <span>Ingrese Fecha de Envio</span>
      <input
        name="fechaEnvio"
        type="text"
        placeholder="Write a task"
        onChange={handleChange}
        className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
      />
      <span>Seleccione la ciudad de Origen</span>
      <select 
          name="selectedOrigen"
          className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
          defaultValue={["1"]} 
          onChange={numberChangeHandler1}
          
          >
        {cities.map(c => (<option key={c.id} value={c.id}>{c.display}</option>))}
      </select>

      <span>Seleccione la ciudad de Destino</span>
      <select 
          name="selectedDestino"
          className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
          defaultValue={["1"]}
          onChange={numberChangeHandler2}
          >
        {cities.map(c => (<option key={c.id} value={c.id}>{c.display}</option>))}
      </select>
      <span>Distancia</span>
      <input
        name="distance"
        type="text"
        value={data.distance}
        disabled={true} 
        className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
        
      />
      <span>Tarifa</span>
      <input
        name="taifa"
        type="text"
        value={data.tarifa}
        disabled={true} 
        className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
      />

      <label className="inline-flex items-center gap-x-2">
        <input
          type="checkbox"
          value={shipment.done ? 1 : 0}
          onChange={() =>
            setShipment({
              ...shipment,
              done: !shipment.done,
            })
          }
          className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out "
        />
        <span>Enviado</span>
      </label>

      <button type="submit" className="bg-indigo-500 px-3 block py-2 w-full">
        Guardar
      </button>
      </div>
    </form>
  );
}

export default ShipmentForm;