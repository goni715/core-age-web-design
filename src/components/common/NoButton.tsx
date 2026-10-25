import { Button } from "../ui/button";

type TProps = {
    onClick: () => void;
};

const NoButton = ({ onClick }: TProps) => {
    return (
        <>
            <Button
                variant="outline"
                className="cursor-pointer font-medium px-6 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-zinc-100 active:scale-98 transition-all duration-150 shadow-xs"
                onClick={onClick}
            >
                No
            </Button>
        </>
    );
};

export default NoButton;