export interface IForm<T> {
    render(): void;
    setFormHandler(handler: (formData: T) => void): void;
}