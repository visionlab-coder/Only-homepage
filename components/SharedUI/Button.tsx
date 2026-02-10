interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
    className?: string;
}

export default function Button({
    children,
    onClick,
    variant = 'primary',
    className = ''
}: ButtonProps) {
    const baseClasses = "px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105";
    const variantClasses = variant === 'primary'
        ? "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-primary/50"
        : "bg-white/10 text-white border border-white/20 hover:bg-white/20";

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${variantClasses} ${className}`}
        >
            {children}
        </button>
    );
}
