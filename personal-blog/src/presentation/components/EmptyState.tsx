interface EmptyStateProps {
  title: string;
  message: string;
  emoji?: string;
}

const EmptyState = ({ title, message, emoji = "✨" }: EmptyStateProps) => {
  return (
    <div className="empty-state">
      <span className="empty-state-emoji" aria-hidden>
        {emoji}
      </span>
      <h2 className="empty-state-title">{title}</h2>
      <p className="empty-state-message">{message}</p>
    </div>
  );
};

export default EmptyState;
