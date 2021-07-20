import {
  MailService,
  NavbarContainer,
  NavbarStyle,
  NavLogo,
  NavLogoContainer,
  ProfileGrid,
  ProfileSquare,
  ProfileText,
} from "./NavbarElements";

// svgs
import Logo from "../Svg/helppeopleLogo";
import { useSelector } from "react-redux";
import { user } from "../../store/modules/UserStore";

export const Navbar = () => {
  const userDetails = useSelector(user);

  return (
    <NavbarContainer>
      <NavbarStyle>
        <NavLogoContainer>
          <NavLogo to="/">
            <Logo width={"100%"} />
          </NavLogo>
        </NavLogoContainer>
        <MailService>
          <h4>Mail Service</h4>
        </MailService>
        <ProfileSquare
        // onClick={(e: any) => handleProfileMenu(e)}
        >
          <ProfileGrid>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <ProfileText
                title={`true`}
              >{`${userDetails.name} ${userDetails.lastName}`}</ProfileText>
              <ProfileText color="#3948FF">{`${userDetails.companyName}`}</ProfileText>
            </div>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {userDetails.userImage === "" ? (
                <img
                  style={{
                    borderRadius: "50%",
                    borderWidth: "2px",
                    borderColor: `${userDetails.isVIP ? `yellow` : `white`}`,
                    backgroundColor: "white",
                  }}
                  //   className={`rounded-full border-2 ${
                  //     userDetails.isVIP === "1"
                  //       ? "border-amarillo"
                  //       : "border-white"
                  //   } bg-white w-11 h-11`}
                  alt="profile"
                  src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fnovocom.top%2Fview%2F3b27a1-no-profile-pic-for-whatsapp%2F&psig=AOvVaw2FIy7DuWX9vv1PJ-UaS0cl&ust=1626368895717000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCOCslbmG4_ECFQAAAAAdAAAAABAD"
                />
              ) : (
                <div style={{ position: "relative" }}>
                  <img
                    style={{
                      borderRadius: "50%",
                      borderWidth: "4px",
                      borderColor: `${userDetails.isVIP ? `yellow` : `white`}`,
                      backgroundColor: "white",
                    }}
                    src={`data:${userDetails.userImageMime};base64,${userDetails.userImage}`}
                    alt="profile"
                  />
                  {userDetails.isVIP === "1" && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        height: "5px",
                        borderRadius: "50%",
                        backgroundColor: "yellow",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "1rem",
                      }}
                    >
                      <svg
                        className="fill-current h-3"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512.002 512.002"
                      >
                        <path d="M511.267 197.258a14.995 14.995 0 00-12.107-10.209l-158.723-23.065-70.985-143.827a14.998 14.998 0 00-26.901 0l-70.988 143.827-158.72 23.065a14.998 14.998 0 00-8.312 25.585l114.848 111.954-27.108 158.083a14.999 14.999 0 0021.763 15.812l141.967-74.638 141.961 74.637a15 15 0 0021.766-15.813l-27.117-158.081 114.861-111.955a14.994 14.994 0 003.795-15.375z" />
                      </svg>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ProfileGrid>
          {/* <ProfileMenu /> */}
        </ProfileSquare>
      </NavbarStyle>
    </NavbarContainer>
  );
};
