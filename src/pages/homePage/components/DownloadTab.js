import { map } from "@firebase/util";
import { MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const DownloadTab = ({ projectList }) => {
  const [project, setProject] = useState({});

  return (
    <div id="tabProfile" className="home-page__tab-data">
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
          {projectList.map((item, index) => (
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
        >
          <MenuItem defaultChecked value="markdown">Markdown</MenuItem>
          <MenuItem value="json">JSON</MenuItem>
          <MenuItem value="xml">XML</MenuItem>
        </Select>

        <input
          className="writerai-button home-page__tab-data__download-form__button"
          type="submit"
          value="Download"
        />
      </div>
    </div>
  );
};
