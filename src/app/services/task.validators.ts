import { AbstractControl } from '@angular/forms';

export class TaskValidators {
    public static ValidateNumber(ctrl: AbstractControl): {[index: string]: boolean} {
        if (isNaN(+ctrl.value)) {
            return {checknumber: false};
        }
        return null;
    }
    public static ValidateNumberGTZerro(ctrl: AbstractControl): {[index: string]: boolean} {
        if (isNaN(+ctrl.value)) {
            return {checknumber: false};
        }
        if (+ctrl.value <= 0) {
            return {checknumber: false};
        }
        return null;
    }
    public static ValidateNumberGEZerro(ctrl: AbstractControl): {[index: string]: boolean} {
        if (isNaN(+ctrl.value)) {
            return {checknumber: false};
        }
        if (+ctrl.value < 0) {
            return {checknumber: false};
        }
        return null;
    }

    public static ValidateNumberInt(ctrl: AbstractControl): {[index: string]: boolean} {
        if (isNaN(+ctrl.value)) {
            return {checknumber: false};
        }
        if (Math.floor(ctrl.value) !== +ctrl.value ||
            +ctrl.value < 0 || +ctrl.value > Number.MAX_SAFE_INTEGER) {
            return {checknumber: false};
        }
        return null;
    }

    public static ValidateNumberIntFromOne(ctrl: AbstractControl): {[index: string]: boolean} {
        if (isNaN(+ctrl.value)) {
            return {checknumber: false};
        }
        if (Math.floor(ctrl.value) !== +ctrl.value ||
            +ctrl.value < 1 || +ctrl.value > Number.MAX_SAFE_INTEGER) {
            return {checknumber: false};
        }
        return null;
    }

    public static ValidateFilesRequire(ctrl: AbstractControl): {[index: string]: boolean} {
        if (!ctrl.value || !ctrl.value.length) {
            return {filesrequire: false};
        }
        return null;
    }
}
