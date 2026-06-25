export default function AccountStatusCard({
    status
}) {

    const color =
        status === "APPROVED"
            ? "text-green-400"
            : status === "REJECTED"
                ? "text-red-400"
                : "text-yellow-400";

    return (
        <div className="bg-slate-900 rounded-2xl p-6">

            <h3 className="text-slate-400">
                Financial Account
            </h3>

            <div className={`text-2xl font-bold ${color}`}>
                {status}
            </div>

        </div>
    );
}