import {FormControl, ValidationErrors} from "@angular/forms";

export class CustomValidator {
  static notOnlyWhitespace(control: FormControl): ValidationErrors {
    if ((control.value != null) && (control.value.trim().length === 0)) {
      return {'notOnlyWhitespace': true};
    } else {
      // @ts-ignore
      return null;
    }

  }
}
