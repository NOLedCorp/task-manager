import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { forwardRef, Directive, Inject, Renderer2, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector:
        '[contenteditable][formControlName],' +
        '[contenteditable][formControl],' +
        '[contenteditable][ngModel]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ContenteditableValueAccessor),
            multi: true,
        },
    ],
})
export class ContenteditableValueAccessor implements ControlValueAccessor {
    constructor(
        @Inject(ElementRef) private readonly elementRef: ElementRef,
        @Inject(Renderer2) private readonly renderer: Renderer2,
    ) {}

    private onTouched = () => {};

    private onChange: (value: string) => void = () => {};

    registerOnChange(onChange: (value: string) => void) {
        this.onChange = onChange;
    }

    registerOnTouched(onTouched: () => void) {
        this.onTouched = onTouched;
    }

    @HostListener('input')
    onInput() {
        this.onChange(this.elementRef.nativeElement.innerHTML);
    }

    @HostListener('blur')
    onBlur() {
        this.onTouched();
    }

    setDisabledState(disabled: boolean) {
        this.renderer.setAttribute(
            this.elementRef.nativeElement,
            'contenteditable',
            String(!disabled),
        );
    }

    writeValue(value: string | null) {
        this.renderer.setProperty(
             this.elementRef.nativeElement,
            'innerHTML',
            ContenteditableValueAccessor.processValue(value),
        );
    }
    
    private static processValue(value: string | null): string {
        const processed = value || '';
    
        return processed.trim() === '<br>' ? '' : processed;
    }
}