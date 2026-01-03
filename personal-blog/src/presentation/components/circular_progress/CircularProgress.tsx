import './CircularProgress.css';

interface CircularProgressProps {
  size?: number;
  className?: string;
}

const CircularProgress = ({ size = 40, className = '' }: CircularProgressProps) => {
  return (
    <div className={`circular-progress-container ${className}`} style={{ width: size, height: size }}>
      <svg
        className="circular-progress"
        width={size}
        height={size}
        viewBox="0 0 40 40"
      >
        <circle
          className="circular-progress-track"
          cx="20"
          cy="20"
          r="18"
          fill="none"
          strokeWidth="3"
        />
        <circle
          className="circular-progress-indicator"
          cx="20"
          cy="20"
          r="18"
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default CircularProgress;

