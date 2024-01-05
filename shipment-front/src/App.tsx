import ShipmentForm from "./components/ShipmentForm";
import ShipmentsList from "./components/ShipmentList";
import { ShipmentProvider } from "./context/ShipmentContext";

function App() {
  return (
    <div className="h-screen bg-zinc-900 text-white flex justify-center items-center">
      <div className="bg-gray-950 p-6 w-8/20">
        <h1 className="text-3xl font-bold text-center block my-4">Servicio Sistema de Logística Básico con Cálculo de Tarifas</h1>
        <ShipmentProvider>
          <ShipmentForm/>
          <ShipmentsList/>
        </ShipmentProvider>
      </div>
    </div>
  );
}

export default App;