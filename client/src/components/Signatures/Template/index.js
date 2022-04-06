import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactSearchBox from "react-search-box";
import "../styles.css";
import config from "./config";

const Template = ({}) => {
  const [employeData, setEmployeData] = useState([]);
  const [nomValue, setNomValue] = useState([]);
  const [layoutValue, setLayoutValue] = useState("desktop");

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("/employes")
        .then((response) => {
          setEmployeData(response.data);
        })
        .catch((error) => console.log(error));
    };
    fetchData();
  }, []);

  function selectCopy() {
    window
      .getSelection()
      .selectAllChildren(document.getElementById("selectable"));

    document.execCommand("copy");
  }

  function renderHTML() {
    return employeData
      .filter((nom) => nom.value === nomValue)
      .map((employe) => (
        <html>
          <head>
            <style
              type="text/css"
              dangerouslySetInnerHTML={{
                __html: `a,a[href],a:hover{text-decoration:none;} .appleLinks {color:#00313b; text-decoration: none;} .ExternalClass p, .ExternalClass span,.ExternalClass font,.ExternalClass td {mso-line-height-rule: exactly;line-height: 100%}  * {-ms-text-size-adjust: 100%;font-family:Calibri, Arial, sans-serif} table, td {mso-table-lspace: 0pt; mso-table-rspace: 0pt;  } img { -ms-interpolation-mode:bicubic;} a { text-decoration: none;}`,
              }}
            />
          </head>
          <body style={{ margin: 0, padding: 0, msoLineHeightRule: "exactly" }}>
            <table cellspacing="0" cellpadding="0" border="0">
              <tr height="32">
                <td
                  style={{
                    fontFamily: config.family,
                    fontSize: config.fontSizeHeader,
                    color: config.primaryColor,
                  }}
                >
                  &nbsp;
                </td>
              </tr>
            </table>
            <table
              role="presentation"
              cellspacing="0"
              cellpadding="0"
              border="0"
            >
              <tr>
                <td width="102">
                  <table cellspacing="0" cellpadding="0" border="0">
                    <tr height={config.spacing.replace("px", "")}>
                      <td
                        style={{
                          verticalAlign: "top",
                        }}
                      >
                        <img
                          alt={`${employe.preNom} ${employe.nom}`}
                          width="95"
                          height="114"
                          style={{
                            width: "95px",
                            maxWidth: "95px",
                            height: "114px",
                            display: "block",
                          }}
                          nosend="1"
                          border="0"
                          src={employe.avatar ? employe.avatar : ""}
                        />
                      </td>
                    </tr>
                    <tr height={config.spacing.replace("px", "")}>
                      <td
                        height={config.spacing}
                        style={{
                          fontFamily: config.family,
                          fontSize: config.fontSizeBody,
                          color: config.secondaryColor,
                          height: config.spacing,
                        }}
                      ></td>
                    </tr>
                    <tr height={config.spacing.replace("px", "")}>
                      <td
                        valign="bottom"
                        style={{
                          verticalAlign: "bottom",
                          paddingLeft: "5px",
                        }}
                      >
                        <a href={config.url}>
                          <img
                            alt="https://folospot.com/"
                            width={config.imgSizeW.replace("px", "")}
                            style={{
                              width: config.imgSizeW,
                              maxWidth: config.imgSizeW,
                              display: "block",
                              border: "none",
                            }}
                            nosend="1"
                            border="0"
                            src={config.imageUrl}
                          />
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>

                <td
                  style={{
                    paddingLeft: config.spacing,
                    paddingRight: config.spacing,
                    verticalAlign: "middle",
                  }}
                >
                  <img
                    alt="divider"
                    width="4"
                    height="163"
                    style={{
                      width: "4px",
                      maxWidth: "4px",
                      height: "163px",
                      display: "block",
                      border: "none",
                    }}
                    nosend="1"
                    border="0"
                    src="https://res.cloudinary.com/folospot/image/upload/v1649263744/app-signatures/divider_LIFT_xso86w_suplqi.png"
                  />
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    paddingLeft: "6px",
                  }}
                  valign="middle"
                >
                  <table cellspacing="0" cellpadding="0" border="0">
                    <tr height={config.spacing.replace("px", "")}>
                      <td
                        align="left"
                        style={{
                          fontSize: config.fontSizeHeader,
                          color: config.primaryColor,
                          msoLineHeightRule: config.msoLine,
                          lineHeight: config.lineHeightDimension,
                          textAlign: "left",
                          fontFamily: config.familyB,
                          fontWeight: "normal",
                        }}
                      >
                        {employe.preNom}&nbsp;
                        {employe.nom}
                      </td>
                    </tr>

                    {employe.role && (
                      <tr height={config.spacing.replace("px", "")}>
                        <td
                          align="left"
                          style={{
                            msoLineHeightRule: config.msoLine,
                            lineHeight: config.lineHeightDimension,
                            textAlign: "left",
                            fontFamily: config.family,
                          }}
                        >
                          <span
                            style={{
                              fontFamily: config.familyB,
                              msoLineHeightRule: config.msoLine,
                              lineHeight: config.lineHeightDimension,
                              fontSize: config.fontSizeBody,
                              color: config.secondaryColor,
                              textDecoration: "none",
                              fontWeight: "bold",
                            }}
                          >
                            {employe.role}
                          </span>
                        </td>
                      </tr>
                    )}

                    <tr height={config.spacing.replace("px", "")}>
                      <td
                        height={config.spacing}
                        style={{
                          fontFamily: config.family,
                          fontSize: config.fontSizeBody,
                          color: config.secondaryColor,
                          height: config.spacing,
                        }}
                      ></td>
                    </tr>
                    {employe.email && (
                      <tr height={config.spacing.replace("px", "")}>
                        <td
                          className="appleLinks"
                          align="left"
                          style={{
                            color: config.primaryColor,
                            msoLineHeightRule: config.msoLine,
                            lineHeight: config.lineHeightDimension,
                            textAlign: "left",
                            textDecoration: "none",
                            fontFamily: config.family,
                            fontSize: config.fontSizeBody,
                          }}
                        >
                          <a
                            className="appleLinks"
                            href={`mailto:${employe.email}`}
                            style={{
                              color: config.secondaryColor,
                              msoLineHeightRule: config.msoLine,
                              lineHeight: config.lineHeightDimension,
                              fontFamily: config.family,
                              fontSize: config.fontSizeBody,
                              textDecoration: "none",
                            }}
                          >
                            <span
                              className="appleLinks"
                              style={{
                                fontFamily: config.family,
                                msoLineHeightRule: config.msoLine,
                                lineHeight: config.lineHeightDimension,
                                fontSize: config.fontSizeBody,
                                color: config.secondaryColor,
                                textDecoration: "none",
                              }}
                            >
                              <font
                                color={config.secondaryColor}
                                text-decoration="none"
                              >
                                {employe.email}
                              </font>
                            </span>
                          </a>
                        </td>
                      </tr>
                    )}
                    {employe.telephone && (
                      <tr height={config.spacing.replace("px", "")}>
                        <td
                          className="appleLinks"
                          align="left"
                          style={{
                            msoLineHeightRule: config.msoLine,
                            lineHeight: config.lineHeightDimension,
                            textAlign: "left",
                            textDecoration: "none",
                            fontFamily: config.family,
                            fontSize: config.fontSizeBody,
                            color: config.secondaryColor,
                          }}
                        >
                          <span
                            className="appleLinks"
                            style={{
                              fontFamily: config.family,
                              msoLineHeightRule: config.msoLine,
                              lineHeight: config.lineHeightDimension,
                              fontSize: config.fontSizeBody,
                              color: config.secondaryColor,
                              textDecoration: "none",
                            }}
                          >
                            <font
                              className="appleLinks"
                              color={config.secondaryColor}
                              text-decoration="none"
                            >
                              {employe.telephone}
                            </font>
                          </span>
                        </td>
                      </tr>
                    )}
                    {console.log(employe.email)}

                    <tr height={config.spacing.replace("px", "")}>
                      <td
                        className="appleLinks"
                        align="left"
                        style={{
                          color: config.secondaryColor,
                          msoLineHeightRule: config.msoLine,
                          lineHeight: config.lineHeightDimension,
                          textAlign: "left",
                          textDecoration: "none",
                          fontFamily: config.family,
                          fontSize: config.fontSizeBody,
                        }}
                      >
                        <a
                          className="appleLinks"
                          href="https://folospot.com/"
                          style={{
                            color: config.secondaryColor,
                            msoLineHeightRule: config.msoLine,
                            lineHeight: config.lineHeightDimension,
                            fontFamily: config.family,
                            fontSize: config.fontSizeBody,
                            textDecoration: "none",
                          }}
                          alt="https://folospot.com/"
                        >
                          <span
                            style={{
                              color: config.secondaryColor,
                              msoLineHeightRule: config.msoLine,
                              lineHeight: config.lineHeightDimension,
                              textAlign: "left",
                              textDecoration: "none",
                              fontFamily: config.family,
                              fontSize: config.fontSizeBody,
                            }}
                          >
                            <font
                              color={config.secondaryColor}
                              text-decoration="none"
                            >
                              www.folospot.com
                            </font>
                          </span>
                        </a>
                      </td>
                    </tr>

                    <tr height={config.spacing.replace("px", "")}>
                      <td
                        style={{
                          fontFamily: config.family,
                          fontSize: config.fontSizeBody,
                          color: config.secondaryColor,
                          height: config.spacing,
                        }}
                      ></td>
                    </tr>
                    <tr>
                      <td style={{ padding: 0 }}>
                        <table cellPadding="0" cellspacing="0" border="0">
                          <tr>
                            <td style={{ padding: "2px 6px 1px 0px" }}>
                              <a
                                href="https://www.linkedin.com/company/folospot/"
                                style={{
                                  color: config.secondaryColor,
                                  fontFamily: config.family,
                                  fontSize: config.fontSizeBody,
                                  textDecoration: "none",
                                }}
                              >
                                <img
                                  alt="linkedin"
                                  width="18"
                                  style={{
                                    width: "18px",
                                    maxWidth: "18px",
                                    display: "block",
                                    border: "none",
                                  }}
                                  nosend="1"
                                  border="0"
                                  src={config.linkedin}
                                />
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table cellspacing="0" cellpadding="0" border="0" width="517">
              <tr height={config.spacing.replace("px", "")}>
                <td
                  width="517"
                  height={parseInt(config.spacing)}
                  style={{
                    fontFamily: config.family,
                    fontSize: config.fontSizeBody,
                    color: config.primaryColor,
                    height: config.spacing,
                    width: "517px",
                    maxWidth: "517px",
                  }}
                ></td>
              </tr>
              <tr height={config.spacing.replace("px", "")}>
                <td
                  width="517"
                  className="appleText"
                  style={{
                    paddingLeft: "5px",
                    fontWeight: "normal",
                    fontStyle: "italic",
                    fontFamily: config.family,
                    fontSize: "7pt",
                    color: "#8a8a8a",
                    msoLineHeightRule: config.msoLine,
                    lineHeight: "110%",
                    width: "517px",
                    maxWidth: "517px",
                  }}
                >
                  This email is confidential. The contents of this communication
                  and any attachments are intended for the use of the individual
                  or entity to whom they are addressed. If you are not the named
                  addressee or received this email in error, we ask that you
                  notify the sender immediately. Unintended recipients should
                  not disseminate, distribute or copy this e-mail in any form
                  and disclosing, copying, distributing or taking any action in
                  reliance on the contents of this information is strictly
                  prohibited.
                </td>
              </tr>
            </table>
          </body>
        </html>
      ));
  }

  return (
    <>
      <ReactSearchBox
        placeholder="Rechercher..."
        onChange={(value) => setNomValue(value)}
        data={employeData}
        callback={(record) => console.log(record)}
      />

      {console.log(employeData)}

      {nomValue.length > 0 && renderHTML().length > 0 && (
        <>
          <h5
            style={{
              margin: "2rem 0 1.8rem 0rem",
              lineHeight: "1.7",
              textAlign: "left",
              userSelect: "none",
              WebkitUserSelect: "none",
              msUserSelect: "none",
            }}
          >
            Copier et coller votre signature dans l'espace réservé de votre
            client.
            <br />
            <small>
              <a
                style={{ color: "#17a2b8" }}
                href="https://blog.gimm.io/installing-email-signatures/"
                target="_blank"
                rel="noopener nreferrer"
              >
                ➝ Comment installer ma signature ?
              </a>
            </small>
          </h5>

          <button
            style={{
              borderStyle: "none",
              background: "none",
              backgroundColor: "#00313b",
              border: "2px solid #be1507 !important",
              color: "#ffffff",
              borderRadius: "3px",
              padding: "5px 12px",
              width: "200px",
              float: "left",
            }}
            onClick={() => selectCopy()}
          >
            Copy
          </button>
          <br />
          <br />
        </>
      )}

      <div
        className="row"
        style={{
          marginTop: "1rem",
        }}
      >
        <div
          id="selectable"
          style={{
            userSelect: "all",
            WebkitUserSelect: "all",
            msUserSelect: "all",
          }}
          className="col-md-12"
        >
          {renderHTML()}
        </div>

        <div className="col-md-12 mt-5" style={{ maxWidth: "30rem" }}>
          {nomValue.length > 0 && renderHTML().length > 0 ? (
            <h2
              className="mt-4 mb-4"
              style={{
                userSelect: "none",
                WebkitUserSelect: "none",
                msUserSelect: "none",
              }}
            >
              {/*     ou */}
            </h2>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Template;
