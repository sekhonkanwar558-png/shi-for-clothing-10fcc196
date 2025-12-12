import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  alt: string;
}

const ImageZoomModal = ({ isOpen, onClose, image, alt }: ImageZoomModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] md:max-w-4xl w-full p-0 bg-background border-border">
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 z-10 p-2 bg-background/80 hover:bg-background transition-colors touch-manipulation"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <div className="w-full aspect-square overflow-hidden">
          <img
            src={image}
            alt={alt}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageZoomModal;