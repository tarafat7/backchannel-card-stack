
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const MAX_STATUS_LENGTH = 100;

interface StatusUpdateSectionProps {
  initialStatus: string;
  onStatusUpdate: (status: string) => void;
}

const StatusUpdateSection = ({ initialStatus, onStatusUpdate }: StatusUpdateSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [statusText, setStatusText] = useState(initialStatus);

  const handleStatusChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_STATUS_LENGTH) {
      setStatusText(value);
    }
  };

  const handleUpdate = () => {
    onStatusUpdate(statusText);
    setIsEditing(false);
  };

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-medium text-muted-foreground">Status Update</h2>
        {!isEditing && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        )}
      </div>
      
      {isEditing ? (
        <div className="space-y-3">
          <Textarea 
            value={statusText}
            onChange={handleStatusChange}
            placeholder="What are you up to now?"
            className="bg-secondary border-none resize-none"
            maxLength={MAX_STATUS_LENGTH}
          />
          <div className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              {statusText.length}/{MAX_STATUS_LENGTH} characters
            </div>
            <div className="flex gap-2 justify-end">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button 
                size="sm"
                onClick={handleUpdate}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-lg bg-secondary">
          <p className="text-sm">{statusText || "No status set"}</p>
        </div>
      )}
    </section>
  );
};

export default StatusUpdateSection;
