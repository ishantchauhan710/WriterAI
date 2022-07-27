import { map } from "@firebase/util";
import { MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const DownloadTab = ({ projectList, notify }) => {
  const [project, setProject] = useState({});
  const [projectFormat, setProjectFormat] = useState("md");

  const downloadProject = () => {
    if (!project) {
      notify("No project selected", "error");
      return;
    }

    var filename = `${project.title}.${projectFormat}`;

    let file;
    let fileBlob;

    if (projectFormat === "json") {
      file = {
        title: project.title,
        description: project.description,
        content: project.content,
        cover: project.coverPic ? project.coverPic : "null",
      };

      fileBlob = new Blob([JSON.stringify(file)], { type: "text/plain" });
    } else if (projectFormat === "xml") {
      file = `<?xml version="1.0" encoding="UTF-8"?><writerai><title>${
        project.title
      }</title><description>${project.description}</description><content>${
        project.content
      }</content><cover>${
        project.coverPic ? project.coverPic : "null"
      }</cover></writerai>`;

      fileBlob = new Blob([file], { type: "text/xml" });
    } else {
      file = `
      # Title
      ${project.title}

      ## Description
      ${project.description}

      ### Content
      ${project.content}

      #### Cover Image
      ${project.coverPic ? project.coverPic : "null"}

      `;

      fileBlob = new Blob([file], { type: "text/plain" });
    }

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(fileBlob, filename);
    } else {
      var e = document.createEvent("MouseEvents"),
        a = document.createElement("a");
      a.download = filename;
      a.href = window.URL.createObjectURL(fileBlob);
      a.dataset.downloadurl = ["text/plain", a.download, a.href].join(":");
      e.initEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
    }
  };

  return (
    <div
      id="tabProfile"
      style={{ overflow: "hidden" }}
      className="home-page__tab-data"
    >
      <div className="home-page__tab-data__section-label">Download Project</div>
      <div className="home-page__tab-data__download-form">
        <label>Select Project</label>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          size="small"
          style={{
            display: "block",
            margin: "12px 0px",
            backgroundColor: "var(--colorBackground)",
            padding: "3px",
          }}
          value={project}
          onChange={(e) => setProject(e.target.value)}
        >
          {projectList &&
            projectList.map((item, index) => (
              <MenuItem value={item} key={index}>
                {item.title}
              </MenuItem>
            ))}
        </Select>

        <label>Download Format</label>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          size="small"
          style={{
            display: "block",
            margin: "12px 0px",
            backgroundColor: "var(--colorBackground)",
            padding: "3px",
          }}
          value={projectFormat}
          onChange={(e) => setProjectFormat(e.target.value)}
        >
          <MenuItem defaultChecked value="md">
            Markdown
          </MenuItem>
          <MenuItem value="json">JSON</MenuItem>
          <MenuItem value="xml">XML</MenuItem>
        </Select>

        <input
          className="writerai-button home-page__tab-data__download-form__button"
          type="submit"
          value="Download"
          onClick={() => downloadProject()}
        />
      </div>
    </div>
  );
};
