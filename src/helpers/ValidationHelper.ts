import { toast } from "sonner";

class ValidationHelper { 
    SuccessToast(msg: string){
        toast.success(msg);
    }

    ErrorToast(msg: string){
        toast.error(msg);
    }

    WarningToast(msg: string) {
        toast.warning(msg);
    }
}

export const { SuccessToast, ErrorToast, WarningToast } = new ValidationHelper();