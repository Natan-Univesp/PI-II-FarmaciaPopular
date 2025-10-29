import { ModalAddLaboratorio } from "../components/Modals/Laboratorio/ModalAddLaboratorio/ModalAddLaboratorio";
import { ModalAddNewMedicamento } from "../components/Modals/Medicamentos/ModalAddNewMedicamento/ModalAddNewMedicamento";
import { ModalAddUser } from "../components/Modals/ModalAddUser/ModalAddUser";
import { ModalFilterLoteMedicamentos } from "../components/Modals/ModalFilter/ModalFilterLoteMedicamentos/ModalFilterLoteMedicamentos";

export const modalCollection = [
   {
      name: "registerNewUser",
      title: "Adicionar novo Usuário",
      modalContent: <ModalAddUser/>
   },
   {
      name: "filterLoteMedicamentos",
      title: "Filtragem de Lotes de Medicamentos",
      modalContent: <ModalFilterLoteMedicamentos/>
   },
   {
      name: "registerNewMedicamento",
      title: "Adicionar Novo Medicamento",
      modalContent: <ModalAddNewMedicamento/>
   },
   {
      name: "registerNewLaboratorio",
      title: "Adicionar Novo Laboratório",
      modalContent: <ModalAddLaboratorio/>
   }
]