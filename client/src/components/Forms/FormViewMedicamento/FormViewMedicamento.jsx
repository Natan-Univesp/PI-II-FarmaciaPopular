import { useForm } from "react-hook-form";
import { TextArea } from "../../TextArea/TextArea";
import { InputDefault } from "../../Inputs/InputDefault/InputDefault";

export function FormViewMedicamento({ dataMedicamento }) {
   const { 
      register, 
      formState: { errors } 
   } = useForm({
      defaultValues: dataMedicamento || {
         id: null,
         nome_laboratorio: "",
         nome: "",
         categoria: "",
         tipo_unidade: "CAIXAS",
         quantidade_minima: null,
         quantidade_total: null,
         indicacao_uso: "",
      },
   });

   return (
      <form action="" className="layoutFormContentSpacing">
         <div className="inputCollection__dual">
            <InputDefault
               type="number"
               id="idMedicamento"
               placeholder="ex: 1592"
               disabled={true}
               textView="Código"
               register={{...register("id")}}
               error={errors?.id}
               customStyle={{
                  width: "35%",
               }}
            />
            <InputDefault
               type="text"
               id="nomeMedica"
               placeholder="ex: Cimegripe"
               disabled={true}
               textView="Nome do Medicamento"
               register={{...register("nome")}}
               error={errors?.nome}
            />
         </div>
         <InputDefault
            type="text"
            id="nomeLab"
            placeholder="ex: Lab1"
            disabled={true}
            textView="Laboratório*"
            register={{...register("nome_laboratorio")}}
            error={errors?.nome_laboratorio}
         />
         <div className="inputCollection__dual">
            <InputDefault
               type="text"
               id="categoria"
               placeholder="ex: CONVENIO"
               disabled={true}
               textView="Categoria"
               register={{...register("categoria")}}
               error={errors?.categoria}
            />
            <InputDefault
               type="text"
               id="tipoUnidade"
               placeholder="ex: CAIXAS"
               disabled={true}
               textView="Tipo de Unidade"
               register={{...register("tipo_unidade")}}
               error={errors?.tipo_unidade}
            />
         </div>
         <div className="inputCollection__dual">
            <InputDefault
               type="text"
               id="qtdMin"
               placeholder="ex: 10"
               disabled={true}
               textView="Quantidade Mínima"
               register={{...register("quantidade_minima")}}
               error={errors?.quantidade_minima}
            />
            <InputDefault
               type="text"
               id="qtdTotal"
               placeholder="ex: 120"
               disabled={true}
               textView="Quantidade Disponível"
               register={{...register("quantidade_total")}}
               error={errors?.quantidade_total}
            />
         </div>
         <TextArea
            type="text"
            id="indicacao_uso"
            placeholder="Informe a indicação de uso..."
            disabled={true}
            textView="Indicação de Uso"
            register={{...register("indicacao_uso")}}
            error={errors?.indicacao_uso}
         />
      </form>
   );
}
