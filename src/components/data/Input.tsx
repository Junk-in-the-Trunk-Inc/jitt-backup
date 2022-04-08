export const Input = React.forwardRef(function (props: Partial<React.InputHTMLAttributes<HTMLInputElement>>, ref: React.ForwardedRef<HTMLInputElement>) {
    return <input ref={ref} {...props} />;
});