
type ConnectionCounterProps = {
  totalConnections: number;
};

const ConnectionCounter = ({ totalConnections }: ConnectionCounterProps) => {
  return (
    <div className="flex items-center justify-center py-3 bg-background">
      <div className="flex flex-col items-center">
        <span className="text-2xl font-medium">{totalConnections}</span>
        <span className="text-xs uppercase text-muted-foreground tracking-wide">Connections</span>
      </div>
    </div>
  );
};

export default ConnectionCounter;
