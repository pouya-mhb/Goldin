export default function Toast({ message, type = "success" }) {
    return (
        <div className={`toast toast-${type}`}>
            <p>{message}</p>
        </div>
    );
}
