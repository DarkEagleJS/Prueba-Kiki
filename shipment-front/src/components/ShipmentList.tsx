import ShipmentItem from "./ShipmentItem";
import { useShipments } from "../context/useShipments";

function ShipmentsList() {
  const { shipments } = useShipments();

  if (!shipments.length)
    return <p className="text-center text-xl font-bold my-4">No shipments Yet</p>;

  return (
    <div>
      {shipments.map((shipment) => (
        <ShipmentItem shipment ={shipment} key={shipment._id} />
      ))}
    </div>
  );
}

export default ShipmentsList;