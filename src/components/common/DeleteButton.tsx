import { Button } from "../ui/button";

type TProps = {
    isLoading: boolean;
    onClick: () => void;
    disabled?: boolean;
};

const DeleteButton = ({ isLoading, onClick, disabled = false }: TProps) => {
    return (
        <>
            <Button
                type="button"
                disabled={isLoading || disabled}
                variant="destructive"
                onClick={onClick}
                className="cursor-pointer disabled:cursor-not-allowed font-medium px-6 py-2.5 rounded-lg shadow-sm bg-red-600 hover:bg-red-700 active:scale-98 transition-all duration-150 disabled:opacity-45 disabled:pointer-events-none border border-red-700/10"
            >
                {isLoading ? (
                    <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    </div>
                ) : (
                    "Yes"
                )}
            </Button>
        </>
    );
};

export default DeleteButton;