import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Triangle } from "react-loader-spinner";

interface ProjectViewerProps {
  open: boolean;
  onClose: () => void;
  fileUrl: string; // URL to the file content on GitHub
  repoName: string;
  repoUrl: string; // GitHub repository URL
  isLoading: boolean; // Loading state for spinner
}

const ProjectViewer: React.FC<ProjectViewerProps> = ({
  open,
  onClose,
  repoName,
  repoUrl,
  isLoading,
}) => {
  const isSmallScreen = useMediaQuery('(min-width:500px)')
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{repoName}</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: "purple" }}
          disableRipple
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <Triangle
              visible={true}
              height="100"
              width="100"
              color="purple"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </Box>
        ) : (
          <div
            className="folder-structure"
            onClick={() => window.open(repoUrl, "_blank")}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              {repoName}
            </Typography>
            <div className="folder">
              <span className="folder-name">public/</span>
              <div className="file">index.html</div>
              <div className="file">favicon.ico</div>
            </div>
            <div className="folder">
              <span className="folder-name">src/</span>
              <div className="file">App.js</div>
              <div className="file">index.js</div>
              <div className="file">components/</div>
              <div className="file">utils/</div>
            </div>
            <div className="overlay">
              <Typography variant="h6" sx={{ fontSize: !isSmallScreen ? '15px' : '30px' }}>
                Click to visit <i>{repoName}</i> repository...
              </Typography>
            </div>
          </div>
        )}
      </DialogContent>
      <style styled-jsx>{`
        .folder-structure {
          position: relative;
          margin-top: 20px;
          font-family: "Roboto Mono", monospace;
          background-color: #121212;
          color: #e0e0e0;
          padding: 20px;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        i {
          text-decoration: underline;
        }

        .folder-structure:hover {
          background-color: #1e1e1e;
        }

        .folder {
          margin-left: 20px;
        }

        .folder-name {
          font-weight: bold;
          font-size: 1.1em;
        }

        .file {
          margin-left: 20px;
          position: relative;
          font-size: 0.9em;
        }

        .file:hover::after {
          content: "GitHub repository";
          position: absolute;
          left: 0;
          top: 0;
          background-color: rgba(0, 0, 0, 0.8);
          color: #fff;
          padding: 4px 8px;
          border-radius: 3px;
          font-size: 0.8em;
          white-space: nowrap;
          z-index: 1;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5em;
          background-color: rgba(0, 0, 0, 0.5);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 8px;
        }

        .folder-structure:hover .overlay {
          opacity: 1;
        }
      `}</style>
    </Dialog>
  );
};

export default ProjectViewer;
