import { useShipments } from "../context/useShipments";
import { Shipment } from "../interface/shipment.interface";
import { IoCheckmarkDone, IoTrash } from "react-icons/io5";

interface Props {
  shipment: Shipment;
}

function ShipmentItem({ shipment }: Props) {
  const { deleteShipment, updateShipment } = useShipments();

  return (
    <div className="bg-gray-900 p-2 my-2 flex justify-between hover:bg-gray-800 hover:cursor-pointer">
      <div>
        <h3 className="font-bold">{shipment.title}</h3>
        <p className="text-slate-400">{shipment.description}</p>
      </div>
      <div className="flex gap-x-2">
        <button
          onClick={() => {
            if (!window.confirm("Are you sure you want to delete it?")) return;
            deleteShipment(shipment._id);
          }}
        >
          <IoTrash className="hover:text-red-500" />
        </button>
        <button onClick={() => updateShipment(shipment._id, { done: !shipment.done })}>
          {shipment.done ? (
            <IoCheckmarkDone className="hover:text-green-500" />
          ) : (
            <IoCheckmarkDone className="text-gray-500" />
          )}
        </button>
      </div>
    </div>
  );
}

export default ShipmentItem;