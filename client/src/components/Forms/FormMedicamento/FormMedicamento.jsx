import { useForm } from "react-hook-form";
import { InputDefault } from "../../Inputs/InputDefault/InputDefault";
import InputFile from "../../Inputs/InputFile/InputFile";
import SelectSearchable from "../../SelectSearchable/SelectSearchable";
import { TextArea } from "../../TextArea/TextArea";
import { getItemsDirtyData } from "../../../utils/ManipulateDataUtil";
import { getAllLaboratoriosForSelectService } from "../../../services/laboratorios.service";
import { useEffect, useState } from "react";
import styles from "./FormMedicamento.module.css";

export function FormMedicamento({ dataMedicamento, handleMedicamentoSubmit }) {
   const [labOptions, setLabOptions] = useState([]);
   const {
      control,
      register,
      handleSubmit,
      watch,
      formState: { errors, isDirty, dirtyFields },
   } = useForm({
      defaultValues: dataMedicamento || {
         img: "",
         id: null,
         fk_id_laboratorio: null,
         nome_medicamento: "",
         categoria: "",
         tipo_unidade: "CAIXAS",
         quantidade_minima: null,
         indicacao_uso: "",
      },
   });

   const registerImg = register("img", {
      required: !dataMedicamento ? "Campo Obrigatório!" : false
   });
   const registerId = register("id", {
      required: "Campo Obrigatório!",
      valueAsNumber: true,
      min: {
         value: 0,
         message: "Insira um valor maior ou igual a 0"
      }
   });
   const registerNomeMedicamento = register("nome_medicamento", {
      required: "Campo Obrigatório!"
   });
   const registerQtdMin = register("quantidade_minima", {
      required: "Campo Obrigatório",
      valueAsNumber: true,
      min: {
         value: 0,
         message: "Insira um valor maior ou igual a 0"
      }
   })
   const registerIndicacaoUso = register("indicacao_uso", {
      required: "Campo Obrigatório"
   })
   const watchImg = watch("img");

   const selectCategOptions = [
      {
         label: "POPULAR",
         value: "POPULAR",
      },
      {
         label: "CONVÊNIO",
         value: "CONVENIO",
      },
   ];

   const selectUnidadeOptions = [
      {
         label: "Caixas",
         value: "CAIXAS",
      },
      {
         label: "Outro",
         value: "OUTRO",
      },
   ];

   const validateAndSubmit = (data) => {
      if(dataMedicamento) {
         const fieldsModifiedOnly = getItemsDirtyData(dirtyFields, data);
         console.log(fieldsModifiedOnly);
      } else {
         console.log("Cadastrei as coisas abaixo:");
         handleMedicamentoSubmit(data);
      }
   }

   const defineOptionsLaboratorio = async () => {
      try {
         const res = await getAllLaboratoriosForSelectService();
         setLabOptions(res.data);

      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      defineOptionsLaboratorio();
   }, [])

   return (
      <form 
         action="" 
         className="layoutFormContentSpacing" 
         onSubmit={handleSubmit(validateAndSubmit)}
      >
         <InputFile 
            register={registerImg}
            watchImg={watchImg}
            error={errors?.img}
         />
         <div className="inputCollection__dual">
            <InputDefault
               type="number"
               id="idMedicamento"
               placeholder="ex: 1592"
               textView="Código*"
               register={registerId}
               error={errors?.id}
               customStyle={{
                  width: "35%"
               }}
            />
            <InputDefault
               type="text"
               id="nomeMedica"
               placeholder="ex: Cimegripe"
               textView="Nome*"
               register={registerNomeMedicamento}
               error={errors?.nome_medicamento}
            />
         </div>
         <SelectSearchable
            controlName="fk_id_laboratorio"
            control={control}
            dataOptions={labOptions}
            textView={"Laboratório*"}
            placeholder={"Selecione o Laboratório..."}
            error={errors?.fk_id_laboratorio}
         />
         <div className={`inputCollection__dual ${styles.responsiveInputCollection}`}>
            <SelectSearchable
               controlName="categoria"
               control={control}
               dataOptions={selectCategOptions}
               textView={"Categoria*"}
               placeholder={"Selecione a categoria..."}
               error={errors?.categoria}
            />
            <SelectSearchable
               controlName="tipo_unidade"
               control={control}
               dataOptions={selectUnidadeOptions}
               textView={"Tipo de Unidade*"}
               placeholder={"Selecione o tipo de unidade..."}
               error={errors?.tipo_unidade}
            />
         </div>
         <InputDefault
            type="number"
            id="qtdMinima"
            placeholder="Quantidade mínima esperada...."
            textView="Quantidade Mínima*"
            register={registerQtdMin}
            error={errors?.quantidade_minima}
         />
         <TextArea
            type="text"
            id="indicacao_uso"
            placeholder="Informe a indicação de uso..."
            textView="Indicação de Uso*"
            register={registerIndicacaoUso}
            error={errors?.indicacao_uso}
         />

         <button className={`buttonForm-style1 ${
            dataMedicamento && !isDirty ? "buttonForm-style1__inactive" : ""
         }`}>
            {dataMedicamento ? "Confirmar Alterações" : "Cadastrar Medicamento"}
         </button>
      </form>
   );
}
