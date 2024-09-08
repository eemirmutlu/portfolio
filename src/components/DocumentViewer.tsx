import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import LoaderScreen from "./LoaderScreen";
import ErrorPage from "./ErrorPage";
import { useThemeContext } from "../contexts/ThemeContext";

interface IDocumentViewer {
  title: string;
  url: string;
  open: boolean;
  onClose: () => void;
  fullScreen?: boolean;
  isCanDownload?: boolean;
  type?: "string" | "buffer";
  additionalDocuments?: {
    title: string;
    url: string;
    type?: "string" | "buffer";
  }[];
}

const DocumentViewer = ({
  title,
  url,
  open,
  onClose,
  fullScreen,
  isCanDownload,
  type,
  additionalDocuments = [],
}: IDocumentViewer) => {
  const [selectedDocumentIndex, setSelectedDocumentIndex] = useState(0);
  const [parsedUrl, setParsedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useThemeContext();

  useEffect(() => {
    const loadDocument = async () => {
      setIsLoading(true);
      const documents = [{ title, url, type }, ...additionalDocuments];
      const currentDocument = documents[selectedDocumentIndex];

      if (
        currentDocument?.url &&
        (currentDocument?.type === "string" ||
          currentDocument?.type === undefined)
      ) {
        const OfficeExt = ["doc", "docx", "xls", "xlsx", "ppt", "pptx"];
        const ext = currentDocument.url.split(".").pop();
        const newUrl = OfficeExt.includes(ext ?? "")
          ? `https://view.officeapps.live.com/op/embed.aspx?src=${currentDocument.url}`
          : currentDocument.url;
        setParsedUrl(newUrl);
      } else if (currentDocument?.url && currentDocument?.type === "buffer") {
        const buffer = Buffer.from(currentDocument.url, "base64");
        const blob = new Blob([buffer], { type: "application/pdf" });
        const blobURL = URL.createObjectURL(blob);
        setParsedUrl(blobURL);
      } else {
        setParsedUrl(null);
      }

      setIsLoading(false);
    };

    loadDocument();
  }, [url, type, additionalDocuments, selectedDocumentIndex, title]);

  if (!url && additionalDocuments.length === 0) return null;

  const downloadUrlFile = (documentUrl: string) => {
    window.open(documentUrl, "_blank");
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xl"
      fullScreen={fullScreen}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: isDarkMode ? "white" : "purple",
          backgroundColor: isDarkMode ? "#1E1B29" : "",
        }}
      >
        <Typography variant="h6">
          Document |{" "}
          {additionalDocuments[selectedDocumentIndex - 1]?.title ??
            title ??
            "Unnamed"}
        </Typography>
        <Stack
          direction="row"
          gap="4px"
          alignItems="center"
          display="flex"
          justifyContent="center"
        >
          {isCanDownload || isCanDownload === undefined ? (
            <IconButton
              sx={{ color: isDarkMode ? "white" : "purple" }}
              onClick={() => {
                const documentUrl =
                  additionalDocuments[selectedDocumentIndex - 1]?.url ?? url;
                downloadUrlFile(documentUrl);
              }}
            >
              <FileDownloadOutlinedIcon />
            </IconButton>
          ) : null}
          <IconButton
            sx={{ color: isDarkMode ? "white" : "purple" }}
            aria-label="close"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      {additionalDocuments.length > 0 ? (
        <Tabs
          value={selectedDocumentIndex}
          onChange={(_event, newIndex) => setSelectedDocumentIndex(newIndex)}
          variant="scrollable"
          sx={{
            backgroundColor: isDarkMode ? "#1E1B29" : "",
          }}
        >
          {[{ title, url, type }, ...additionalDocuments].map((doc, index) => (
            <Tab key={index} label={doc.title} />
          ))}
        </Tabs>
      ) : null}
      {isLoading ? (
        <LoaderScreen />
      ) : parsedUrl ? (
        <DialogContent
          sx={{ height: "80vh", backgroundColor: isDarkMode ? "#1E1B29" : "" }}
        >
          <iframe
            title="Document Viewer"
            src={parsedUrl}
            width="100%"
            height="100%"
            onLoad={() => setIsLoading(false)}
          />
        </DialogContent>
      ) : (
        <ErrorPage />
      )}
    </Dialog>
  );
};

export default DocumentViewer;
