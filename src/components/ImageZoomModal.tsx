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
      <DialogContent className="max-w-4xl w-full p-0 bg-background border-border">
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-background/80 hover:bg-background transition-colors"
        >
          <X size={24} />
        </button>
        <div className="w-full aspect-square overflow-hidden">
          <img
            src={image}
            alt={alt}
            className="w-full h-full object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageZoomModal;