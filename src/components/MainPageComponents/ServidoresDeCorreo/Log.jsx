import {
  LogContainer,
  LogBody,
  //   Photo,
  LogInfo,
} from "./ServidoresDeCorreoElements";
import { Calendar } from "../../Svg/Calendario";

export const Log = (props) => {
  const { type, logMessage, date, username } = props.features;
  const dateFormat = new Date(date);

  return (
    <LogContainer>
      <h5>{logMessage}</h5>
      <LogBody>
        {/* <Photo>
            <SinAsignar />
          </Photo> */}
        <LogInfo>
          <p>
            Correo asociado:{" "}
            <span style={{ color: "#3C6EBE", fontWeight: "bold" }}>
              {username}
            </span>
          </p>
          <span
            style={{
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              //   justifyContent: "center",
            }}
          >
            <Calendar size={14} /> {dateFormat.toString()}
          </span>
        </LogInfo>
      </LogBody>
      <span style={{ fontSize: "11px", color: "#FABE32" }}>{type}</span>
    </LogContainer>
  );
};
