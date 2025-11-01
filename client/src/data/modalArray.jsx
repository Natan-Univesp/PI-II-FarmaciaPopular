import { ModalAddLaboratorio } from "../components/Modals/Laboratorio/ModalAddLaboratorio/ModalAddLaboratorio";
import { ModalEditLaboratorio } from "../components/Modals/Laboratorio/ModalEditLaboratorio/ModalEditLaboratorio";
import { ModalAddNewMedicamento } from "../components/Modals/Medicamentos/ModalAddNewMedicamento/ModalAddNewMedicamento";
import { ModalEditLoteMedicamentos } from "../components/Modals/Medicamentos/ModalEditLoteMedicamentos/ModalEditLoteMedicamentos";
import { ModalEditMedicamentos } from "../components/Modals/Medicamentos/ModalEditMedicamentos/ModalEditMedicamentos";
import { ModalLixeiraMedicamentos } from "../components/Modals/Medicamentos/ModalLixeiraMedicamentos/ModalLixeiraMedicamentos";
import { ModalViewMedicamento } from "../components/Modals/Medicamentos/ModalViewMedicamento/ModalViewMedicamento";
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
   },
   {
      name: "editLaboratorio",
      title: "Editar Laboratório",
      modalContent: <ModalEditLaboratorio/>
   },
   {
      name: "editMedicamento",
      title: "Editar Medicamento",
      modalContent: <ModalEditMedicamentos/>
   },
   {
      name: "lixeiraMedicamentos",
      title: "Lixeira de Medicamentos",
      modalContent: <ModalLixeiraMedicamentos/>
   },
   {
      name: "viewMedicamentos",
      title: "Detalhes do Medicamento",
      modalContent: <ModalViewMedicamento/>
   },
   {
      name: "editLoteMedicamento",
      title: "Editar Lote de Medicamento",
      modalContent: <ModalEditLoteMedicamentos/>
   }
]