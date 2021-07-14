import {
  FootertContainer,
  InnerContainer,
  LinkContainer,
} from "./FooterElements";

export const Footer = () => {
  return (
    <FootertContainer>
      <InnerContainer>
        <LinkContainer>
          <a
            style={{ color: "#3948FF" }}
            href="https://helppeoplecloud.com/2021/03/24/terminos-y-condiciones-del-servicio/"
          >
            helppeople
          </a>
        </LinkContainer>

        <LinkContainer>
          <span>|</span>
          <a
            style={{ color: "#3948FF" }}
            href="https://helppeoplecloud.com/2021/03/24/politicas-de-la-seguridad-de-la-informacion/"
          >
            Política de cookies
          </a>
          <span>|</span>
        </LinkContainer>

        <LinkContainer>
          <a
            style={{ color: "#3948FF" }}
            href="https://helppeoplecloud.com/2021/03/24/politica-de-proteccion-de-datos/"
          >
            Directiva de privacidad
          </a>
        </LinkContainer>
      </InnerContainer>
    </FootertContainer>
  );
};
