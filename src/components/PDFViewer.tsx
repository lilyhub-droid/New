import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Eye, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface PDFViewerProps {
  url: string;
  title: string;
  onDownload?: () => void;
  trigger?: React.ReactNode;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ 
  url, 
  title, 
  onDownload,
  trigger 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = () => {
    window.open(url, '_blank');
    onDownload?.();
  };

  const defaultTrigger = (
    <Button variant="hero" className="group">
      <Eye className="w-4 h-4 mr-2" />
      View Book
    </Button>
  );

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {trigger || defaultTrigger}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-6xl h-[90vh] p-0">
          <DialogHeader className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>
          
          <div className="flex-1 px-6 pb-6">
            <Card className="h-full overflow-hidden">
              <iframe
                src={url}
                className="w-full h-full border-0"
                title={title}
                loading="lazy"
              />
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};