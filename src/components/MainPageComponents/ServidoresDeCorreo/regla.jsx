//styles
import {
  Input,
  ReglaContainer,
  ReglasInputField,
  CheckInput,
  PartialOptionsContainer,
  OptionsContainer,
  OptionButton,
} from "./ServidoresDeCorreoElements";

//widgets
import { CustomSelect } from "../../widgets/ReactSelect";

//reducer
import { useSelector, useDispatch } from "react-redux";
import {
  email,
  getNatures,
  getAreas,
  getServices,
  saveRule,
  deleteRule,
} from "../../../store/modules/EmailStore";
import { useEffect, useState } from "react";
import { Basura } from "../../Svg/Basura";
import { Guardar } from "../../Svg/Guardar";

export const Regla = (props) => {
  const {
    hasKeywords,
    keywords,
    type,
    natureId,
    areaId,
    serviceId,
    ruleId,
    id,
    recentlyCreated,
  } = props.features;
  const inboxId = props.inboxId;
  const dispatch = useDispatch();
  const [editableKeywords, setKeywords] = useState(keywords.join(","));
  const [editableHasKeywords, setHasKeywords] = useState(hasKeywords);
  const [typo, setType] = useState(type);
  const [showOptions, setShowOptions] = useState(false);
  const emailState = useSelector(email);

  const [selectedNature, setSelectedNature] = useState(
    natureId
      ? emailState.natures.filter((n) => n.value === natureId.toString())[0]
      : { label: "Seleccione la naturaleza", value: "" }
  );
  const [selectedArea, setSelectedAreas] = useState(
    areaId
      ? emailState.areas.filter((a) => a.value === areaId.toString())[0]
      : { label: "Seleccione el area", value: "" }
  );
  const [selectedService, setSelectedService] = useState(
    serviceId
      ? emailState.services.filter((s) => s.value === serviceId.toString())[0]
      : { label: "Seleccione el servicio", value: "" }
  );

  const options = [
    {
      Icon: Basura,
      action: () => {
        dispatch(deleteRule(id));
      },
      id: 1,
    },
    {
      Icon: Guardar,
      action: () => {
        let payload = {
          id: id,
          inboxId: inboxId,
          hasKeywords: editableHasKeywords,
          keywords: editableKeywords.split(","),
          type: typo,
          ruleId: ruleId,
          areaId: parseInt(selectedArea.value),
          serviceId: parseInt(selectedService.value),
          natureId: parseInt(selectedNature.value),
        };
        dispatch(saveRule(payload, recentlyCreated, emailState.reglas));
        // console.log(ruleToSave);
      },
      id: 2,
    },
  ];

  useEffect(() => {
    // dispatch(getRulesByInboxId(inboxId));
    dispatch(getNatures());
    dispatch(getAreas());
    dispatch(getServices(selectedArea.value));
  }, [dispatch, selectedArea]);

  useEffect(() => {
    if (typo === "NORMAL") {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  }, [typo]);

  return (
    <ReglaContainer>
      <OptionsContainer absolute={true}>
        {options.map((option) => {
          const { Icon, id, action } = option;
          return (
            <OptionButton key={id} onClick={() => action()}>
              <Icon size={15} />
            </OptionButton>
          );
        })}
      </OptionsContainer>
      <ReglasInputField>
        <label>Contiene Keywords:</label>
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ display: "flex", gap: "5px" }}>
            {/*  */}
            <CheckInput
              checked={editableHasKeywords === true}
              onClick={() => setHasKeywords(true)}
            />
            <label>Si</label>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <CheckInput
              checked={editableHasKeywords === false}
              onClick={() => setHasKeywords(false)}
            />
            <label>No</label>
          </div>
        </div>
      </ReglasInputField>
      {editableHasKeywords === true && (
        <ReglasInputField>
          <label>Keywords:</label>
          <Input
            onChange={(e) => {
              setKeywords(e.target.value);
            }}
            value={editableKeywords}
            height="55px"
            placeholder="Escriba aquí los keyword, separados por comas (,)"
          />
        </ReglasInputField>
      )}
      <ReglasInputField>
        <label>Tipo de solicitud:</label>
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ display: "flex", gap: "5px" }}>
            <CheckInput
              checked={typo === "NORMAL"}
              onClick={() => setType("NORMAL")}
            />
            <label>Parcial</label>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <CheckInput
              checked={typo === "COMPLETA"}
              onClick={() => setType("COMPLETA")}
            />
            <label>Completa</label>
          </div>
        </div>
      </ReglasInputField>
      {showOptions && (
        <PartialOptionsContainer>
          <CustomSelect
            onChange={(e) => setSelectedNature(e)}
            value={selectedNature}
            options={emailState.natures}
            placeholder="Natures..."
          />
          <CustomSelect
            onChange={(e) => setSelectedAreas(e)}
            value={selectedArea}
            options={emailState.areas}
            placeholder="Areas..."
          />
          <CustomSelect
            onChange={(e) => setSelectedService(e)}
            value={selectedService}
            options={emailState.services}
            placeholder="Services..."
          />
        </PartialOptionsContainer>
      )}
    </ReglaContainer>
  );
};
